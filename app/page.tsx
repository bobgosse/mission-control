import { projects } from '@/lib/projects';
import ProjectCard from '@/components/ProjectCard';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="container mx-auto px-4 py-12">
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Mission Control 🚀</h1>
          <p className="text-slate-400">Bob Gosse&apos;s Project Dashboard</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
