# ⚡ Quick Start Guide

## Fix PowerShell Issue First

You're getting a PowerShell execution policy error. Here's the quickest fix:

### Option A: Use Command Prompt (Easiest)
1. Press `Win + R`
2. Type `cmd` and press Enter
3. Navigate: `cd d:\AASHU\MyWorkspace\My`
4. Run: `npm install @vitejs/plugin-react --save-dev`
5. Then: `npm run dev`

### Option B: Fix PowerShell (One-time)
1. Press `Win + X` → "PowerShell (Admin)"
2. Run: `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser`
3. Type `Y` and press Enter
4. Close and reopen terminal
5. Now npm commands will work

## Installation

**After fixing PowerShell:**

```bash
# Install the required plugin
npm install @vitejs/plugin-react --save-dev

# Start the app
npm run dev
```

Your app will open at http://localhost:5173

## Test the App

1. Search by Title: "Harry Potter"
2. Switch to Author: "J.K. Rowling"
3. Switch to Subject: "Science Fiction"
4. Click on any book for details
5. Check your recent searches

## Build for Production

```bash
npm run build
```

Files ready in `dist/` folder.

## Deploy NOW (Fastest)

### Method 1: Netlify Drop (30 seconds)
1. Run `npm run build`
2. Go to https://app.netlify.com/drop
3. Drag the `dist` folder
4. Done! Get your live URL

### Method 2: Vercel (2 minutes)
1. Push to GitHub
2. Go to https://vercel.com
3. Import repository
4. Click Deploy
5. Done!

## What's Included

✅ Multi-type search (title, author, subject)  
✅ Search history  
✅ Book details modal  
✅ Responsive design  
✅ Error handling  
✅ Loading states  
✅ Tailwind CSS styling  
✅ Production ready  

## Files Structure

```
My/
├── index.html              ← Entry point
├── src/
│   ├── main.jsx           ← React entry
│   ├── App.js             ← Main app (enhanced)
│   └── index.css          ← Tailwind styles
├── package.json           ← Dependencies
├── vite.config.js         ← Vite config
└── README.md              ← Full docs
```

## Common Issues

**"npm not recognized"**
- Install Node.js from https://nodejs.org

**"Cannot run scripts"**
- Use Command Prompt (cmd) instead of PowerShell
- Or follow Option B above

**"Port in use"**
- Change port in vite.config.js to 3000

**"No books found"**
- Check internet connection
- Try a different search term

## Next Steps

1. ✅ Get it running locally
2. ✅ Test all features
3. ✅ Build for production
4. ✅ Deploy to Vercel/Netlify
5. ✅ Submit with live URL + GitHub link

**Need more help?** Check:
- DEPLOYMENT_GUIDE.md (detailed deployment)
- README.md (full documentation)
- CHATGPT_NOTES.md (AI collaboration)

---

**You're almost there! Just fix the PowerShell issue and run the commands above.** 🚀
