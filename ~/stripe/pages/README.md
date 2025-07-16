# Stripe Pages Setup for Payment Assistant AI

This directory contains the files for your Payment Assistant AI site on Stripe Pages.

## Current Status
- ✅ Site files copied to `sites/rspencer/public/`
- ✅ Metadata configuration created
- ⏳ Git repository needs to be connected to Stripe internal repo

## Next Steps (when connected to Stripe VPN)

1. **Connect to the internal repository:**
   ```bash
   git remote add origin org-631@git.corp.stripe.com:stripe-internal/pages.git
   git fetch origin
   git checkout -b rspencer-payment-assistant
   ```

2. **Add and commit your files:**
   ```bash
   git add .
   git commit -m "Add Payment Assistant AI site for rspencer"
   ```

3. **Push and create PR:**
   ```bash
   git push origin rspencer-payment-assistant
   ```
   Then create a pull request on the internal repository.

4. **After merge, your site will be available at:**
   `https://pages.stripe.me/rspencer`

## Local Development
To test your site locally (when VPN is connected):
```bash
scripts/dev.sh
```
Then visit: `http://localhost:4242/rspencer`

## Site Structure
- `sites/rspencer/public/` - Contains all the files that will be deployed
- `sites/rspencer/metadata.yaml` - Site configuration
- `index.html` - Main application file
- `src/` - Source components and assets 