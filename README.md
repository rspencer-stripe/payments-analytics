# Stripe Payment Analytics Dashboard

A modern web application for Stripe payment analytics with a beautiful and responsive design. This is a standalone HTML application that can be run directly in any web browser.

## Features

- **Left Navigation Bar**: Collapsible sidebar with navigation items
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Clean, professional interface using Tailwind CSS
- **Interactive Navigation**: Smooth transitions and active states
- **No Build Process**: Runs directly in the browser

## Navigation Structure

The left navigation bar includes the following sections:

- **Overview**: Dashboard with key metrics (Total Revenue, Transactions, Customers, Success Rate)
- **Analytics**: Detailed analytics and charts
- **Transactions**: Transaction management and history (with notification badge)
- **Customers**: Customer data and management
- **Reports**: Report generation and exports
- **Security**: Security settings and monitoring
- **Settings**: Application configuration
- **Help & Support**: Documentation and support

## Getting Started

### Prerequisites

- Any modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd stripe-payment-analytics
```

2. Open the application:
   - Double-click on `index.html` to open in your default browser
   - Or drag and drop `index.html` into your browser window
   - Or use a local server: `python -m http.server 8000` and visit `http://localhost:8000`

## Design Features

- **Collapsible Sidebar**: Click the chevron icon to collapse/expand the navigation
- **Active States**: Current page is highlighted with a blue accent and border
- **Badge Support**: Navigation items can display notification badges (e.g., "12" on Transactions)
- **Smooth Transitions**: All interactions have smooth animations
- **Professional Color Scheme**: Uses a modern blue and gray color palette
- **Responsive Layout**: Adapts to different screen sizes

## Technology Stack

- **HTML5** - Structure
- **CSS3** - Styling with custom CSS and Tailwind CSS (CDN)
- **JavaScript (ES6+)** - Interactivity
- **Tailwind CSS** - Utility-first CSS framework (via CDN)
- **Lucide Icons** - Beautiful, customizable icons (via CDN)
- **Inter Font** - Modern, readable typography

## Project Structure

```
├── index.html          # Main application file
└── README.md           # Project documentation
```

## Key Features

### Sidebar Navigation
- **Collapsible**: Toggle between expanded (256px) and collapsed (64px) states
- **Icon-based**: Each navigation item has a relevant icon
- **Active highlighting**: Current page is clearly indicated
- **Badge notifications**: Shows count of new items (e.g., transactions)

### Overview Dashboard
- **Key Metrics**: Total Revenue, Transactions, Customers, Success Rate
- **Trend Indicators**: Shows percentage change from previous period
- **Responsive Grid**: Adapts to different screen sizes

### Interactive Elements
- **Hover Effects**: Smooth color transitions on navigation items
- **Click Feedback**: Visual feedback when clicking navigation items
- **Smooth Animations**: All state changes are animated

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Customization

The application is built with vanilla HTML, CSS, and JavaScript, making it easy to customize:

- **Colors**: Modify the CSS variables in the `<style>` section
- **Icons**: Replace Lucide icons with any icon library
- **Layout**: Adjust the grid and spacing in the CSS
- **Content**: Add new pages by following the existing pattern

## License

MIT License - see LICENSE file for details 