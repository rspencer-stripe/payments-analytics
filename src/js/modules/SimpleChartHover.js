// Simple Chart Hover System - Minimal and robust
class SimpleChartHover {
    constructor() {
        this.tooltip = null;
        this.isActive = false;
        this.init();
    }

    init() {
        console.log('Initializing Simple Chart Hover...');
        this.createTooltip();
        this.addHoverAreas();
        this.addAIInsightIndicator();
        this.isActive = true;
        console.log('Simple Chart Hover initialized');
    }

    createTooltip() {
        // Don't create tooltip - using existing system
        console.log('Using existing tooltip system');
    }

    addHoverAreas() {
        // Don't create hover areas - let the existing system handle them
        // The existing system already creates 'data-point' elements that work with the hover system
        console.log('Using existing hover system - not creating additional hover areas');
    }

    addAIInsightIndicator() {
        // Don't create AI insight indicator - let the existing system handle it
        // The global addAIInsightIndicator function in index.html already creates it
        console.log('Using existing AI insight indicator system');
    }

    addIndicatorListeners(svg) {
        // AI Insight Indicator
        const aiIndicator = svg.querySelector('.ai-insight-indicator');
        if (aiIndicator) {
            aiIndicator.addEventListener('mouseenter', (e) => this.showAIInsightTooltip(e));
            aiIndicator.addEventListener('mouseleave', () => this.hideTooltip());
        }

        // Acceptance Alert Indicator
        const alertIndicator = svg.querySelector('.acceptance-alert-indicator');
        if (alertIndicator) {
            alertIndicator.addEventListener('mouseenter', (e) => this.showAlertTooltip(e));
            alertIndicator.addEventListener('mouseleave', () => this.hideTooltip());
        }
    }

    showTooltip(event, index, date) {
        // Don't show tooltip - using existing system
        console.log('Using existing tooltip system');
    }

    extractYValues(pathData) {
        try {
            // Parse SVG path to extract Y coordinates
            const matches = pathData.match(/[ML]\d+,\d+/g);
            if (matches) {
                return matches.map(match => {
                    const coords = match.substring(1).split(',');
                    return parseInt(coords[1]);
                });
            }
        } catch (error) {
            console.error('Error parsing path data:', error);
        }
        return null;
    }

    positionTooltip(mouseX, mouseY) {
        if (!this.tooltip) return;

        const tooltipRect = this.tooltip.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        let x = mouseX + 15;
        let y = mouseY - 10;

        // Adjust if tooltip goes off-screen
        if (x + tooltipRect.width > viewportWidth - 10) {
            x = mouseX - tooltipRect.width - 15;
        }
        if (y < 10) {
            y = mouseY + 15;
        }
        if (y + tooltipRect.height > viewportHeight - 10) {
            y = viewportHeight - tooltipRect.height - 10;
        }

        this.tooltip.style.left = x + 'px';
        this.tooltip.style.top = y + 'px';
        this.tooltip.style.position = 'fixed';
        this.tooltip.style.zIndex = '10000';
    }

