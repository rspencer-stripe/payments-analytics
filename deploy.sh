#!/bin/bash

echo "🚀 Payment Assistant AI - Deploy to GitHub Pages"
echo "================================================"
echo ""

# Check if there are changes to commit
if [[ -z $(git status --porcelain) ]]; then
    echo "✅ No changes to commit"
    echo "🌐 Your site is live at: https://rspencer-stripe.github.io/payments-analytics/"
    exit 0
fi

echo "📝 Changes detected. Committing and pushing to GitHub..."
echo ""

# Add all changes
git add .

# Get commit message from user or use default
if [ -z "$1" ]; then
    COMMIT_MSG="Update Payment Assistant AI dashboard"
else
    COMMIT_MSG="$1"
fi

# Commit changes
git commit -m "$COMMIT_MSG"

# Push to GitHub
echo "🚀 Pushing to GitHub Pages..."
git push

echo ""
echo "✅ Deployment complete!"
echo "🌐 Live site: https://rspencer-stripe.github.io/payments-analytics/"
echo "📊 GitHub Actions will automatically deploy your changes"
echo "" 