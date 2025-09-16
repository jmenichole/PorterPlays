<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally and deploy to GitHub Pages.

View your app in AI Studio: https://ai.studio/apps/drive/1vXf8DaLb62D5wc4nwMNO89iezj5ShHOB

## Live Deployment

The app is automatically deployed to GitHub Pages at: https://jmenichole.github.io/PorterPlays/

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deployment

The app is automatically deployed to GitHub Pages when changes are pushed to the main branch using GitHub Actions. The deployment workflow:

1. Builds the app for production
2. Deploys to GitHub Pages
3. The app becomes available at the GitHub Pages URL

### Manual Deployment

To deploy manually:
1. Build the app: `npm run build`
2. The build artifacts will be in the `dist/` folder
3. The GitHub Actions workflow will handle the rest
