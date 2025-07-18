#!/bin/bash

echo "🚀 Payment Assistant AI - Development Server"
echo "============================================="
echo ""
echo "Starting local development server..."
echo ""

# Kill any existing server on port 8000
lsof -ti:8000 | xargs kill -9 2>/dev/null || true

# Start the development server
echo "✅ Server starting at http://localhost:8000"
echo "📝 Edit files in this directory to see live changes"
echo "🔄 Refresh your browser to see updates"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

python3 server.py 