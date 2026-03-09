export interface RailwayDeployment {
  status: 'SUCCESS' | 'BUILDING' | 'FAILED' | 'CRASHED' | 'REMOVED';
  createdAt: string;
  finishedAt?: string;
  buildDuration?: number;
  url?: string;
}

const RAILWAY_API = 'https://backboard.railway.com/graphql/v2';

export async function getLatestDeployment(projectId: string): Promise<RailwayDeployment | null> {
  if (!projectId) return null;
  
  const token = process.env.RAILWAY_TOKEN;
  if (!token) {
    console.log('RAILWAY_TOKEN not set, skipping Railway API');
    return null;
  }

  try {
    const query = `
      query deployments($projectId: String!) {
        deployments(input: { projectId: $projectId }, first: 1) {
          edges {
            node {
              id
              status
              createdAt
              url
            }
          }
        }
      }
    `;

    const response = await fetch(RAILWAY_API, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { projectId },
      }),
      next: { revalidate: 300 } // Cache for 5 minutes
    });

    if (!response.ok) {
      console.error(`Railway API error: ${response.status}`);
      return null;
    }

    const data = await response.json();

    if (data.errors) {
      console.error('Railway GraphQL errors:', data.errors);
      return null;
    }

    const deployment = data?.data?.deployments?.edges?.[0]?.node;
    if (!deployment) return null;

    return {
      status: deployment.status,
      createdAt: deployment.createdAt,
      url: deployment.url || undefined,
    };
  } catch (error) {
    console.error('Error fetching Railway deployment:', error);
    return null;
  }
}

export function formatBuildDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`;
  }
  return `${seconds}s`;
}

export function getStatusColor(status: string): {
  bg: string;
  text: string;
  border: string;
  emoji: string;
} {
  switch (status) {
    case 'SUCCESS':
      return {
        bg: 'bg-green-500/20',
        text: 'text-green-400',
        border: 'border-green-500/30',
        emoji: '✅',
      };
    case 'BUILDING':
      return {
        bg: 'bg-blue-500/20',
        text: 'text-blue-400',
        border: 'border-blue-500/30',
        emoji: '🔄',
      };
    case 'FAILED':
      return {
        bg: 'bg-red-500/20',
        text: 'text-red-400',
        border: 'border-red-500/30',
        emoji: '❌',
      };
    case 'CRASHED':
      return {
        bg: 'bg-orange-500/20',
        text: 'text-orange-400',
        border: 'border-orange-500/30',
        emoji: '💥',
      };
    default:
      return {
        bg: 'bg-slate-500/20',
        text: 'text-slate-400',
        border: 'border-slate-500/30',
        emoji: '⏸️',
      };
  }
}
