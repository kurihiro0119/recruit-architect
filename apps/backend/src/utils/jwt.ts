// Simple JWT implementation using Web Crypto API for Cloudflare Workers
// Note: This is a simplified implementation. For production, consider using a more robust JWT library.

const JWT_SECRET = 'admin-secret-key-change-in-production'; // Should be in environment variable

interface AdminJWTPayload {
  adminId: string;
  email: string;
  exp: number;
}

interface UserJWTPayload {
  userId: string;
  email: string;
  organizationId: string;
  exp: number;
}

type JWTPayload = AdminJWTPayload | UserJWTPayload;

export async function signJWT(
  payload: Omit<AdminJWTPayload, 'exp'> | Omit<UserJWTPayload, 'exp'>
): Promise<string> {
  const expiresIn = 24 * 60 * 60; // 24 hours
  const exp = Math.floor(Date.now() / 1000) + expiresIn;
  
  const jwtPayload: AdminJWTPayload | UserJWTPayload = {
    ...payload,
    exp,
  } as AdminJWTPayload | UserJWTPayload;

  const header = {
    alg: 'HS256',
    typ: 'JWT',
  };

  const base64UrlEncode = (str: string): string => {
    return btoa(str)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  };

  const headerEncoded = base64UrlEncode(JSON.stringify(header));
  const payloadEncoded = base64UrlEncode(JSON.stringify(jwtPayload));

  const data = `${headerEncoded}.${payloadEncoded}`;
  
  // Sign with HMAC-SHA256
  const encoder = new TextEncoder();
  const keyData = encoder.encode(JWT_SECRET);
  const messageData = encoder.encode(data);
  
  const key = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign('HMAC', key, messageData);
  const signatureArray = Array.from(new Uint8Array(signature));
  const signatureBase64 = btoa(String.fromCharCode(...signatureArray))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');

  return `${data}.${signatureBase64}`;
}

export async function verifyJWT(token: string): Promise<AdminJWTPayload | UserJWTPayload | null> {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }

    const [headerEncoded, payloadEncoded, signature] = parts;

    // Verify signature
    const data = `${headerEncoded}.${payloadEncoded}`;
    const encoder = new TextEncoder();
    const keyData = encoder.encode(JWT_SECRET);
    const messageData = encoder.encode(data);

    const key = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    const signatureBytes = Uint8Array.from(
      atob(signature.replace(/-/g, '+').replace(/_/g, '/')),
      (c) => c.charCodeAt(0)
    );

    const isValid = await crypto.subtle.verify('HMAC', key, signatureBytes, messageData);
    if (!isValid) {
      return null;
    }

    // Decode payload
    const base64UrlDecode = (str: string): string => {
      const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
      const padding = base64.length % 4;
      const paddedBase64 = base64 + '='.repeat(padding ? 4 - padding : 0);
      return atob(paddedBase64);
    };

    const payloadJson = base64UrlDecode(payloadEncoded);
    const payload: AdminJWTPayload | UserJWTPayload = JSON.parse(payloadJson);

    // Check expiration
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return payload;
  } catch (error) {
    return null;
  }
}

