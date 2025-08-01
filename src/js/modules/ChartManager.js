// Chart Management System - Enhanced hover functionality
class ChartManager {
    constructor() {
        this.charts = new Map();
        this.isInitialized = false;
        this.hoverEnhancements = new Map();
    }

    // Initialize chart with existing system integration
    initChart(chartId, config) {
        if (this.charts.has(chartId)) {
            return this.charts.get(chartId);
        }

        // Map chart IDs to actual DOM selectors
        const chartSelectors = {
            'mainChart': '.chart-area',
            'failedChart': '.bar-chart-area',
            'performanceChart': '.chart-area'
        };

        const selector = chartSelectors[chartId];
        const element = document.querySelector(selector);

        const chart = {
            id: chartId,
            element: element,
            config: config,
            data: null
        };

        if (chart.element) {
            this.charts.set(chartId, chart);
            this.enhanceExistingHover(chart);
            // Enhanced hover functionality (disabled to avoid conflicts)
        } else {
            console.warn(`ChartManager: Could not find element for chart ${chartId} with selector ${selector}`);
        }

        return chart;
    }

    // Enhance existing hover functionality
    enhanceExistingHover(chart) {
        // The existing HTML already has working hover functionality
        // No need to add additional listeners that would conflict
        // This method is intentionally empty to avoid conflicts
    }

    // Simple approach: just use the existing CSS hover states and add tooltip functionality
    // The existing CSS will handle the visual feedback, we just need to trigger tooltips

    // Simple global listener that doesn't conflict with existing system
    addSimpleGlobalListener(chart) {
        // This method is intentionally empty to avoid conflicts with existing HTML hover system
    }

    // Get chart data for specific chart
    getChartDataForChart(chart) {
        if (chart.data) {
            return chart.data;
        }
        
        // Fallback to generating fresh data
        if (typeof window.RealisticDataGenerator !== 'undefined') {
            const generator = new window.RealisticDataGenerator('medium', 'Last 90 days');
            const data = generator.generateMainChartData();
            return data;
        }
        
        return null;
    }

    // Update chart data efficiently - work with existing system
    updateChart(chartId, chartData, xPoints) {
        const chart = this.charts.get(chartId);
        if (!chart) {
            console.warn(`ChartManager: Chart ${chartId} not found`);
            return;
        }

        // Store the data for hover functionality
        chart.data = chartData;
        
        // Chart data updated
    }

    // Manual trigger for testing hover functionality
    triggerHoverTest(chartId) {
        const chart = this.charts.get(chartId);
        if (!chart) {
            console.warn(`ChartManager: Chart ${chartId} not found for hover test`);
            return;
        }
        
        const svg = chart.element.querySelector('.chart-svg');
        if (!svg) {
            console.warn(`ChartManager: No SVG found for hover test`);
            return;
        }
        
        const dataPoints = svg.querySelectorAll('.data-point');
        if (dataPoints.length === 0) {
            console.warn(`ChartManager: No data points found for hover test`);
            return;
        }
        
        // Triggering hover test on first data point
        const firstPoint = dataPoints[0];
        
        // Simulate mouse enter
        const mouseEnterEvent = new MouseEvent('mouseenter', {
            bubbles: true,
            cancelable: true,
            clientX: 100,
            clientY: 100
        });
        
        firstPoint.dispatchEvent(mouseEnterEvent);
        
        // Simulate mouse leave after 2 seconds
        setTimeout(() => {
            const mouseLeaveEvent = new MouseEvent('mouseleave', {
                bubbles: true,
                cancelable: true
            });
            firstPoint.dispatchEvent(mouseLeaveEvent);
        }, 2000);
    }

    // Cleanup method to prevent memory leaks
    cleanup() {
        // Clear maps
        this.charts.clear();
        this.hoverEnhancements.clear();
    }

    // Debug method to check ChartManager status
    checkStatus() {
        // (Removed console.log output to prevent flooding)
        return {
            initialized: this.isInitialized,
            chartCount: this.charts.size,
            chartIds: Array.from(this.charts.keys()),
            hoverEnhancementCount: this.hoverEnhancements.size,
            charts: Array.from(this.charts.entries()).map(([chartId, chart]) => ({
                chartId,
                element: !!chart.element,
                hasData: !!chart.data,
                config: chart.config
            }))
        };
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ChartManager;
} else {
    window.ChartManager = ChartManager;
    
    // Add global debug function
    window.checkChartManagerStatus = function() {
        if (window.app && window.app.appManager && window.app.appManager.chartManager) {
            return window.app.appManager.chartManager.checkStatus();
        } else if (window.ChartManager) {
            console.warn('ChartManager class exists but no instance found. Creating temporary instance...');
            const tempManager = new ChartManager();
            return tempManager.checkStatus();
        } else {
            console.error('ChartManager not found!');
            return null;
        }
    };
}