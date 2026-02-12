let cachedClientKey: string | null = null;

const CLIENT_ID_KEY = 'client_id';

export async function getClientIp(): Promise<string> {
  if (cachedClientKey) return cachedClientKey;

  let clientId = localStorage.getItem(CLIENT_ID_KEY);
  if (!clientId) {
    clientId = generateSessionId();
    localStorage.setItem(CLIENT_ID_KEY, clientId);
  }

  cachedClientKey = `client:${clientId}`;
  return cachedClientKey;
}

function generateSessionId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function clearIpCache(): void {
  cachedClientKey = null;
}
