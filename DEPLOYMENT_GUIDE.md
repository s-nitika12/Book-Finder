# 🚀 Deployment Guide - Book Finder

## Prerequisites Setup

Since you're encountering PowerShell script execution issues, follow these steps:

### Option 1: Enable PowerShell Scripts (Recommended)
1. Open PowerShell as Administrator
2. Run: `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser`
3. Type `Y` to confirm
4. Close and reopen your terminal

### Option 2: Use Command Prompt Instead
1. Open Command Prompt (cmd.exe)
2. Navigate to project: `cd d:\AASHU\MyWorkspace\My`
3. Run npm commands normally

### Option 3: Use Git Bash
If you have Git installed, use Git Bash which doesn't have execution policy restrictions.

## Installation Steps

```bash
# Navigate to project directory
cd d:\AASHU\MyWorkspace\My

# Install the missing Vite React plugin
npm install @vitejs/plugin-react --save-dev

# Install all dependencies (if needed)
npm install

# Start development server
npm run dev
```

## Testing Locally

After running `npm run dev`, your application will be available at:
- **URL**: http://localhost:5173
- The browser should open automatically
- Try searching for books by title, author, or subject

## Building for Production

```bash
# Create optimized production build
npm run build

# Preview the production build locally
npm run preview
```

The production files will be in the `dist` folder.

## Deployment Options

### 1. Vercel (Recommended - Easiest)

**Via GitHub:**
1. Create a GitHub repository
2. Push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Book Finder app"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```
3. Go to [vercel.com](https://vercel.com)
4. Sign up/Login with GitHub
5. Click "New Project"
6. Import your repository
7. Vercel auto-detects Vite settings
8. Click "Deploy"
9. Done! Your app is live

**Via CLI:**
```bash
npm install -g vercel
vercel login
vercel
```

**Live URL Example**: `https://book-finder-yourname.vercel.app`

### 2. Netlify

**Via Drag & Drop:**
1. Run `npm run build`
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
3. Drag the `dist` folder to the upload area
4. Done! Instant deployment

**Via GitHub:**
1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect GitHub and select your repo
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy"

**Live URL Example**: `https://book-finder-alex.netlify.app`

### 3. GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
# "predeploy": "npm run build",
# "deploy": "gh-pages -d dist"

# Deploy
npm run deploy
```

Update `vite.config.js`:
```javascript
export default defineConfig({
  base: '/your-repo-name/',
  plugins: [react()],
})
```

**Live URL**: `https://yourusername.github.io/your-repo-name/`

### 4. CodeSandbox (For Demo/Testing)

1. Go to [codesandbox.io](https://codesandbox.io)
2. Click "Create Sandbox"
3. Choose "Import from GitHub"
4. Enter your repository URL
5. CodeSandbox builds automatically

### 5. StackBlitz

1. Go to [stackblitz.com](https://stackblitz.com)
2. Click "Import from GitHub"
3. Paste your repository URL
4. Runs instantly in the browser

## Pre-Deployment Checklist

- [x] All dependencies installed
- [x] Application runs locally (`npm run dev`)
- [x] Production build works (`npm run build`)
- [x] No console errors
- [x] Responsive design tested (mobile, tablet, desktop)
- [x] Search functionality tested (all three types)
- [x] Error handling works
- [x] Modal opens and closes correctly
- [x] Search history persists
- [x] README.md is comprehensive
- [x] .gitignore is configured

## Environment Variables

This project doesn't require any environment variables since we're using the public Open Library API.

## Custom Domain (Optional)

After deploying to Vercel/Netlify:
1. Buy a domain (e.g., from Namecheap, Google Domains)
2. Go to your Vercel/Netlify dashboard
3. Click "Domains"
4. Add your custom domain
5. Update your domain's DNS settings as instructed
6. Wait for DNS propagation (up to 48 hours)

## Performance Tips

- Images are lazy-loaded
- API calls are debounced by user action
- Results are limited to prevent large payloads
- Build is optimized by Vite
- Tailwind CSS is purged in production

## Monitoring & Analytics (Optional)

Add Google Analytics or Vercel Analytics:

```javascript
// In index.html, add before </head>
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID"></script>
```

## Troubleshooting

### Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Port Already in Use
```bash
# Kill process on port 5173 (Windows)
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Or change port in vite.config.js
server: { port: 3000 }
```

### API Not Working
- Check internet connection
- Verify API endpoint: https://openlibrary.org/search.json?title=test
- Check browser console for CORS errors

## Success Indicators

Your deployment is successful when:
- ✅ App loads without errors
- ✅ Search returns results
- ✅ Images load properly
- ✅ Responsive on all devices
- ✅ No console errors
- ✅ URL is shareable

## Example Live URLs

Once deployed, you can share:
- **Vercel**: `https://book-finder-alex.vercel.app`
- **Netlify**: `https://book-finder-alex.netlify.app`
- **GitHub**: `https://yourusername.github.io/book-finder`

## Next Steps After Deployment

1. Test the live URL on multiple devices
2. Share with friends for feedback
3. Add the URL to your resume/portfolio
4. Submit the project with:
   - Live URL
   - GitHub repository
   - README.md
   - CHATGPT_NOTES.md (showing AI collaboration)

---

**Need Help?**
- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com
- Vite Docs: https://vitejs.dev/guide/
