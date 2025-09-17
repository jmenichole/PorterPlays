# Porter Plays | Leaderboards & Community Hub

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

The official hub for Porter Plays leaderboards - track your performance, compete for exclusive prize pools, and secure your place at the top.

🔗 **Live Site**: [https://jmenichole.github.io/PorterPlays/](https://jmenichole.github.io/PorterPlays/)

🔗 **Standalone Landing (static HTML)**: [https://jmenichole.github.io/PorterPlays/porter-plays-landing.html](https://jmenichole.github.io/PorterPlays/porter-plays-landing.html)

## Features

- **Leaderboard Tracking**: Monitor your performance across multiple gaming platforms
- **Community Hub**: Connect with fellow gamers and competitors
- **Prize Pools**: Compete for exclusive rewards and bonuses
- **Platform Integration**: Works with Thrill, Goated, and Shuffle gaming platforms
- **Responsive Design**: Optimized for desktop and mobile experiences

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set the `GEMINI_API_KEY` in [.env](.env) to your Gemini API key (optional)

3. Run the development server:
   ```bash
   npm run dev
   ```

## Deployment

This site is automatically deployed to GitHub Pages when changes are pushed to the main branch. The deployment workflow:

1. Builds the application using Vite
2. Configures assets for GitHub Pages hosting
3. Deploys to the `gh-pages` branch
4. Makes the site available at https://jmenichole.github.io/PorterPlays/

### Manual Deployment

To build locally:
```bash
npm run build
```

The built files will be in the `dist/` directory.

## Architecture

- **Frontend**: React 19 with TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Hosting**: GitHub Pages with automated CI/CD
- **Routing**: Client-side routing with GitHub Pages compatibility

View the original AI Studio app: https://ai.studio/apps/drive/1vXf8DaLb62D5wc4nwMNO89iezj5ShHOB
