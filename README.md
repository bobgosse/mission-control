# Mission Control 🚀

**Bob Gosse's Project Dashboard**

A centralized dashboard to monitor and manage all your film and AI projects.

## Features

✅ **Project Cards** - Visual overview of all projects  
✅ **Live Status** - Deployment status indicators  
✅ **Quick Actions** - One-click access to live sites, GitHub, Railway  
✅ **Stack Overview** - See tech stack at a glance  
✅ **Local Paths** - Quick reference to project locations  

## Projects Tracked

1. **ShotLogic** - AI screenplay scene analysis (www.shotlogic.studio)
2. **StoryLogic** - Scene-by-scene screenplay tool (www.storylogic.studio)
3. **Bob Lesson Machine** - UNCSA lesson plan generator
4. **Story First School** - Curriculum proposal site
5. **Professor Gosse Site** - Film breakdown tool
6. **The SoF Portal** - UNCSA production dashboard

## Setup

**First time setup:**

```bash
# Fix npm cache permissions (if needed)
sudo chown -R $(id -u):$(id -g) "$HOME/.npm"

# Install dependencies
npm install

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Build for Production

```bash
npm run build
npm run start
```

## Deploy to Railway

1. Push to GitHub
2. Connect repo to Railway
3. Railway will auto-detect Next.js and deploy

## Tech Stack

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Dark Theme** - Matches your other apps

## Future Enhancements

- [ ] Railway API integration (live deployment status)
- [ ] GitHub API integration (recent commits, activity)
- [ ] Project health indicators
- [ ] Search/filter functionality
- [ ] Quick dev commands (open in VS Code, run locally)
- [ ] Recent deployment history
- [ ] Traffic/analytics overview
