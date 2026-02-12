let cachedIp: string | null = null;
let ipFetchPromise: Promise<string> | null = null;

export async function getClientIp(): Promise<string> {
  if (cachedIp) return cachedIp;
  if (ipFetchPromise) return ipFetchPromise;

  ipFetchPromise = fetch('https://api.ipify.org?format=json')
    .then(res => res.json())
    .then(data => {
      cachedIp = data.ip;
      return data.ip;
    })
    .catch(() => {
      // Fallback to session-based ID if IP fetch fails
      const sessionId = sessionStorage.getItem('session_id') || generateSessionId();
      if (!sessionStorage.getItem('session_id')) {
        sessionStorage.setItem('session_id', sessionId);
      }
      return `session:${sessionId}`;
    });

  return ipFetchPromise;
}

function generateSessionId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function clearIpCache(): void {
  cachedIp = null;
  ipFetchPromise = null;
}
