// Password hashing utility using Web Crypto API
// Note: For production, consider using bcrypt or argon2 if available in Cloudflare Workers

export async function hashPassword(password: string): Promise<string> {
  // Generate a random salt
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const saltHex = Array.from(salt)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  // Hash password with salt
  const encoder = new TextEncoder();
  const data = encoder.encode(password + saltHex);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');

  // Return salt:hash format
  return `${saltHex}:${hashHex}`;
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const [saltHex, storedHash] = hash.split(':');
  if (!saltHex || !storedHash) {
    return false;
  }

  // Hash the provided password with the stored salt
  const encoder = new TextEncoder();
  const data = encoder.encode(password + saltHex);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');

  // Compare hashes
  return hashHex === storedHash;
}

