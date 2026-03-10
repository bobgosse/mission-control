export interface Project {
  id: string;
  name: string;
  description: string;
  localPath: string | null;
  githubRepo: string | null;
  railwayUrl?: string;
  railwayProjectId?: string; // Railway project UUID for API
  liveUrl: string;
  stack: string[];
  status: 'active' | 'deployed' | 'development' | 'maintenance';
}

export const projects: Project[] = [
  {
    id: 'shotlogic',
    name: 'ShotLogic',
    description: 'AI-powered screenplay scene analysis with credit system',
    localPath: '~/Desktop/Shot Logic/',
    githubRepo: 'bobgosse/shotlogic',
    railwayUrl: 'shotlogic-production',
    railwayProjectId: '67547ac9-5d2a-456b-959f-4c0e4a8daf53',
    liveUrl: 'https://www.shotlogic.studio',
    stack: ['Vite', 'React', 'TypeScript', 'MongoDB', 'Express', 'Stripe'],
    status: 'deployed',
  },
  {
    id: 'storylogic',
    name: 'StoryLogic',
    description: 'Scene-by-scene screenplay analysis and adaptation tool',
    localPath: '~/Desktop/storylogic/',
    githubRepo: 'bobgosse/StoryLogic',
    railwayUrl: 'storylogic-production',
    railwayProjectId: '1d6be494-af33-48cc-ad0c-0c6b83cb8103',
    liveUrl: 'https://www.storylogic.studio',
    stack: ['Vite', 'React', 'TypeScript', 'MongoDB', 'Express'],
    status: 'deployed',
  },
  {
    id: 'bob-lesson-machine',
    name: 'Bob Lesson Machine',
    description: 'AI lesson plan generator for UNCSA Producing courses',
    localPath: '~/Desktop/bob-lesson-machine/',
    githubRepo: 'bobgosse/bob-lesson-machine',
    railwayUrl: 'bob-lesson-machine-production',
    railwayProjectId: '40700344-9543-4ddc-a28b-f1225eedae81',
    liveUrl: 'https://bob-lesson-machine-production.up.railway.app',
    stack: ['Next.js 15', 'TypeScript', 'Tailwind', 'Claude Sonnet 4'],
    status: 'deployed',
  },
  {
    id: 'story-first-school',
    name: 'Story First School',
    description: 'UNCSA School of Filmmaking curriculum proposal site',
    localPath: '~/Desktop/story-first-school/',
    githubRepo: 'bobgosse/story-first-school',
    railwayUrl: 'story-first-school-production',
    railwayProjectId: 'd8e0959e-f8d3-4531-850d-9aa60a679490',
    liveUrl: 'https://story-first-school-production.up.railway.app',
    stack: ['Vite', 'React', 'TypeScript', 'React Router', 'Framer Motion'],
    status: 'deployed',
  },
  {
    id: 'mission-control',
    name: 'Mission Control',
    description: 'Project dashboard with live GitHub and Railway integration',
    localPath: '~/Desktop/mission-control/',
    githubRepo: 'bobgosse/mission-control',
    railwayUrl: 'mission-control-production',
    railwayProjectId: 'fbe5ea65-68f7-4003-aca6-f620a1323ba5',
    liveUrl: 'https://mission-control-production-production.up.railway.app',
    stack: ['Next.js 16', 'TypeScript', 'Tailwind', 'GitHub API', 'Railway API'],
    status: 'deployed',
  },
  {
    id: 'prof-gosse-site',
    name: 'Professor Gosse Site',
    description: 'Film breakdown and production management tool',
    localPath: '~/Desktop/prof-gosse-site/',
    githubRepo: 'bobgosse/Professor-Gosse-s-Peculiar-Site',
    liveUrl: 'https://prof-gosse-s-peculiar-site.vercel.app',
    stack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Vercel'],
    status: 'deployed',
  },
  {
    id: 'portal',
    name: 'The SoF Portal',
    description: 'UNCSA film production dashboard (Lovable/Supabase)',
    localPath: null,
    githubRepo: null,
    liveUrl: 'https://www.uncsasof-theportal.com',
    stack: ['Vite', 'React', 'Supabase', 'Lovable'],
    status: 'active',
  },
];
