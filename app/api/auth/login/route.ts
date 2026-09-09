import { SignJWT } from 'jose';

export async function createToken(userId: string) {
  const secret = new TextEncoder().encode(
    process.env.JWT_SECRET || 'your-fallback-secret-key'
  );

  const token = await new SignJWT({ sub: userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(secret);

  return token;
}
