const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const HASH_LENGTH = 8;

export function generatePublicRef(): string {
  const randomValues = new Uint8Array(HASH_LENGTH);
  crypto.getRandomValues(randomValues);

  let result = '';
  for (let i = 0; i < HASH_LENGTH; i++) {
    result += CHARS.charAt(randomValues[i] % CHARS.length);
  }

  return result;
}
