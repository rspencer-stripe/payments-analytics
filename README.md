# Payment Assistant AI

An AI-powered payment analytics and optimization dashboard built with modern web technologies. This project provides intelligent insights and tools for payment processing optimization.

## Features

- **AI-Powered Analytics**: Intelligent payment processing insights
- **Real-time Dashboard**: Live payment metrics and performance indicators
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean, professional interface using Tailwind CSS
- **Interactive Navigation**: Smooth transitions and active states
- **No Build Process**: Runs directly in the browser

## Navigation Structure

The application includes the following sections:

- **Overview**: Dashboard with key metrics (Total Revenue, Transactions, Customers, Success Rate)
- **Analytics**: Detailed analytics and AI-powered insights
- **Transactions**: Transaction management and history (with notification badge)
- **Customers**: Customer data and management
- **Reports**: Report generation and exports
- **Security**: Security settings and monitoring
- **Settings**: Application configuration
- **Help & Support**: Documentation and support

## Live Demo

🌐 **Access the live application**: [https://stripe-demos.github.io/rspencer-assistant/](https://stripe-demos.github.io/rspencer-assistant/)

## Getting Started

### Prerequisites

- Any modern web browser (Chrome, Firefox, Safari, Edge)

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/stripe-demos/rspencer-assistant.git
cd rspencer-assistant
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
├── index.html              # Main application file
├── server.py               # Local development server
├── .github/workflows/      # GitHub Actions deployment
├── sites/rspencer/         # Site-specific configuration
└── README.md               # Project documentation
```

## Deployment

This project is automatically deployed to GitHub Pages using GitHub Actions. The deployment workflow:

1. Triggers on pushes to `main` or `master` branch
2. Builds and deploys to the `gh-pages` branch
3. Makes the site available at `https://stripe-demos.github.io/rspencer-assistant/`

### Manual Deployment

If you need to deploy manually:

1. Enable GitHub Pages in your repository settings
2. Set the source to "GitHub Actions"
3. Push changes to trigger automatic deployment

## Key Features

### AI-Powered Analytics
- Intelligent payment processing insights
- Predictive analytics for payment optimization
- Automated recommendations

### Interactive Dashboard
- **Key Metrics**: Total Revenue, Transactions, Customers, Success Rate
- **Trend Indicators**: Shows percentage change from previous period
- **Responsive Grid**: Adapts to different screen sizes

### Sidebar Navigation
- **Collapsible**: Toggle between expanded (256px) and collapsed (64px) states
- **Icon-based**: Each navigation item has a relevant icon
- **Active highlighting**: Current page is clearly indicated
- **Badge notifications**: Shows count of new items (e.g., transactions)

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support and questions, please open an issue in the GitHub repository.
