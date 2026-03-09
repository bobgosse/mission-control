import { NextRequest, NextResponse } from 'next/server';
import { projects } from '@/lib/projects';
import { getLatestCommit } from '@/lib/github';
import { getLatestDeployment } from '@/lib/railway';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: projectId } = await params;
  const project = projects.find(p => p.id === projectId);

  if (!project) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  // Fetch GitHub data
  let githubData = null;
  if (project.githubRepo) {
    githubData = await getLatestCommit(project.githubRepo);
  }

  // Fetch Railway data
  let railwayData = null;
  if (project.railwayProjectId) {
    railwayData = await getLatestDeployment(project.railwayProjectId);
  }

  return NextResponse.json({
    project,
    github: githubData,
    railway: railwayData,
  });
}
