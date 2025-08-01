// Data Generator for realistic payment performance
if (typeof RealisticDataGenerator === 'undefined') {
    class RealisticDataGenerator {
        constructor(businessType, dateRange) {
            this.businessType = businessType;
            this.dateRange = dateRange;
            this.dataPoints = this.getDataPointsForRange(dateRange);
            this.seed = this.getSeed(businessType, dateRange);
            this.rng = this.seededRandom(this.seed);
        }

        // Get consistent seed for reproducible data
        getSeed(businessType, dateRange) {
            const businessSeeds = { 'small': 1000, 'medium': 2000, 'large': 3000 };
            const rangeSeeds = { 
                'Last 7 days': 1, 'Last 30 days': 2, 'Last 60 days': 3, 
                'Last 90 days': 4, 'Last 6 months': 5, 'Last 12 months': 6
            };
            return businessSeeds[businessType] + rangeSeeds[dateRange];
        }

        // Seeded random number generator for consistent data
        seededRandom(seed) {
            let state = seed;
            return function() {
                state = (state * 9301 + 49297) % 233280;
                return state / 233280;
            };
        }

        // Get number of data points for each timeframe
        getDataPointsForRange(dateRange) {
            const points = { 
                'Last 7 days': 7, 'Last 30 days': 8, 'Last 60 days': 8, 
                'Last 90 days': 7, 'Last 6 months': 8, 'Last 12 months': 12
            };
            return points[dateRange] || 7;
        }

        // Generate business-specific base metrics
        getBusinessMetrics() {
            const metrics = {
                'small': {
                    successRate: 78.5,
                    avgTransactionValue: 11.2,
                    dailyTransactions: 3.1,
                    failureRate: 21.5,
                    disputeRate: 0.8
                },
                'medium': {
                    successRate: 85.2,
                    avgTransactionValue: 14.4,
                    dailyTransactions: 19.3,
                    failureRate: 14.8,
                    disputeRate: 0.4
                },
                'large': {
                    successRate: 91.7,
                    avgTransactionValue: 14.0,
                    dailyTransactions: 139.2,
                    failureRate: 8.3,
                    disputeRate: 0.2
                }
            };
            return metrics[this.businessType];
        }

        // Generate timeframe multipliers
        getTimeframeMultipliers() {
            const multipliers = {
                'Last 7 days': { volume: 0.078, payments: 0.078, days: 7 },
                'Last 30 days': { volume: 0.333, payments: 0.333, days: 30 },
                'Last 60 days': { volume: 0.667, payments: 0.667, days: 60 },
                'Last 90 days': { volume: 1.0, payments: 1.0, days: 90 },
                'Last 6 months': { volume: 2.0, payments: 2.0, days: 180 },
                'Last 12 months': { volume: 4.0, payments: 4.0, days: 365 }
            };
            return multipliers[this.dateRange];
        }

        // Generate realistic time series data with trends and seasonality
        generateTimeSeriesData(baseValue, volatility = 0.15, trend = 0) {
            const data = [];
            let currentValue = baseValue;
            
            for (let i = 0; i < this.dataPoints; i++) {
                currentValue += trend;
                
                // Add weekly seasonality (weekend effect)
                const dayOfWeek = (i % 7);
                const weekendEffect = (dayOfWeek === 0 || dayOfWeek === 6) ? 0.8 : 1.0;
                
                // Add random variation
                const randomFactor = 1 + (this.rng() - 0.5) * volatility * 2;
                
                const finalValue = Math.max(0, currentValue * weekendEffect * randomFactor);
                data.push(Math.round(finalValue * 100) / 100);
            }
            
            return data;
        }

        // Generate main chart data
        generateMainChartData() {
            const businessMetrics = this.getBusinessMetrics();
            const multipliers = this.getTimeframeMultipliers();
            
            // Generate current period data
            const currentSuccessRate = this.generateTimeSeriesData(
                businessMetrics.successRate, 
                0.08, 
                0.2 // Slight upward trend
            );
            
            // Generate baseline data (slightly lower)
            const baselineSuccessRate = this.generateTimeSeriesData(
                businessMetrics.successRate - 3, 
                0.1, 
                0.1
            );
            
            // Generate optimized data (higher performance)
            const optimizedSuccessRate = this.generateTimeSeriesData(
                businessMetrics.successRate + 8, 
                0.06, 
                0.3
            );
            
            return {
                current: currentSuccessRate,
                baseline: baselineSuccessRate,
                optimized: optimizedSuccessRate
            };
        }

        // Generate all data for the application
        generateAllData() {
            const businessMetrics = this.getBusinessMetrics();
            const multipliers = this.getTimeframeMultipliers();
            
            return {
                metrics: {
                    successRate: businessMetrics.successRate,
                    volume: businessMetrics.avgTransactionValue * businessMetrics.dailyTransactions * multipliers.days,
                    payments: businessMetrics.dailyTransactions * multipliers.days
                },
                chartData: this.generateMainChartData(),
                breakdownData: this.generateBreakdownData(),
                failedData: this.generateFailedData()
            };
        }

        // Generate breakdown data
        generateBreakdownData() {
            const cardTypes = ['Visa', 'Mastercard', 'American Express', 'Discover'];
            const data = {};
            
            cardTypes.forEach(type => {
                data[type] = {
                    volume: this.generateTimeSeriesData(100, 0.2),
                    count: this.generateTimeSeriesData(50, 0.25),
                    successRate: this.generateTimeSeriesData(85, 0.1)
                };
            });
            
            return data;
        }

        // Generate failed payment data
        generateFailedData() {
            const failureTypes = ['Insufficient funds', 'Card declined', 'Expired card', 'Invalid CVV'];
            const data = {};
            
            failureTypes.forEach(type => {
                data[type] = {
                    count: this.generateTimeSeriesData(10, 0.3),
                    amount: this.generateTimeSeriesData(150, 0.25)
                };
            });
            
            return data;
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RealisticDataGenerator;
} else {
    window.RealisticDataGenerator = RealisticDataGenerator;
} 