    showAIInsightTooltip(event) {
        if (!this.tooltip) return;

        this.tooltip.innerHTML = `
            <div style="font-weight: 600; margin-bottom: 8px; color: #1A1F2E;">AI Insight</div>
            
            <!-- Specific Metrics from Key -->
            <div style="margin-bottom: 12px;">
                <div style="font-weight: 500; font-size: 11px; color: #1A1F2E; margin-bottom: 4px;">Jun 1 Metrics:</div>
                <div style="display: flex; justify-content: space-between; font-size: 10px; color: #6C7689; margin-bottom: 2px;">
                    <span>Current performance:</span>
                    <span style="font-weight: 600; color: #533AFD;">85.2%</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 10px; color: #6C7689; margin-bottom: 2px;">
                    <span>Baseline performance:</span>
                    <span style="font-weight: 600; color: #E4E7EC;">82.1%</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 10px; color: #6C7689; margin-bottom: 2px;">
                    <span>Industry benchmark:</span>
                    <span style="font-weight: 600; color: #22C55E;">93.8%</span>
                </div>
            </div>
            
            <!-- AI Insights -->
            <div style="color: #6C7689; font-size: 11px; margin-bottom: 12px; line-height: 1.4;">
                <strong style="color: #1A1F2E;">Performance Spike Detected</strong><br>
                Your payment success rate increased by 15% on Jun 1, likely due to recent fraud detection improvements. This represents a significant improvement over your baseline performance.
            </div>
            
            <!-- Action Buttons -->
            <div style="border-top: 1px solid #E4E7EC; padding-top: 8px; display: flex; gap: 6px;">
                <button onclick="window.simpleChartHover.showWhatsChanged()" style="
                    background: #533AFD;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    padding: 4px 8px;
                    font-size: 10px;
                    cursor: pointer;
                    pointer-events: auto;
                    flex: 1;
                ">What's changed?</button>
                <button onclick="window.simpleChartHover.askAssistant()" style="
                    background: #F3F4F6;
                    color: #374151;
                    border: 1px solid #D1D5DB;
                    border-radius: 4px;
                    padding: 4px 8px;
                    font-size: 10px;
                    cursor: pointer;
                    pointer-events: auto;
                    flex: 1;
                ">Ask assistant</button>
            </div>
        `;
        
        this.positionTooltip(event.clientX, event.clientY);
        this.tooltip.style.display = 'block';
        this.tooltip.style.opacity = '1';
        this.tooltip.style.transform = 'translateY(0)';
    }

    showAlertTooltip(event) {
        if (!this.tooltip) return;

        this.tooltip.innerHTML = `
            <div style="font-weight: 600; margin-bottom: 8px; color: #1A1F2E;">⚠️ Alert</div>
            <div style="color: #6C7689; font-size: 11px; margin-bottom: 8px;">
                <strong>Acceptance Rate Drop</strong><br>
                Payment acceptance rate dropped by 12% on Jun 29. This may indicate increased fraud attempts or system issues.
            </div>
            <div style="border-top: 1px solid #E4E7EC; padding-top: 8px;">
                <button onclick="window.simpleChartHover.showAlertDetails()" style="
                    background: #EF4444;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    padding: 4px 8px;
                    font-size: 11px;
                    cursor: pointer;
                    pointer-events: auto;
                ">Investigate</button>
            </div>
        `;
        
        this.positionTooltip(event.clientX, event.clientY);
        this.tooltip.style.display = 'block';
        this.tooltip.style.opacity = '1';
        this.tooltip.style.transform = 'translateY(0)';
    }

    showAIInsightDetails() {
        console.log('Showing AI insight details...');
        alert('AI Insight Details: This would open a detailed analysis panel showing the performance spike analysis, contributing factors, and recommendations.');
    }

    showWhatsChanged() {
        console.log('What\'s changed button clicked...');
        alert('What\'s Changed Analysis: This would show a detailed comparison of what changed between the previous period and Jun 1, including specific metrics, trends, and contributing factors.');
    }

    askAssistant() {
        console.log('Ask assistant button clicked...');
        alert('Ask Assistant: This would open a chat interface where you can ask questions about the Jun 1 performance spike, get recommendations, or request further analysis.');
    }

    showAlertDetails() {
        console.log('Showing alert details...');
        alert('Alert Details: This would open an investigation panel showing the acceptance rate drop analysis, potential causes, and mitigation steps.');
    }

    hideTooltip() {
        // Don't hide tooltip - using existing system
        console.log('Using existing tooltip system');
    }

    destroy() {
        if (this.tooltip) {
            this.tooltip.remove();
        }
        this.isActive = false;
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SimpleChartHover;
} else {
    window.SimpleChartHover = SimpleChartHover;
} 