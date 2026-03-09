# Mission Control 🚀

**Bob Gosse's Project Dashboard**

A centralized dashboard to monitor and manage all your film and AI projects with **live GitHub and Railway integration**.

## Features

✅ **Project Cards** - Visual overview of all projects  
✅ **Live GitHub Data** - Latest commits, authors, timestamps  
✅ **Railway Deployment Status** - Real-time build status, deploy times, build duration  
✅ **Quick Actions** - One-click access to live sites, GitHub, Railway  
✅ **Stack Overview** - See tech stack at a glance  
✅ **Auto-refresh** - Data updates every 5 minutes  

## Projects Tracked

1. **ShotLogic** - AI screenplay scene analysis (www.shotlogic.studio)
2. **StoryLogic** - Scene-by-scene screenplay tool (www.storylogic.studio)
3. **Bob Lesson Machine** - UNCSA lesson plan generator
4. **Story First School** - Curriculum proposal site
5. **Professor Gosse Site** - Film breakdown tool
6. **The SoF Portal** - UNCSA production dashboard

## Setup

### 1. Install Dependencies

```bash
# Fix npm cache permissions (if needed)
sudo chown -R $(id -u):$(id -g) "$HOME/.npm"

# Install
npm install
```

### 2. Configure API Tokens

**GitHub Token (Required for live commit data):**

1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Name: `mission-control`
4. Scopes: Select `repo` (read-only access)
5. Generate token and copy it

**Add to `.env.local`:**
```bash
GITHUB_TOKEN=your_github_token_here
```

**Railway Token (Phase 2):**

See [RAILWAY-SETUP.md](./RAILWAY-SETUP.md) for detailed instructions on:
- Getting your Railway API token
- Finding Railway project UUIDs
- Adding them to the configuration

Quick version:
1. Get token at https://railway.app/account/tokens
2. Add to `.env.local`: `RAILWAY_TOKEN=railway_xxxxx`
3. Add project IDs to `lib/projects.ts`

### 3. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Deploy to Railway

### Environment Variables

In Railway project settings, add:

```
GITHUB_TOKEN=your_github_token_here
```

### Deploy

```bash
git add .
git commit -m "your message"
git push
```

Railway will auto-deploy.

## Build for Production

```bash
npm run build
npm run start
```

## Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **GitHub API** - Live commit data
- **Railway API** - Deployment status (coming soon)

## API Integration

### GitHub API
- Fetches latest commit for each repo
- Shows commit message, author, timestamp
- Caches for 5 minutes (revalidates automatically)
- Falls back gracefully if token missing or rate limited

### Railway API (Coming Soon)
- Live deployment status
- Build duration
- Last deploy time
- Health checks

## How It Works

1. **Server-Side Data Fetching** - API routes fetch from GitHub/Railway
2. **Client-Side Display** - React components render with loading states
3. **Automatic Caching** - Next.js caches API responses (5 min)
4. **Error Handling** - Graceful fallbacks if APIs fail

## Future Enhancements

- [x] GitHub API integration (latest commits)
- [x] Railway API integration (deployment status)
- [ ] Manual refresh button
- [ ] Search/filter functionality
- [ ] Quick dev commands (open in VS Code, run locally)
- [ ] Deployment history timeline
- [ ] Traffic/analytics overview
- [ ] Uptime monitoring
- [ ] Vercel deployment status (for Professor Gosse Site)

## Troubleshooting

**"No commit data showing"**
- Check that `GITHUB_TOKEN` is set in `.env.local`
- Verify token has `repo` scope
- Check browser console for API errors

**"Build failing on Railway"**
- Ensure `GITHUB_TOKEN` is set in Railway environment variables
- Check Railway build logs for specific errors

**"Rate limited by GitHub"**
- GitHub allows 60 requests/hour without token
- 5,000 requests/hour with token
- Dashboard caches for 5 minutes to minimize requests
