export interface Project {
  id: string;
  name: string;
  description: string;
  localPath: string;
  githubRepo: string;
  railwayUrl?: string;
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
    githubRepo: 'bobgosse/Shot-Logic',
    railwayUrl: 'shotlogic-production',
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
    liveUrl: 'https://story-first-school-production.up.railway.app',
    stack: ['Vite', 'React', 'TypeScript', 'React Router', 'Framer Motion'],
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
