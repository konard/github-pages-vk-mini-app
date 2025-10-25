# VK Mini App on GitHub Pages

A proof of concept demonstrating that VK Mini Apps can be built with React.js and hosted on GitHub Pages.

## Overview

This project showcases a fully functional VK Mini App that:
- Uses React.js with TypeScript
- Integrates VK Bridge API for native VK functionality
- Uses VKUI components for native VK design
- Deploys automatically to GitHub Pages via GitHub Actions

## Features

- User authentication via VK Bridge
- Native VK UI components (VKUI)
- TypeScript support
- Automatic deployment to GitHub Pages
- Responsive design following VK design guidelines

## Technology Stack

- **React.js 19** - UI framework
- **TypeScript** - Type safety
- **@vkontakte/vk-bridge** - VK API integration
- **@vkontakte/vkui** - VK UI component library
- **GitHub Pages** - Hosting
- **GitHub Actions** - CI/CD

## Prerequisites

- Node.js 16+ and npm
- VK account
- GitHub account

## Local Development

### 1. Clone the repository

```bash
git clone https://github.com/konard/github-pages-vk-mini-app.git
cd github-pages-vk-mini-app/vk-mini-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start development server

```bash
npm start
```

The app will open at `http://localhost:3000`.

**Note:** VK Bridge methods will only work when the app is accessed through VK (either in production or via VK Tunnel for local development).

### 4. Testing with VK Tunnel (Optional)

For local testing with VK Bridge functionality:

```bash
npm install -g @vkontakte/vk-tunnel
vk-tunnel --insecure=1 --http-protocol=http --ws-protocol=ws --host=localhost --port=3000
```

This will provide a URL that can be used in VK Mini App settings.

## VK Mini App Configuration

### Step 1: Create a VK Mini App

1. Go to [VK Developers](https://dev.vk.com/)
2. Click "Create App" or use existing app
3. Navigate to "Settings" → "Mini Apps"

### Step 2: Configure the App

1. **Title**: Enter your app name
2. **Description**: Add app description
3. **Icon**: Upload app icon (at least 200x200px)
4. **Base URL**: Enter your GitHub Pages URL
   ```
   https://konard.github.io/github-pages-vk-mini-app/
   ```
5. **Trusted URL for redirect**: Add the same URL
   ```
   https://konard.github.io/github-pages-vk-mini-app/
   ```

### Step 3: Set Mobile Frame Settings

1. **Mobile iframe URL**: Your GitHub Pages URL
   ```
   https://konard.github.io/github-pages-vk-mini-app/
   ```

### Step 4: Enable the Mini App

1. Change status to "Application enabled and visible to all users"
2. Save settings

### Step 5: Get Your App ID

Your App ID is shown at the top of the settings page. You'll need this for analytics and advanced features.

## Deployment to GitHub Pages

### Automatic Deployment (Recommended)

This project includes GitHub Actions workflow that automatically deploys to GitHub Pages when you push to the `main` branch.

1. **Enable GitHub Pages:**
   - Go to your repository Settings
   - Navigate to Pages
   - Under "Build and deployment" → "Source", select "GitHub Actions"

2. **Push to main branch:**
   ```bash
   git push origin main
   ```

3. **Access your app:**
   ```
   https://konard.github.io/github-pages-vk-mini-app/
   ```

### Manual Deployment

Alternatively, you can deploy manually:

```bash
cd vk-mini-app
npm run deploy
```

This builds the app and pushes it to the `gh-pages` branch.

## Project Structure

```
github-pages-vk-mini-app/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── vk-mini-app/                # React application
│   ├── public/                 # Static files
│   ├── src/
│   │   ├── App.tsx            # Main app component
│   │   ├── index.tsx          # Entry point with VK Bridge init
│   │   └── ...
│   ├── package.json
│   └── tsconfig.json
├── LICENSE
└── README.md                   # This file
```

## Key Files

### `vk-mini-app/src/index.tsx`

Initializes VK Bridge:

```typescript
import bridge from '@vkontakte/vk-bridge';

// Initialize VK Bridge
bridge.send('VKWebAppInit');
```

### `vk-mini-app/src/App.tsx`

Main application with VKUI components and VK Bridge API usage:

```typescript
import { AppRoot, SplitLayout, View, Panel } from '@vkontakte/vkui';
import bridge from '@vkontakte/vk-bridge';

// Get user info
const user = await bridge.send('VKWebAppGetUserInfo');
```

### `.github/workflows/deploy.yml`

GitHub Actions workflow for automatic deployment.

## VK Bridge API Examples

### Get User Information

```typescript
const user = await bridge.send('VKWebAppGetUserInfo');
console.log(user.first_name, user.last_name);
```

### Open External Link

```typescript
await bridge.send('VKWebAppOpenCodeReader');
```

### Share Content

```typescript
await bridge.send('VKWebAppShare', {
  link: 'https://konard.github.io/github-pages-vk-mini-app/'
});
```

## Troubleshooting

### VK Bridge methods don't work locally

VK Bridge only works when the app is accessed through VK. For local development:
- Use VK Tunnel (see Local Development section)
- Or test directly in VK after deploying to GitHub Pages

### CORS errors

If you encounter CORS issues, ensure:
- Your GitHub Pages URL is added to VK app settings
- The URL format matches exactly (with/without trailing slash)

### App doesn't load in VK

Check:
- GitHub Pages deployment is successful
- App is enabled in VK settings
- URLs in VK settings match your GitHub Pages URL
- All URLs use HTTPS

### Build fails

Ensure you have:
- Node.js 16 or higher
- All dependencies installed (`npm install`)
- No TypeScript errors (`npm run build`)

## Additional Resources

- [VK Bridge Documentation](https://dev.vk.com/bridge/getting-started)
- [VKUI Documentation](https://vkcom.github.io/VKUI/)
- [VK Mini Apps Documentation](https://dev.vk.com/mini-apps/overview)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)

## Testing the App

### In VK Mobile App

1. Open VK mobile app
2. Go to Services/Apps
3. Find your app by name
4. Tap to launch

### In VK Web

1. Go to [vk.com](https://vk.com)
2. Navigate to Apps
3. Search for your app
4. Click to open

## Security Considerations

- Never commit VK access tokens or secrets to the repository
- Use environment variables for sensitive data
- Validate all user input
- Follow VK's security guidelines

## Future Enhancements

Potential improvements for this proof of concept:

- Add routing with @vkontakte/vk-mini-apps-router
- Implement state management (Redux/MobX)
- Add user analytics
- Integrate VK API for social features
- Add unit and integration tests
- Implement progressive web app (PWA) features

## Alternative Hosting Options

While this proof of concept uses GitHub Pages, VK Mini Apps can also be hosted on:

1. **VK Hosting** - Official VK hosting with `@vkontakte/vk-miniapps-deploy`
2. **Vercel** - Automatic deployments from Git
3. **Netlify** - Simple deployment with continuous deployment
4. **Custom server** - Any web server with HTTPS support (e.g., Nginx, Traefik + Bun.sh)

## License

MIT License - see LICENSE file for details

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

- VK Team for excellent documentation and libraries
- React Team for the amazing framework
- GitHub for free hosting via GitHub Pages
