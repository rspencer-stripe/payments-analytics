// Data Generator for realistic payment performance
console.log('Loading RealisticDataGenerator class...');
class RealisticDataGenerator {
        constructor(businessType, dateRange) {
            console.log('Creating RealisticDataGenerator instance with:', businessType, dateRange);
            this.businessType = businessType;
            this.dateRange = dateRange;
            this.dataPoints = this.getDataPointsForRange(dateRange);
            this.seed = this.getSeed(businessType, dateRange);
            this.rng = this.seededRandom(this.seed);
            this.optimizationState = this.getOptimizationState();
            console.log('RealisticDataGenerator instance created successfully');
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

        // Get optimization state from localStorage or create default
        getOptimizationState() {
            // Force clear localStorage to ensure new data format is used
            console.log('Clearing localStorage to ensure new optimization data format');
            localStorage.removeItem('stripeOptimizations');
            
            return this.getDefaultOptimizationState();
        }

        // Get default optimization state with realistic business impact values
        getDefaultOptimizationState() {
            
            // Default optimization state with realistic business impact values
            return {
                'adaptive-acceptance': {
                    id: 'adaptive-acceptance',
                    title: 'Adaptive Acceptance',
                    description: 'Intelligent payment routing based on success patterns',
                    status: 'active',
                    enabledDate: '2024-07-15',
                    impact: {
                        volume: 12500,
                        payments: 45,
                        successRate: 2.8
                    },
                    category: 'Acceptance',
                    effort: 'Medium',
                    revenue: '+$15,000/year'
                },
                'network-tokens': {
                    id: 'network-tokens',
                    title: 'Network Tokens',
                    description: 'Replace card numbers with secure network tokens',
                    status: 'active',
                    enabledDate: '2024-06-10',
                    impact: {
                        volume: 8200,
                        payments: 28,
                        successRate: 1.5
                    },
                    category: 'Security',
                    effort: 'Easy',
                    revenue: '+$9,800/year'
                },
                'card-account-updater': {
                    id: 'card-account-updater',
                    title: 'Card account updater',
                    description: 'Automatically update expired or changed card details',
                    status: 'active',
                    enabledDate: '2024-05-20',
                    impact: {
                        volume: 6800,
                        payments: 22,
                        successRate: 1.2
                    },
                    category: 'Recovery',
                    effort: 'Easy',
                    revenue: '+$8,200/year'
                },
                'smart-retries': {
                    id: 'smart-retries',
                    title: 'Smart Retries',
                    description: 'Intelligent retry logic for declined transactions',
                    status: 'active',
                    enabledDate: '2024-06-20',
                    impact: {
                        volume: 18900,
                        payments: 67,
                        successRate: 3.2
                    },
                    category: 'Recovery',
                    effort: 'Medium',
                    revenue: '+$22,600/year'
                },
                'digital-wallets': {
                    id: 'digital-wallets',
                    title: 'Digital Wallets',
                    description: 'Apple Pay and Google Pay integration',
                    status: 'active',
                    enabledDate: '2024-05-10',
                    impact: {
                        volume: 15600,
                        payments: 52,
                        successRate: 2.1
                    },
                    category: 'Payment Methods',
                    effort: 'Medium',
                    revenue: '+$18,700/year'
                },
                'address-verification': {
                    id: 'address-verification',
                    title: 'Address Verification',
                    description: 'Enhanced fraud prevention with address validation',
                    status: 'inactive',
                    enabledDate: null,
                    impact: {
                        volume: 4200,
                        payments: 15,
                        successRate: 0.8
                    },
                    category: 'Security',
                    effort: 'Easy',
                    revenue: '+$5,000/year'
                },
                '3d-secure': {
                    id: '3d-secure',
                    title: '3D Secure 2.0',
                    description: 'Enhanced authentication for high-risk transactions',
                    status: 'active',
                    enabledDate: '2024-04-15',
                    impact: {
                        volume: 9800,
                        payments: 34,
                        successRate: 1.8
                    },
                    category: 'Security',
                    effort: 'Medium',
                    revenue: '+$11,800/year'
                },
                'installments': {
                    id: 'installments',
                    title: 'Buy Now, Pay Later',
                    description: 'Offer installment payment options to customers',
                    status: 'inactive',
                    enabledDate: null,
                    impact: {
                        volume: 22500,
                        payments: 78,
                        successRate: 2.5
                    },
                    category: 'Payment Methods',
                    effort: 'Hard',
                    revenue: '+$27,000/year'
                }
            };
        }

        // Save optimization state to localStorage
        saveOptimizationState() {
            localStorage.setItem('stripeOptimizations', JSON.stringify(this.optimizationState));
        }

        // Enable an optimization
        enableOptimization(optimizationId) {
            if (this.optimizationState[optimizationId]) {
                this.optimizationState[optimizationId].status = 'active';
                this.optimizationState[optimizationId].enabledDate = new Date().toISOString().split('T')[0];
                this.saveOptimizationState();
                return true;
            }
            return false;
        }

        // Disable an optimization
        disableOptimization(optimizationId) {
            if (this.optimizationState[optimizationId]) {
                this.optimizationState[optimizationId].status = 'inactive';
                this.optimizationState[optimizationId].enabledDate = null;
                this.saveOptimizationState();
                return true;
            }
            return false;
        }

        // Get active optimizations
        getActiveOptimizations() {
            return Object.values(this.optimizationState).filter(opt => opt.status === 'active');
        }

        // Get inactive optimizations
        getInactiveOptimizations() {
            return Object.values(this.optimizationState).filter(opt => opt.status === 'inactive');
        }

        // Generate business-specific base metrics - Updated for realism
        getBusinessMetrics() {
            const metrics = {
                'small': {
                    // Small business: E-commerce, SaaS, or local business
                    successRate: 82.5,
                    avgTransactionValue: 45.20,
                    dailyTransactions: 8.5,
                    failureRate: 17.5,
                    disputeRate: 1.2,
                    fraudRate: 0.8,
                    processingCost: 2.9,
                    authorizationRate: 89.3
                },
                'medium': {
                    // Medium business: Growing online business
                    successRate: 87.8,
                    avgTransactionValue: 78.40,
                    dailyTransactions: 45.2,
                    failureRate: 12.2,
                    disputeRate: 0.6,
                    fraudRate: 0.4,
                    processingCost: 2.7,
                    authorizationRate: 92.3
                },
                'large': {
                    // Large business: Established enterprise
                    successRate: 93.2,
                    avgTransactionValue: 125.80,
                    dailyTransactions: 320.5,
                    failureRate: 6.8,
                    disputeRate: 0.3,
                    fraudRate: 0.2,
                    processingCost: 2.4,
                    authorizationRate: 95.1
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
                    payments: businessMetrics.dailyTransactions * multipliers.days,
                    authorizationRate: businessMetrics.authorizationRate,
                    fraudRate: businessMetrics.fraudRate,
                    processingCost: businessMetrics.processingCost,
                    disputeRate: businessMetrics.disputeRate
                },
                chartData: this.generateMainChartData(),
                breakdownData: this.generateBreakdownData(),
                failedData: this.generateFailedData()
            };
        }

        // Generate breakdown data - Updated for realism
        generateBreakdownData() {
            const cardTypes = ['Credit card', 'Debit card', 'Prepaid card'];
            const data = {};
            
            // Realistic card type distribution
            const distributions = {
                'Credit card': { volume: 0.70, success: 0.85 },
                'Debit card': { volume: 0.25, success: 0.75 },
                'Prepaid card': { volume: 0.05, success: 0.95 }
            };
            
            cardTypes.forEach(type => {
                const baseVolume = 1000 * distributions[type].volume;
                const baseSuccess = distributions[type].success * 100;
                
                data[type] = {
                    volume: this.generateTimeSeriesData(baseVolume, 0.2),
                    count: this.generateTimeSeriesData(baseVolume / 50, 0.25),
                    successRate: this.generateTimeSeriesData(baseSuccess, 0.1)
                };
            });
            
            return data;
        }

        // Generate failed payment data - Updated for realism
        generateFailedData() {
            const failureTypes = ['Insufficient funds', 'Card declined', 'Expired card', 'Invalid CVV'];
            const data = {};
            
            // Realistic failure type distribution
            const failureRates = {
                'Insufficient funds': 0.45,
                'Card declined': 0.30,
                'Expired card': 0.15,
                'Invalid CVV': 0.10
            };
            
            failureTypes.forEach(type => {
                const baseCount = 50 * failureRates[type];
                const baseAmount = 75 * failureRates[type];
                
                data[type] = {
                    count: this.generateTimeSeriesData(baseCount, 0.3),
                    amount: this.generateTimeSeriesData(baseAmount, 0.25)
                };
            });
            
            return data;
        }

        // Generate optimization impact data with realistic tracking
        generateOptimizationData() {
            const businessMetrics = this.getBusinessMetrics();
            const multipliers = this.getTimeframeMultipliers();
            const activeOptimizations = this.getActiveOptimizations();
            const allOptimizations = Object.values(this.optimizationState);
            
            // Calculate total impact from active optimizations
            let totalVolume = 0;
            let totalPayments = 0;
            let totalSuccessRate = 0;
            
            const featureImpacts = {};
            
            // Business type scaling factors for more realistic impact
            const businessScaling = {
                'small': { volume: 0.3, payments: 0.4, successRate: 1.0 },
                'medium': { volume: 1.0, payments: 1.0, successRate: 1.0 },
                'large': { volume: 2.5, payments: 2.0, successRate: 1.0 }
            };
            
            const scaling = businessScaling[this.businessType] || businessScaling.medium;
            
            // Process ALL optimizations (both active and inactive) for table display
            allOptimizations.forEach(opt => {
                const impact = opt.impact;
                const isActive = opt.status === 'active';
                const enabledDays = opt.enabledDate ? 
                    Math.min(multipliers.days, Math.floor((new Date() - new Date(opt.enabledDate)) / (1000 * 60 * 60 * 24))) : 0;
                
                // Scale impact based on how long the optimization has been active
                // Most optimizations show full impact within 14-30 days
                const timeScale = isActive ? Math.min(1, enabledDays / 21) : 0; // Full impact after 21 days, 0 if inactive
                
                // Apply business scaling but NOT timeframe multipliers for optimization impact
                // Optimization impact should be absolute values, not scaled by timeframe
                const scaledVolume = impact.volume * timeScale * scaling.volume;
                const scaledPayments = impact.payments * timeScale * scaling.payments;
                const scaledSuccessRate = impact.successRate * timeScale * scaling.successRate;
                
                // Only add to totals if optimization is active
                if (isActive) {
                    totalVolume += scaledVolume;
                    totalPayments += scaledPayments;
                    totalSuccessRate += scaledSuccessRate;
                }
                
                featureImpacts[opt.title] = {
                    volume: scaledVolume,
                    payments: scaledPayments,
                    successRate: scaledSuccessRate,
                    enabledDate: opt.enabledDate,
                    status: opt.status
                };
            });
            
            // Add some realistic variation to make the data feel more dynamic
            const variation = 0.1; // 10% variation
            const randomFactor = 1 + (this.rng() - 0.5) * variation;
            
            const result = {
                volume: totalVolume * randomFactor,
                payments: totalPayments * randomFactor,
                successRate: totalSuccessRate,
                features: featureImpacts,
                activeCount: activeOptimizations.length,
                totalCount: Object.keys(this.optimizationState).length
            };
            
            console.log('Generated optimization data:', {
                businessType: this.businessType,
                totalVolume: result.volume,
                totalPayments: result.payments,
                totalSuccessRate: result.successRate,
                featureImpacts: featureImpacts
            });
            
            return result;
        }

        // Generate optimization timeline data
        generateOptimizationTimeline() {
            const activeOptimizations = this.getActiveOptimizations();
            const timeline = [];
            
            activeOptimizations.forEach(opt => {
                if (opt.enabledDate) {
                    timeline.push({
                        id: opt.id,
                        title: opt.title,
                        description: opt.description,
                        impact: opt.impact,
                        enabledDate: opt.enabledDate,
                        status: 'completed',
                        revenue: opt.revenue,
                        category: opt.category,
                        effort: opt.effort
                    });
                }
            });
            
            // Sort by date (newest first)
            timeline.sort((a, b) => new Date(b.enabledDate) - new Date(a.enabledDate));
            
            return timeline;
        }
    }

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RealisticDataGenerator;
} else {
    window.RealisticDataGenerator = RealisticDataGenerator;
    console.log('RealisticDataGenerator class loaded and assigned to window');
    
    // Test if the class is working
    try {
        const testInstance = new RealisticDataGenerator('medium', 'Last 90 days');
        console.log('Test instance created successfully:', testInstance);
        console.log('Test instance methods:', {
            getInactiveOptimizations: typeof testInstance.getInactiveOptimizations,
            generateOptimizationData: typeof testInstance.generateOptimizationData,
            getActiveOptimizations: typeof testInstance.getActiveOptimizations
        });
    } catch (error) {
        console.error('Error creating test instance:', error);
    }
} 