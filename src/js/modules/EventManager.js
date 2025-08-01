// Event Management System
class EventManager {
    constructor() {
        this.listeners = new Map();
        this.delegatedEvents = new Map();
        this.throttledEvents = new Map();
    }

    // Add event listener with automatic cleanup tracking
    addListener(element, eventType, handler, options = {}) {
        const key = this.generateKey(element, eventType);
        
        if (!this.listeners.has(key)) {
            this.listeners.set(key, []);
        }
        
        const listener = { handler, options };
        this.listeners.get(key).push(listener);
        
        element.addEventListener(eventType, handler, options);
        
        return () => this.removeListener(element, eventType, handler);
    }

    // Remove specific event listener
    removeListener(element, eventType, handler) {
        const key = this.generateKey(element, eventType);
        const listeners = this.listeners.get(key);
        
        if (listeners) {
            const index = listeners.findIndex(l => l.handler === handler);
            if (index !== -1) {
                listeners.splice(index, 1);
                element.removeEventListener(eventType, handler);
                
                if (listeners.length === 0) {
                    this.listeners.delete(key);
                }
            }
        }
    }

    // Remove all listeners for an element
    removeAllListeners(element, eventType = null) {
        if (eventType) {
            const key = this.generateKey(element, eventType);
            const listeners = this.listeners.get(key);
            
            if (listeners) {
                listeners.forEach(({ handler }) => {
                    element.removeEventListener(eventType, handler);
                });
                this.listeners.delete(key);
            }
        } else {
            // Remove all listeners for this element
            this.listeners.forEach((listeners, key) => {
                const [elementKey, eventTypeKey] = key.split('|');
                if (elementKey === this.getElementKey(element)) {
                    listeners.forEach(({ handler }) => {
                        element.removeEventListener(eventTypeKey, handler);
                    });
                    this.listeners.delete(key);
                }
            });
        }
    }

    // Event delegation for dynamic content
    delegate(container, selector, eventType, handler, options = {}) {
        const key = `${this.getElementKey(container)}|${selector}|${eventType}`;
        
        const delegatedHandler = (event) => {
            const target = event.target.closest(selector);
            if (target && container.contains(target)) {
                handler.call(target, event, target);
            }
        };
        
        this.delegatedEvents.set(key, delegatedHandler);
        container.addEventListener(eventType, delegatedHandler, options);
        
        return () => this.undelegate(container, selector, eventType);
    }

    // Remove delegated event
    undelegate(container, selector, eventType) {
        const key = `${this.getElementKey(container)}|${selector}|${eventType}`;
        const handler = this.delegatedEvents.get(key);
        
        if (handler) {
            container.removeEventListener(eventType, handler);
            this.delegatedEvents.delete(key);
        }
    }

