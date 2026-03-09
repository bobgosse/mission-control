# Railway API Setup Guide

To enable live Railway deployment status in Mission Control, you need to:

1. Get a Railway API token
2. Find your Railway project IDs
3. Add them to the configuration

## Step 1: Get Railway API Token

1. Go to https://railway.app/account/tokens
2. Click **Create Token**
3. Name it: `mission-control`
4. Copy the token (starts with `railway_...`)
5. Add to `.env.local`:
   ```
   RAILWAY_TOKEN=railway_xxxxxxxxxxxxx
   ```

## Step 2: Find Railway Project IDs

For each Railway project, you need its UUID (not the friendly name).

### Method 1: From Railway Dashboard URL

1. Open a project in Railway (e.g., ShotLogic)
2. Look at the URL: `https://railway.app/project/ABC123-456-DEF`
3. The UUID is the part after `/project/`: `ABC123-456-DEF`

### Method 2: Using Railway GraphQL API

Run this in your browser console while logged into Railway:

```javascript
fetch('https://backboard.railway.app/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_RAILWAY_TOKEN'
  },
  body: JSON.stringify({
    query: `{
      projects {
        edges {
          node {
            id
            name
          }
        }
      }
    }`
  })
})
.then(r => r.json())
.then(d => console.log(d.data.projects.edges))
```

This will list all your projects with their IDs.

## Step 3: Update lib/projects.ts

Add `railwayProjectId` to each project:

```typescript
{
  id: 'shotlogic',
  name: 'ShotLogic',
  // ... other fields ...
  railwayUrl: 'shotlogic-production',
  railwayProjectId: 'abc123-456-def', // Add this!
  // ...
}
```

### Projects That Need IDs:

- [ ] ShotLogic
- [ ] StoryLogic
- [ ] Bob Lesson Machine
- [ ] Story First School
- [ ] Mission Control (itself!)

*(Professor Gosse Site uses Vercel, The Portal uses Lovable - they don't need Railway IDs)*

## Step 4: Test Locally

```bash
cd ~/Desktop/mission-control
npm run dev
```

Go to localhost:3000 - you should see deployment status badges on Railway projects!

## Step 5: Deploy

```bash
git add -A
git commit -m "feat: add Railway API integration"
git push
```

Then add `RAILWAY_TOKEN` to Railway environment variables (same as you did for `GITHUB_TOKEN`).

## What You'll See

Once configured, each Railway project card will show:

- ✅ **SUCCESS** - Deployed X ago, Build time: 2m 34s
- 🔄 **BUILDING** - Currently building...
- ❌ **FAILED** - Build failed, investigate
- 💥 **CRASHED** - Deployment crashed, needs attention

This gives you instant visibility into which projects are healthy and which need attention!
