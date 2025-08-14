// Main Application Manager
class AppManager {
    constructor() {
        this.dataGenerator = null;
        this.chartManager = null;
        this.eventManager = null;
        this.currentBusinessType = 'growth';
        this.currentDateRange = 'Last 90 days';
        this.currentTab = 'overview';
        this.isInitialized = false;
    }

    // Utility function for formatting USD amounts
    formatUSD(amount) {
        if (typeof amount !== 'number' || isNaN(amount)) {
            return '$0.00';
        }
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    }

    // Initialize the application
    async init() {
        if (this.isInitialized) return;

        try {
            // Initialize managers
            this.dataGenerator = new RealisticDataGenerator(this.currentBusinessType, this.currentDateRange);
            this.chartManager = new ChartManager();
            this.eventManager = new EventManager();

            // Setup event listeners
            this.setupGlobalEvents();
            this.setupTabNavigation();
            this.setupDropdowns();
            this.setupMetricCards();

            // Initialize charts
            this.initializeCharts();

            // Load initial data
            await this.loadInitialData();

            this.isInitialized = true;
            console.log('AppManager initialized successfully');
        } catch (error) {
            console.error('Failed to initialize AppManager:', error);
        }
    }

    // Setup global event listeners
    setupGlobalEvents() {
        // Business type switching
        this.eventManager.delegate(document, '.business-type-tab', 'click', (e, tab) => {
            const businessType = tab.dataset.type;
            this.switchBusinessType(businessType);
        });

        // Date range changes
        this.eventManager.delegate(document, '[data-date-range]', 'click', (e, item) => {
            const dateRange = item.dataset.dateRange;
            this.updateDateRange(dateRange);
        });

        // Metric card selection
        this.eventManager.delegate(document, '.metric-card', 'click', (e, card) => {
            this.selectMetricCard(card);
        });

        // AI panel interactions
        this.eventManager.delegate(document, '.ai-insight-indicator', 'click', (e, indicator) => {
            this.handleAIInsightClick(indicator);
        });

        // Acceptance alert interactions
        this.eventManager.delegate(document, '.acceptance-alert-indicator', 'click', (e, indicator) => {
            this.handleAcceptanceAlertClick(indicator);
        });
    }

    // Setup tab navigation
    setupTabNavigation() {
        const tabContainer = document.querySelector('.tab-navigation');
        if (tabContainer) {
            this.tabManager = this.eventManager.setupTabEvents(tabContainer, {
                onTabChange: (tabName, tab, content) => {
                    this.switchTab(tabName);
                }
            });
        }
    }

    // Setup dropdowns
    setupDropdowns() {
        // Date range dropdowns
        const dateRangeDropdowns = document.querySelectorAll('.date-range-dropdown');
        dateRangeDropdowns.forEach(dropdown => {
            this.eventManager.setupDropdownEvents(dropdown, {
                onSelect: (value) => this.updateDateRange(value)
            });
        });

        // Business type dropdown
        const businessTypeDropdown = document.querySelector('.business-type-dropdown');
        if (businessTypeDropdown) {
            this.eventManager.setupDropdownEvents(businessTypeDropdown, {
                onSelect: (value) => this.switchBusinessType(value)
            });
        }
    }

