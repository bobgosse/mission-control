'use client';

import { Project } from '@/lib/projects';
import { useEffect, useState } from 'react';
import { getStatusColor, formatBuildDuration } from '@/lib/railway';

interface ProjectCardProps {
  project: Project;
}

interface ProjectData {
  github: {
    sha: string;
    message: string;
    author: string;
    date: string;
    url: string;
  } | null;
  railway: {
    status: string;
    createdAt: string;
    finishedAt?: string;
    buildDuration?: number;
    url?: string;
  } | null;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [data, setData] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/project/${project.id}`);
        if (response.ok) {
          const result = await response.json();
          setData(result);
        }
      } catch (error) {
        console.error('Error fetching project data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [project.id]);

  const statusColors = {
    deployed: 'bg-green-500/20 text-green-400 border-green-500/30',
    active: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    development: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    maintenance: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  };

  function formatTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInUnit);
      if (interval >= 1) {
        return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
      }
    }

    return 'just now';
  }

  const railwayStatusColor = data?.railway ? getStatusColor(data.railway.status) : null;

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

      {/* Railway Deployment Status */}
      {!loading && data?.railway && railwayStatusColor && (
        <div className={`mb-4 p-3 rounded border ${railwayStatusColor.bg} ${railwayStatusColor.border}`}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">{railwayStatusColor.emoji}</span>
            <span className={`text-sm font-medium ${railwayStatusColor.text}`}>
              {data.railway.status}
            </span>
          </div>
          <div className="text-xs text-slate-400 space-y-1">
            <div>Deployed {formatTimeAgo(data.railway.createdAt)}</div>
            {data.railway.buildDuration && (
              <div>Build time: {formatBuildDuration(data.railway.buildDuration)}</div>
            )}
          </div>
        </div>
      )}

      {/* GitHub Commit Info */}
      {!loading && data?.github && (
        <div className="mb-4 p-3 bg-slate-800/50 rounded border border-slate-700">
          <div className="flex items-start gap-2">
            <span className="text-slate-400 text-xs">📝</span>
            <div className="flex-1 min-w-0">
              <a
                href={data.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-300 hover:text-white line-clamp-1 block"
              >
                {data.github.message}
              </a>
              <p className="text-xs text-slate-500 mt-1">
                {formatTimeAgo(data.github.date)} · {data.github.sha}
              </p>
            </div>
          </div>
        </div>
      )}

      {loading && (project.githubRepo || project.railwayProjectId) && (
        <div className="mb-4 space-y-3">
          {project.railwayProjectId && (
            <div className="p-3 bg-slate-800/50 rounded border border-slate-700 animate-pulse">
              <div className="h-4 bg-slate-700 rounded w-2/3 mb-2"></div>
              <div className="h-3 bg-slate-700 rounded w-1/2"></div>
            </div>
          )}
          {project.githubRepo && (
            <div className="p-3 bg-slate-800/50 rounded border border-slate-700 animate-pulse">
              <div className="h-4 bg-slate-700 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-slate-700 rounded w-1/2"></div>
            </div>
          )}
        </div>
      )}

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
