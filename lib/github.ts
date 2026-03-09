export interface GitHubCommit {
  sha: string;
  message: string;
  author: string;
  date: string;
  url: string;
}

export async function getLatestCommit(repo: string): Promise<GitHubCommit | null> {
  if (!repo) return null;
  
  try {
    const token = process.env.GITHUB_TOKEN;
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(
      `https://api.github.com/repos/${repo}/commits?per_page=1`,
      { 
        headers,
        next: { revalidate: 300 } // Cache for 5 minutes
      }
    );

    if (!response.ok) {
      console.error(`GitHub API error for ${repo}:`, response.status);
      return null;
    }

    const commits = await response.json();
    if (!commits || commits.length === 0) return null;

    const latest = commits[0];
    return {
      sha: latest.sha.substring(0, 7),
      message: latest.commit.message.split('\n')[0], // First line only
      author: latest.commit.author.name,
      date: latest.commit.author.date,
      url: latest.html_url,
    };
  } catch (error) {
    console.error(`Error fetching commit for ${repo}:`, error);
    return null;
  }
}

export function formatTimeAgo(dateString: string): string {
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
