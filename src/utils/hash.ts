const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateRandom(length: number): string {
  const randomValues = new Uint8Array(length);
  crypto.getRandomValues(randomValues);

  let result = '';
  for (let i = 0; i < length; i++) {
    result += CHARS.charAt(randomValues[i] % CHARS.length);
  }

  return result;
}

export function generatePublicRef(): string {
  return generateRandom(8);
}

export function generateViewToken(): string {
  return generateRandom(12);
}
