// Main Application Entry Point
class PaymentAssistantApp {
    constructor() {
        this.appManager = null;
        this.isInitialized = false;
        this.config = {
            defaultBusinessType: 'medium',
            defaultDateRange: 'Last 90 days',
            defaultTab: 'overview',
            chartConfig: {
                xPoints: [80, 200, 320, 440, 560, 680, 720],
                colors: {
                    current: '#533AFD',
                    baseline: '#E4E7EC',
                    optimized: '#22C55E'
                }
            }
        };
    }

    // Initialize the application
    async init() {
        if (this.isInitialized) {
            console.warn('App already initialized');
            return;
        }

        try {
            console.log('Initializing Payment Assistant App...');

            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                await new Promise(resolve => {
                    document.addEventListener('DOMContentLoaded', resolve);
                });
            }

            // Test ChartManager availability
            if (typeof ChartManager === 'undefined') {
                console.error('ChartManager not found!');
                return;
            }
            console.log('ChartManager found:', ChartManager);

            // Test AppManager availability
            if (typeof AppManager === 'undefined') {
                console.error('AppManager not found!');
                return;
            }
            console.log('AppManager found:', AppManager);

            // Initialize AppManager
            this.appManager = new AppManager();
            await this.appManager.init();



            // Test chart hover functionality
            this.testChartHover();

            // Setup performance monitoring
            this.setupPerformanceMonitoring();

            // Setup error handling
            this.setupErrorHandling();

            // Setup analytics (if needed)
            this.setupAnalytics();

            this.isInitialized = true;
            console.log('Payment Assistant App initialized successfully');

            // Dispatch custom event for other scripts
            window.dispatchEvent(new CustomEvent('app:initialized', {
                detail: { app: this }
            }));

        } catch (error) {
            console.error('Failed to initialize Payment Assistant App:', error);
            this.handleError(error);
        }
    }

    // Test chart hover functionality
    testChartHover() {
        console.log('Testing chart hover functionality...');
        
        // Check if chart area exists
        const chartArea = document.querySelector('.chart-area');
        if (chartArea) {
            console.log('Chart area found:', chartArea);
            
            // Check if SVG exists
            const svg = chartArea.querySelector('.chart-svg');
            if (svg) {
                console.log('Chart SVG found:', svg);
                
                // Check for existing data points
                const dataPoints = svg.querySelectorAll('.data-point');
                console.log('Existing data points found:', dataPoints.length);
                
                // Test hover areas
                if (this.appManager && this.appManager.chartManager) {
                    const chart = this.appManager.chartManager.charts.get('mainChart');
                    if (chart) {
                        console.log('Main chart found in ChartManager:', chart);
                        console.log('Chart hover areas:', chart.hoverAreas);
                    }
                }
            } else {
                console.warn('Chart SVG not found');
            }
        } else {
            console.warn('Chart area not found');
        }
    }

    // Setup performance monitoring
    setupPerformanceMonitoring() {
        // Monitor chart rendering performance
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.entryType === 'measure' && entry.duration > 100) {
                    console.warn('Slow operation detected:', entry.name, entry.duration + 'ms');
                }
            }
        });

        observer.observe({ entryTypes: ['measure'] });

        // Monitor memory usage
        if ('memory' in performance) {
            setInterval(() => {
                const memory = performance.memory;
                if (memory.usedJSHeapSize > 50 * 1024 * 1024) { // 50MB
                    console.warn('High memory usage detected:', 
                        Math.round(memory.usedJSHeapSize / 1024 / 1024) + 'MB');
                }
            }, 30000); // Check every 30 seconds
        }
    }

    // Setup error handling
    setupErrorHandling() {
        // Global error handler
        window.addEventListener('error', (event) => {
            this.handleError(event.error);
        });

        // Unhandled promise rejection handler
        window.addEventListener('unhandledrejection', (event) => {
            this.handleError(event.reason);
        });

        // Chart error handler
        if (this.appManager && this.appManager.chartManager) {
            this.appManager.chartManager.onError = (error) => {
                this.handleError(error);
            };
        }
    }

    // Handle errors gracefully
    handleError(error) {
        console.error('Application error:', error);

        // Only show error message for critical errors, not hover-related issues
        const errorMessage = error.message || error.toString();
        const isHoverError = errorMessage.includes('hover') || 
                           errorMessage.includes('tooltip') || 
                           errorMessage.includes('data-point') ||
                           errorMessage.includes('chartTooltip');
        
        if (!isHoverError) {
            this.showErrorMessage('Something went wrong. Please refresh the page and try again.');
        }

        // Log error to analytics (if available)
        if (window.gtag) {
            window.gtag('event', 'exception', {
                description: error.message,
                fatal: false
            });
        }
    }

    // Show error message to user
    showErrorMessage(message) {
        // Create error notification
        const notification = document.createElement('div');
        notification.className = 'error-notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #EF4444;
            color: white;
            padding: 12px 16px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            font-size: 14px;
            max-width: 300px;
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 5000);
    }

    // Setup analytics
    setupAnalytics() {
        // Track page views
        this.trackPageView();

        // Track user interactions
        this.setupInteractionTracking();
    }

    // Track page view
    trackPageView() {
        if (window.gtag) {
            window.gtag('config', 'GA_MEASUREMENT_ID', {
                page_title: document.title,
                page_location: window.location.href
            });
        }
    }

    // Setup interaction tracking
    setupInteractionTracking() {
        // Track tab switches
        this.eventManager?.delegate(document, '.tab-btn', 'click', (e, tab) => {
            this.trackEvent('tab_switch', {
                tab_name: tab.dataset.tab
            });
        });

        // Track business type changes
        this.eventManager?.delegate(document, '.business-type-tab', 'click', (e, tab) => {
            this.trackEvent('business_type_change', {
                business_type: tab.dataset.type
            });
        });

        // Track date range changes
        this.eventManager?.delegate(document, '[data-date-range]', 'click', (e, item) => {
            this.trackEvent('date_range_change', {
                date_range: item.dataset.dateRange
            });
        });

        // Track AI interactions
        this.eventManager?.delegate(document, '.ai-insight-indicator', 'click', (e, indicator) => {
            this.trackEvent('ai_insight_click', {
                insight_index: indicator.dataset.index
            });
        });
    }

    // Track custom events
    trackEvent(eventName, parameters = {}) {
        if (window.gtag) {
            window.gtag('event', eventName, parameters);
        }

        // Also log to console in development
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log('Event tracked:', eventName, parameters);
        }
    }

    // Get application state
    getState() {
        if (!this.appManager) return null;
        return this.appManager.getCurrentState();
    }

    // Update business type
    async updateBusinessType(businessType) {
        if (!this.appManager) return;
        await this.appManager.switchBusinessType(businessType);
    }

    // Update date range
    async updateDateRange(dateRange) {
        if (!this.appManager) return;
        await this.appManager.updateDateRange(dateRange);
    }

    // Switch tab
    switchTab(tabName) {
        if (!this.appManager) return;
        this.appManager.switchTab(tabName);
    }

    // Refresh data
    async refreshData() {
        if (!this.appManager) return;
        await this.appManager.reloadData();
    }

    // Get chart data
    getChartData() {
        if (!this.appManager || !this.appManager.dataGenerator) return null;
        return this.appManager.dataGenerator.generateAllData();
    }

    // Export data
    exportData(format = 'json') {
        const data = this.getChartData();
        if (!data) return;

        switch (format) {
            case 'json':
                this.downloadJSON(data, 'payment-analytics.json');
                break;
            case 'csv':
                this.downloadCSV(data, 'payment-analytics.csv');
                break;
            default:
                console.warn('Unsupported export format:', format);
        }
    }

    // Download JSON file
    downloadJSON(data, filename) {
        const blob = new Blob([JSON.stringify(data, null, 2)], {
            type: 'application/json'
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Download CSV file
    downloadCSV(data, filename) {
        // Convert data to CSV format
        const csvContent = this.convertToCSV(data);
        const blob = new Blob([csvContent], {
            type: 'text/csv'
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Convert data to CSV
    convertToCSV(data) {
        // Implementation for CSV conversion
        // This would convert the chart data to CSV format
        return 'Date,Current,Baseline,Optimized\n' +
               data.chartData.current.map((value, index) => {
                   const date = this.getDateLabels()[index];
                   return `${date},${value},${data.chartData.baseline[index]},${data.chartData.optimized[index]}`;
               }).join('\n');
    }

    // Get date labels
    getDateLabels() {
        if (!this.appManager) return [];
        return this.appManager.chartManager?.getDateLabels() || [];
    }

    // Cleanup application
    cleanup() {
        if (this.appManager) {
            this.appManager.cleanup();
        }
        

        
        this.isInitialized = false;
        console.log('Payment Assistant App cleaned up');
    }

    // Reload application
    async reload() {
        this.cleanup();
        await this.init();
    }
}

// Global app instance
window.PaymentAssistantApp = PaymentAssistantApp;

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    window.app = new PaymentAssistantApp();
    await window.app.init();
});

// Handle page unload
window.addEventListener('beforeunload', () => {
    if (window.app) {
        window.app.cleanup();
    }
});



// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PaymentAssistantApp;
}

// Add global debug functions
window.checkAppStatus = function() {
    if (window.app) {
        console.log('=== App Status ===');
        console.log('Initialized:', window.app.isInitialized);
        console.log('AppManager:', window.app.appManager ? 'Found' : 'Not found');
        
        if (window.app.appManager) {
            console.log('AppManager initialized:', window.app.appManager.isInitialized);
            console.log('ChartManager:', window.app.appManager.chartManager ? 'Found' : 'Not found');
            console.log('DataGenerator:', window.app.appManager.dataGenerator ? 'Found' : 'Not found');
            console.log('EventManager:', window.app.appManager.eventManager ? 'Found' : 'Not found');
        }
        
        console.log('==================');
        return {
            initialized: window.app.isInitialized,
            hasAppManager: !!window.app.appManager,
            appManagerInitialized: window.app.appManager?.isInitialized || false,
            hasChartManager: !!window.app.appManager?.chartManager,
            hasDataGenerator: !!window.app.appManager?.dataGenerator,
            hasEventManager: !!window.app.appManager?.eventManager
        };
    } else {
        console.error('App not found!');
        return null;
    }
};

window.debugChartHover = function() {
    if (window.app && window.app.appManager && window.app.appManager.chartManager) {
        const chartManager = window.app.appManager.chartManager;
        console.log('=== Chart Hover Debug ===');
        
        const mainChart = chartManager.charts.get('mainChart');
        if (mainChart) {
            console.log('Main chart element:', mainChart.element);
            
            const svg = mainChart.element?.querySelector('.chart-svg');
            if (svg) {
                console.log('SVG found:', svg);
                
                const dataPoints = svg.querySelectorAll('.data-point');
                console.log('Data points found:', dataPoints.length);
                
                if (dataPoints.length > 0) {
                    console.log('First data point:', dataPoints[0]);
                    console.log('First data point classes:', dataPoints[0].className);
                    console.log('First data point styles:', dataPoints[0].style.cssText);
                }
            } else {
                console.log('SVG not found in main chart');
            }
        } else {
            console.log('Main chart not found in ChartManager');
        }
        
        console.log('========================');
    } else {
        console.error('ChartManager not available for debugging');
    }
}; 