    // Setup metric cards
    setupMetricCards() {
        const metricCards = document.querySelectorAll('.metric-card');
        metricCards.forEach(card => {
            // Add hover effects
            this.eventManager.addListener(card, 'mouseenter', () => {
                card.style.transform = 'translateY(-1px)';
                card.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)';
            });

            this.eventManager.addListener(card, 'mouseleave', () => {
                card.style.transform = '';
                card.style.boxShadow = '';
            });
        });
    }

    // Initialize charts
    initializeCharts() {
        console.log('AppManager: Initializing charts...');
        
        // Main chart
        const mainChart = this.chartManager.initChart('mainChart', {
            type: 'line',
            xPoints: [80, 200, 320, 440, 560, 680, 720]
        });
        console.log('AppManager: Main chart initialized:', mainChart);

        // Failed payments chart
        const failedChart = this.chartManager.initChart('failedChart', {
            type: 'bar'
        });
        console.log('AppManager: Failed chart initialized:', failedChart);

        // Performance charts
        const performanceChart = this.chartManager.initChart('performanceChart', {
            type: 'line'
        });
        console.log('AppManager: Performance chart initialized:', performanceChart);
    }

    // Load initial data
    async loadInitialData() {
        const data = this.dataGenerator.generateAllData();
        await this.updateAllCharts(data);
        this.updateMetrics(data.metrics);
    }

    // Switch business type
    async switchBusinessType(businessType) {
        this.currentBusinessType = businessType;
        this.dataGenerator = new RealisticDataGenerator(businessType, this.currentDateRange);
        
        // Update UI
        document.querySelectorAll('.business-type-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.type === businessType);
        });

        // Reload data
        await this.reloadData();
    }

    // Update date range
    async updateDateRange(dateRange) {
        this.currentDateRange = dateRange;
        this.dataGenerator = new RealisticDataGenerator(this.currentBusinessType, dateRange);
        
        // Update UI
        document.querySelectorAll('.date-range-dropdown').forEach(dropdown => {
            const textElement = dropdown.querySelector('.dropdown-text');
            if (textElement) {
                textElement.textContent = dateRange;
            }
        });

        // Reload data
        await this.reloadData();
    }

    // Switch tab
    switchTab(tabName) {
        this.currentTab = tabName;
        
        // Update tab UI
        document.querySelectorAll('.tab-btn').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === tabName);
        });

        // Update content visibility
        document.querySelectorAll('.tab-content').forEach(content => {
            content.style.display = content.dataset.tab === tabName ? 'block' : 'none';
        });

        // Load tab-specific data
        this.loadTabData(tabName);
    }

    // Select metric card
    selectMetricCard(card) {
        // Update selection
        document.querySelectorAll('.metric-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');

        // Update chart based on selected metric
        const metricLabel = card.querySelector('.metric-label')?.textContent;
        if (metricLabel) {
            this.updateChartForMetric(metricLabel);
        }
    }

    // Handle AI insight click
    handleAIInsightClick(indicator) {
        const index = indicator.dataset.index;
        const currentBusinessType = this.currentBusinessType;
        const dateRange = this.currentDateRange;
        
        this.openAIPanel(
            'I see there\'s an optimization opportunity. How can I improve my authorization rate?',
            currentBusinessType,
            'optimization',
            85.2,
            dateRange,
            0
        );
    }

    // Handle acceptance alert click
    handleAcceptanceAlertClick(indicator) {
        const index = indicator.dataset.index;
        this.showAcceptanceAlertTooltip(indicator);
    }

    // Reload data
    async reloadData() {
        const data = this.dataGenerator.generateAllData();
        await this.updateAllCharts(data);
        this.updateMetrics(data.metrics);
    }

    // Update all charts
    async updateAllCharts(data) {
        // Update main chart
        if (this.chartManager.charts.has('mainChart')) {
            const xPoints = [80, 200, 320, 440, 560, 680, 720];
            this.chartManager.updateChart('mainChart', data.chartData, xPoints);
        }

        // Update failed chart
        if (this.chartManager.charts.has('failedChart')) {
            // Default to 'failed-volume' if no specific metric is provided
            const metric = data.failedData?.metric || 'failed-volume';
            this.updateFailedChart(metric);
        }

        // Update performance chart
        if (this.chartManager.charts.has('performanceChart')) {
            this.updatePerformanceChart(data);
        }
    }

    // Update metrics display
    updateMetrics(metrics) {
        const successRateCard = document.querySelector('.metric-card .metric-value');
        const volumeCard = document.querySelectorAll('.metric-card .metric-value')[1];
        const paymentsCard = document.querySelectorAll('.metric-card .metric-value')[2];

        if (successRateCard) successRateCard.textContent = metrics.successRate.toFixed(2) + '%';
        if (volumeCard) volumeCard.textContent = formatUSD(metrics.volume);
        if (paymentsCard) paymentsCard.textContent = Math.round(metrics.payments).toString();

        // Update legend values
        this.updateLegendValues(metrics);
    }

    // Update legend values
    updateLegendValues(metrics) {
        const legendCurrent = document.getElementById('legend-current-value');
        const legendBaseline = document.getElementById('legend-baseline-value');
        const legendOptimized = document.getElementById('legend-optimized-value');

        if (legendCurrent && legendBaseline && legendOptimized) {
            const yToPercent = y => ((200-y)/2).toFixed(1) + '%';
            
            legendCurrent.textContent = yToPercent(metrics.current || 85.2);
            legendBaseline.textContent = yToPercent(metrics.baseline || 82.1);
            legendOptimized.textContent = yToPercent(metrics.optimized || 93.5);
        }
    }

    // Update chart for specific metric
    updateChartForMetric(metricLabel) {
        const data = this.dataGenerator.generateAllData();
        
        switch (metricLabel) {
            case 'Payment success rate':
                this.updateMainChart(data.chartData);
                break;
            case 'Accepted volume':
                this.updateAcceptedVolumeChart(data);
                break;
            case 'Accepted payments':
                this.updateAcceptedPaymentsChart(data);
                break;
        }
    }

    // Load tab-specific data
    loadTabData(tabName) {
        const data = this.dataGenerator.generateAllData();
        
        switch (tabName) {
            case 'overview':
                this.loadOverviewData(data);
                break;
            case 'acceptance':
                this.loadAcceptanceData(data);
                break;
            case 'optimization':
                this.loadOptimizationData(data);
                break;
            case 'failed':
                this.loadFailedData(data);
                break;
        }
    }

    // Load overview data
    loadOverviewData(data) {
        this.updateOverviewMetrics(data.metrics);
        this.updateOverviewCharts(data);
    }

    // Load acceptance data
    loadAcceptanceData(data) {
        this.updateAcceptanceMetrics(data.metrics);
        this.updateAcceptanceCharts(data);
    }

    // Load optimization data
    loadOptimizationData(data) {
        this.updateOptimizationMetrics(data.metrics);
        this.updateOptimizationCharts(data);
    }

    // Load failed data
    loadFailedData(data) {
        this.updateFailedMetrics(data.metrics);
        this.updateFailedCharts(data);
    }

    // Update main chart - integrate with existing system and ChartManager
    updateMainChart(chartData) {
        // Call the existing updateMainChart function from HTML
        if (typeof window.updateMainChart === 'function') {
            const currentDateRange = this.currentDateRange;
            const currentBusinessType = this.currentBusinessType;
            window.updateMainChart(currentDateRange, currentBusinessType);
        }

        // Also update via ChartManager for enhanced hover functionality
        if (this.chartManager && this.chartManager.charts.has('mainChart')) {
            const xPoints = [80, 200, 320, 440, 560, 680, 720];
            this.chartManager.updateChart('mainChart', chartData, xPoints);
        }
    }

    updateAcceptedVolumeChart(data) {
        // Call existing function if available
        if (typeof window.updateAcceptedVolumeChart === 'function') {
            window.updateAcceptedVolumeChart(data);
        }
    }

    updateAcceptedPaymentsChart(data) {
        // Call existing function if available
        if (typeof window.updateAcceptedPaymentsChart === 'function') {
            window.updateAcceptedPaymentsChart(data);
        }
    }

    updateFailedChart(failedData) {
        // Call existing function if available
        if (typeof window.updateFailedChart === 'function') {
            window.updateFailedChart(failedData);
        }
    }

    updatePerformanceChart(data) {
        // Call existing function if available
        if (typeof window.updatePerformanceChart === 'function') {
            window.updatePerformanceChart(data);
        }
    }

    // Update overview metrics
    updateOverviewMetrics(metrics) {
        // Update metric cards
        const successRateCard = document.querySelector('.metric-card .metric-value');
        const volumeCard = document.querySelectorAll('.metric-card .metric-value')[1];
        const paymentsCard = document.querySelectorAll('.metric-card .metric-value')[2];

        if (successRateCard) successRateCard.textContent = metrics.successRate.toFixed(2) + '%';
        if (volumeCard) volumeCard.textContent = formatUSD(metrics.volume);
        if (paymentsCard) paymentsCard.textContent = Math.round(metrics.payments).toString();

        // Update legend values
        this.updateLegendValues(metrics);
    }

    // Update overview charts
    updateOverviewCharts(data) {
        this.updateMainChart(data.chartData);
    }

    // Update acceptance metrics
    updateAcceptanceMetrics(metrics) {
        // Update acceptance-specific metrics
        const metricValue = document.getElementById('metric-value');
        if (metricValue) {
            metricValue.textContent = formatUSD(metrics.volume);
        }
    }

    // Update acceptance charts
    updateAcceptanceCharts(data) {
        this.updateAcceptedVolumeChart(data);
    }

    // Update optimization metrics
    updateOptimizationMetrics(metrics) {
        // Update optimization-specific metrics
    }

    // Update optimization charts
    updateOptimizationCharts(data) {
        this.updatePerformanceChart(data);
    }

    // Update failed metrics
    updateFailedMetrics(metrics) {
        // Update failed-specific metrics
    }

    // Update failed charts
    updateFailedCharts(data) {
        this.updateFailedChart(data.failedData);
    }

    // Open AI panel
    openAIPanel(question, businessType, topic, metric, dateRange, payments = null) {
        // Call existing AI panel function if available
        if (typeof window.openAIPanel === 'function') {
            window.openAIPanel(question, businessType, topic, metric, dateRange, payments);
        }
    }

    // Show acceptance alert tooltip
    showAcceptanceAlertTooltip(indicator) {
        // Call existing tooltip function if available
        if (typeof window.showAcceptanceAlertTooltip === 'function') {
            window.showAcceptanceAlertTooltip(indicator);
        }
    }

    // Get current state
    getCurrentState() {
        return {
            businessType: this.currentBusinessType,
            dateRange: this.currentDateRange,
            tab: this.currentTab,
            isInitialized: this.isInitialized
        };
    }

    // Cleanup method
    cleanup() {
        if (this.chartManager) {
            this.chartManager.cleanup();
        }
        
        if (this.eventManager) {
            this.eventManager.cleanup();
        }
        
        this.isInitialized = false;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AppManager;
} else {
    window.AppManager = AppManager;
} 