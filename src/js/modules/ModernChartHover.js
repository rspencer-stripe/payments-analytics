// Modern Chart Hover System - Built from scratch with best practices
class ModernChartHoverSystem {
    constructor() {
        this.currentTooltip = null;
        this.hoverTimeout = null;
        this.isInitialized = false;
        this.chartData = null;
        this.xPoints = [80, 200, 320, 440, 560, 680, 720];
        this.dateLabels = ['Apr 20', 'May 4', 'May 18', 'Jun 1', 'Jun 15', 'Jun 29', 'Jul 13'];
        this.tooltipContainer = null;
    }

    init() {
        if (this.isInitialized) return;
        
        console.log('Initializing Modern Chart Hover System...');
        
        // Create tooltip container
        this.createTooltipContainer();
        
        // Initialize hover areas
        this.initializeHoverAreas();
        
        // Add global event listeners
        this.addGlobalListeners();
        
        this.isInitialized = true;
        console.log('Modern Chart Hover System initialized successfully');
    }

    createTooltipContainer() {
        // Remove any existing tooltips
        const existingTooltips = document.querySelectorAll('.modern-chart-tooltip');
        existingTooltips.forEach(tooltip => tooltip.remove());

        // Create new tooltip container
        this.tooltipContainer = document.createElement('div');
        this.tooltipContainer.className = 'modern-chart-tooltip';
        this.tooltipContainer.style.cssText = `
            position: fixed;
            background: white;
            border: 1px solid #E4E7EC;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            padding: 16px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 13px;
            line-height: 1.4;
            z-index: 10000;
            pointer-events: none;
            opacity: 0;
            transform: translateY(-10px);
            transition: opacity 0.2s ease, transform 0.2s ease;
            max-width: 280px;
            min-width: 240px;
        `;
        
        document.body.appendChild(this.tooltipContainer);
    }

    initializeHoverAreas() {
        const chartArea = document.querySelector('.chart-area');
        if (!chartArea) {
            console.warn('Chart area not found');
            return;
        }

        const svg = chartArea.querySelector('.chart-svg');
        if (!svg) {
            console.warn('Chart SVG not found');
            return;
        }

        // Clear existing hover areas
        const existingAreas = svg.querySelectorAll('.hover-area');
        existingAreas.forEach(area => area.remove());

        // Create hover areas for each data point
        this.xPoints.forEach((x, index) => {
            const hoverArea = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            hoverArea.className = 'hover-area';
            hoverArea.setAttribute('x', x - 25);
            hoverArea.setAttribute('y', 0);
            hoverArea.setAttribute('width', 50);
            hoverArea.setAttribute('height', 200);
            hoverArea.setAttribute('fill', 'transparent');
            hoverArea.setAttribute('stroke', 'none');
            hoverArea.setAttribute('data-index', index);
            hoverArea.style.cursor = 'pointer';
            
            // Add event listeners
            hoverArea.addEventListener('mouseenter', (e) => this.handleHoverEnter(e, index));
            hoverArea.addEventListener('mouseleave', (e) => this.handleHoverLeave(e));
            
            svg.appendChild(hoverArea);
        });

        console.log(`Created ${this.xPoints.length} hover areas`);
    }