    // Throttled event listener for performance
    throttle(element, eventType, handler, delay = 16) {
        const key = this.generateKey(element, eventType);
        
        let timeoutId = null;
        let lastExecTime = 0;
        
        const throttledHandler = (event) => {
            const currentTime = Date.now();
            
            if (currentTime - lastExecTime > delay) {
                handler(event);
                lastExecTime = currentTime;
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    handler(event);
                    lastExecTime = Date.now();
                }, delay - (currentTime - lastExecTime));
            }
        };
        
        this.throttledEvents.set(key, { handler: throttledHandler, originalHandler: handler });
        element.addEventListener(eventType, throttledHandler);
        
        return () => this.unthrottle(element, eventType);
    }

    // Remove throttled event
    unthrottle(element, eventType) {
        const key = this.generateKey(element, eventType);
        const throttled = this.throttledEvents.get(key);
        
        if (throttled) {
            element.removeEventListener(eventType, throttled.handler);
            this.throttledEvents.delete(key);
        }
    }

    // Debounced event listener
    debounce(element, eventType, handler, delay = 300) {
        const key = this.generateKey(element, eventType);
        
        let timeoutId = null;
        
        const debouncedHandler = (event) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => handler(event), delay);
        };
        
        this.throttledEvents.set(key, { handler: debouncedHandler, originalHandler: handler });
        element.addEventListener(eventType, debouncedHandler);
        
        return () => this.unthrottle(element, eventType);
    }

    // One-time event listener
    once(element, eventType, handler, options = {}) {
        const onceHandler = (event) => {
            handler(event);
            this.removeListener(element, eventType, onceHandler);
        };
        
        return this.addListener(element, eventType, onceHandler, options);
    }

    // Generate unique key for element and event type
    generateKey(element, eventType) {
        return `${this.getElementKey(element)}|${eventType}`;
    }

    // Generate unique key for element
    getElementKey(element) {
        // Handle special cases
        if (element === document) {
            return 'document';
        }
        if (element === window) {
            return 'window';
        }
        if (!element) {
            return 'undefined';
        }
        
        if (element.id) {
            return `#${element.id}`;
        }
        if (element.className) {
            return `.${element.className.split(' ')[0]}`;
        }
        return element.tagName.toLowerCase();
    }

    // Cleanup all event listeners
    cleanup() {
        // Clean up regular listeners
        this.listeners.forEach((listeners, key) => {
            const [elementKey, eventType] = key.split('|');
            const element = this.findElementByKey(elementKey);
            
            if (element) {
                listeners.forEach(({ handler }) => {
                    element.removeEventListener(eventType, handler);
                });
            }
        });

        // Clean up delegated events
        this.delegatedEvents.forEach((handler, key) => {
            const [elementKey, selector, eventType] = key.split('|');
            const element = this.findElementByKey(elementKey);
            
            if (element) {
                element.removeEventListener(eventType, handler);
            }
        });

        // Clean up throttled events
        this.throttledEvents.forEach(({ handler }, key) => {
            const [elementKey, eventType] = key.split('|');
            const element = this.findElementByKey(elementKey);
            
            if (element) {
                element.removeEventListener(eventType, handler);
            }
        });

        // Clear all maps
        this.listeners.clear();
        this.delegatedEvents.clear();
        this.throttledEvents.clear();
    }

    // Find element by key (helper method)
    findElementByKey(key) {
        if (key.startsWith('#')) {
            return document.getElementById(key.slice(1));
        }
        if (key.startsWith('.')) {
            return document.querySelector(key);
        }
        return document.querySelector(key);
    }

    // Utility method for common event patterns
    setupDropdownEvents(dropdownElement, options = {}) {
        const {
            onOpen = () => {},
            onClose = () => {},
            onSelect = () => {},
            closeOnOutsideClick = true
        } = options;

        let isOpen = false;

        // Toggle dropdown
        const toggleHandler = (e) => {
            e.stopPropagation();
            isOpen = !isOpen;
            
            if (isOpen) {
                onOpen();
            } else {
                onClose();
            }
        };

        // Close on outside click
        const outsideClickHandler = (e) => {
            if (!dropdownElement.contains(e.target) && isOpen) {
                isOpen = false;
                onClose();
            }
        };

        // Handle item selection
        const selectHandler = (e) => {
            const item = e.target.closest('[data-value]');
            if (item) {
                const value = item.dataset.value;
                onSelect(value, item);
                isOpen = false;
                onClose();
            }
        };

        // Add listeners
        this.addListener(dropdownElement, 'click', toggleHandler);
        
        if (closeOnOutsideClick) {
            this.addListener(document, 'click', outsideClickHandler);
        }
        
        this.delegate(dropdownElement, '[data-value]', 'click', selectHandler);

        return {
            open: () => {
                isOpen = true;
                onOpen();
            },
            close: () => {
                isOpen = false;
                onClose();
            },
            destroy: () => {
                this.removeAllListeners(dropdownElement);
                if (closeOnOutsideClick) {
                    this.removeListener(document, 'click', outsideClickHandler);
                }
            }
        };
    }

    // Utility method for tab switching
    setupTabEvents(tabContainer, options = {}) {
        const {
            onTabChange = () => {},
            activeClass = 'active',
            contentSelector = '[data-tab-content]'
        } = options;

        const tabHandler = (e) => {
            const tab = e.target.closest('[data-tab]');
            if (!tab) return;

            e.preventDefault();
            
            const tabName = tab.dataset.tab;
            const content = document.querySelector(`${contentSelector}[data-tab="${tabName}"]`);
            
            if (content) {
                // Update active states
                tabContainer.querySelectorAll('[data-tab]').forEach(t => t.classList.remove(activeClass));
                document.querySelectorAll(contentSelector).forEach(c => c.style.display = 'none');
                
                tab.classList.add(activeClass);
                content.style.display = 'block';
                
                onTabChange(tabName, tab, content);
            }
        };

        this.delegate(tabContainer, '[data-tab]', 'click', tabHandler);

        return {
            switchTo: (tabName) => {
                const tab = tabContainer.querySelector(`[data-tab="${tabName}"]`);
                if (tab) {
                    tab.click();
                }
            },
            destroy: () => {
                this.undelegate(tabContainer, '[data-tab]', 'click');
            }
        };
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EventManager;
} else {
    window.EventManager = EventManager;
} 