'use client';

import { Project } from '@/lib/projects';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const statusColors = {
    deployed: 'bg-green-500/20 text-green-400 border-green-500/30',
    active: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    development: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    maintenance: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 hover:border-slate-700 transition-colors">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold mb-1">{project.name}</h2>
          <p className="text-sm text-slate-400">{project.description}</p>
        </div>
        <span className={`text-xs px-2 py-1 rounded border ${statusColors[project.status]}`}>
          {project.status}
        </span>
      </div>

      {/* Stack */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-1">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-2">
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white py-2 rounded transition-colors"
        >
          🌐 Open Live Site
        </a>

        <div className="grid grid-cols-2 gap-2">
          {project.githubRepo && (
            <a
              href={`https://github.com/${project.githubRepo}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center bg-slate-800 hover:bg-slate-700 text-slate-300 py-2 rounded text-sm transition-colors"
            >
              📁 GitHub
            </a>
          )}

          {project.railwayUrl && (
            <a
              href={`https://railway.app/project/${project.railwayUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center bg-slate-800 hover:bg-slate-700 text-slate-300 py-2 rounded text-sm transition-colors"
            >
              🚂 Railway
            </a>
          )}
        </div>

        {project.localPath && (
          <div className="text-xs text-slate-500 mt-2">
            📂 {project.localPath}
          </div>
        )}
      </div>
    </div>
  );
}