    addGlobalListeners() {
        // Handle tooltip positioning when mouse moves
        document.addEventListener('mousemove', (e) => {
            if (this.currentTooltip && this.tooltipContainer) {
                this.positionTooltip(e.clientX, e.clientY);
            }
        });

        // Hide tooltip when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.tooltipContainer?.contains(e.target)) {
                this.hideTooltip();
            }
        });
    }

    handleHoverEnter(event, index) {
        console.log(`Hover enter on data point ${index}`);
        
        // Clear any existing timeout
        if (this.hoverTimeout) {
            clearTimeout(this.hoverTimeout);
            this.hoverTimeout = null;
        }

        // Get chart data
        this.updateChartData();
        
        // Show tooltip
        this.showTooltip(event, index);
    }

    handleHoverLeave(event) {
        console.log('Hover leave');
        
        // Set timeout to hide tooltip (allows moving to tooltip)
        this.hoverTimeout = setTimeout(() => {
            this.hideTooltip();
        }, 150);
    }

    updateChartData() {
        try {
            // Check if RealisticDataGenerator is available
            if (typeof RealisticDataGenerator !== 'undefined') {
                const generator = new RealisticDataGenerator('medium', 'Last 90 days');
                this.chartData = generator.generateMainChartData();
            } else {
                // Use fallback data if RealisticDataGenerator is not available
                console.log('RealisticDataGenerator not available, using fallback data');
                this.chartData = {
                    current: [120, 100, 110, 90, 100, 80, 90],
                    baseline: [150, 120, 130, 110, 120, 100, 110],
                    optimized: [80, 60, 70, 50, 60, 40, 50]
                };
            }
        } catch (error) {
            console.error('Error updating chart data:', error);
            // Use fallback data
            this.chartData = {
                current: [120, 100, 110, 90, 100, 80, 90],
                baseline: [150, 120, 130, 110, 120, 100, 110],
                optimized: [80, 60, 70, 50, 60, 40, 50]
            };
        }
    }

    showTooltip(event, index) {
        if (!this.chartData || !this.tooltipContainer) return;

        // Convert Y coordinates to percentages
        const yToPercent = y => ((200 - y) / 2).toFixed(1) + '%';
        
        // Use hardcoded coordinates that match the SVG path exactly
        const exactCurrentY = [120, 100, 110, 90, 100, 80, 90];
        const exactBaselineY = [150, 130, 140, 120, 130, 110, 120];
        const exactIndustryBenchmarkY = [95, 80, 90, 70, 85, 65, 75];
        
        // Safety check for index bounds
        if (index < 0 || index >= exactCurrentY.length) {
            console.error('Invalid index for tooltip:', index);
            return;
        }
        
        const currentValue = yToPercent(exactCurrentY[index]);
        const baselineValue = yToPercent(exactBaselineY[index]);
        const optimizedValue = yToPercent(exactIndustryBenchmarkY[index]);
        const date = this.dateLabels[index];

        // Create tooltip content
        const tooltipContent = `
            <div style="margin-bottom: 12px;">
                <div style="font-weight: 600; font-size: 14px; color: #1A1F2E; margin-bottom: 8px;">
                    ${date}
                </div>
                <div style="display: flex; flex-direction: column; gap: 6px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div style="display: flex; align-items: center; gap: 6px;">
                            <div style="width: 10px; height: 2px; background: #533AFD;"></div>
                            <span style="color: #6C7689; font-size: 12px;">Current:</span>
                        </div>
                        <span style="font-weight: 600; color: #1A1F2E; font-size: 12px;">${currentValue}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div style="display: flex; align-items: center; gap: 6px;">
                            <div style="width: 10px; height: 2px; background: #E4E7EC;"></div>
                            <span style="color: #6C7689; font-size: 12px;">Baseline:</span>
                        </div>
                        <span style="font-weight: 600; color: #1A1F2E; font-size: 12px;">${baselineValue}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div style="display: flex; align-items: center; gap: 6px;">
                            <div style="width: 10px; height: 2px; background: #22C55E;"></div>
                            <span style="color: #6C7689; font-size: 12px;">Optimized:</span>
                        </div>
                        <span style="font-weight: 600; color: #1A1F2E; font-size: 12px;">${optimizedValue}</span>
                    </div>
                </div>
            </div>
            <div style="border-top: 1px solid #E4E7EC; padding-top: 8px;">
                <div style="display: flex; gap: 8px;">
                    <button class="tooltip-action-btn" onclick="window.chartHoverSystem.showChangesAnalysis(${index})" style="
                        background: white;
                        border: 1px solid #E4E7EC;
                        border-radius: 4px;
                        padding: 4px 8px;
                        font-size: 11px;
                        color: #6C7689;
                        cursor: pointer;
                        pointer-events: auto;
                    ">What's changed?</button>
                    <button class="tooltip-action-btn" onclick="window.chartHoverSystem.askAssistant(${index})" style="
                        background: white;
                        border: 1px solid #E4E7EC;
                        border-radius: 4px;
                        padding: 4px 8px;
                        font-size: 11px;
                        color: #6C7689;
                        cursor: pointer;
                        pointer-events: auto;
                    ">Ask Assistant</button>
                </div>
            </div>
        `;

        this.tooltipContainer.innerHTML = tooltipContent;
        this.currentTooltip = { index, event };
        
        // Position and show tooltip
        this.positionTooltip(event.clientX, event.clientY);
        this.tooltipContainer.style.opacity = '1';
        this.tooltipContainer.style.transform = 'translateY(0)';
    }

    positionTooltip(mouseX, mouseY) {
        if (!this.tooltipContainer) return;

        const tooltipRect = this.tooltipContainer.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        let x = mouseX + 15;
        let y = mouseY - 10;

        // Adjust horizontal position if tooltip goes off-screen
        if (x + tooltipRect.width > viewportWidth - 10) {
            x = mouseX - tooltipRect.width - 15;
        }

        // Adjust vertical position if tooltip goes off-screen
        if (y < 10) {
            y = mouseY + 15;
        }
        if (y + tooltipRect.height > viewportHeight - 10) {
            y = viewportHeight - tooltipRect.height - 10;
        }

        // Ensure minimum distance from edges
        x = Math.max(10, Math.min(x, viewportWidth - tooltipRect.width - 10));
        y = Math.max(10, Math.min(y, viewportHeight - tooltipRect.height - 10));

        this.tooltipContainer.style.left = x + 'px';
        this.tooltipContainer.style.top = y + 'px';
    }

    hideTooltip() {
        if (this.tooltipContainer) {
            this.tooltipContainer.style.opacity = '0';
            this.tooltipContainer.style.transform = 'translateY(-10px)';
            this.currentTooltip = null;
        }
        
        if (this.hoverTimeout) {
            clearTimeout(this.hoverTimeout);
            this.hoverTimeout = null;
        }
    }

    showChangesAnalysis(index) {
        console.log(`Showing changes analysis for index ${index}`);
        // Implementation for changes analysis popup
        alert(`Changes analysis for ${this.dateLabels[index]} - This would show detailed analysis`);
    }

    askAssistant(index) {
        console.log(`Asking assistant about index ${index}`);
        // Implementation for AI assistant
        alert(`AI Assistant for ${this.dateLabels[index]} - This would open AI panel`);
    }

    destroy() {
        if (this.tooltipContainer) {
            this.tooltipContainer.remove();
        }
        if (this.hoverTimeout) {
            clearTimeout(this.hoverTimeout);
        }
        this.isInitialized = false;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ModernChartHoverSystem;
} else {
    window.ModernChartHoverSystem = ModernChartHoverSystem;
} 