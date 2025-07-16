# Deployment Guide

This guide explains how to make your Stripe Payment Analytics Dashboard publicly accessible.

## Option 1: GitHub Pages (Recommended - Free)

### Setup Steps:
1. Go to your GitHub repository: https://github.com/rspencerstripe/rspencer
2. Click on "Settings" tab
3. Scroll down to "Pages" section in the left sidebar
4. Under "Source", select "Deploy from a branch"
5. Choose "gh-pages" branch and "/ (root)" folder
6. Click "Save"

### Result:
- Your site will be available at: `https://rspencerstripe.github.io/rspencer/`
- Automatic deployment on every push to main branch
- Free hosting with SSL certificate

## Option 2: Netlify (Free Tier)

### Setup Steps:
1. Go to [netlify.com](https://netlify.com) and sign up
2. Click "New site from Git"
3. Connect your GitHub account
4. Select your repository: `rspencerstripe/rspencer`
5. Set build command: (leave empty - static site)
6. Set publish directory: `.` (root)
7. Click "Deploy site"

### Result:
- Custom domain support
- Automatic deployments
- Free SSL certificate
- CDN distribution

## Option 3: Vercel (Free Tier)

### Setup Steps:
1. Go to [vercel.com](https://vercel.com) and sign up
2. Click "New Project"
3. Import your GitHub repository
4. Set framework preset to "Other"
5. Set root directory to `.`
6. Click "Deploy"

### Result:
- Global CDN
- Automatic deployments
- Custom domains
- Free SSL certificate

## Option 4: Surge.sh (Free Tier)

### Setup Steps:
1. Install Surge: `npm install -g surge`
2. Navigate to your project directory
3. Run: `surge`
4. Follow the prompts to create account and deploy

### Result:
- Custom subdomain (your-project.surge.sh)
- Free SSL certificate
- Simple deployment

## Option 5: Local Network Sharing

If you want to share with people on your local network:

```bash
# Make the server accessible on your network
python3 -m http.server 8000 --bind 0.0.0.0

# Find your IP address
ifconfig | grep "inet " | grep -v 127.0.0.1
```

Then others can access: `http://YOUR_IP_ADDRESS:8000`

## Current Status

✅ **GitHub Pages workflow configured** - Your site will automatically deploy when you push changes to the main branch.

## Next Steps

1. **Enable GitHub Pages** in your repository settings
2. **Share the URL** with others once deployed
3. **Monitor deployments** in the Actions tab of your GitHub repository

## Troubleshooting

- If GitHub Pages doesn't work, check the Actions tab for deployment errors
- Make sure your repository is public (or you have GitHub Pro for private repos)
- Verify that the gh-pages branch was created after the first deployment 