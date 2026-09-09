import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Define public routes that do NOT require authentication
const PUBLIC_ROUTES = ['/login', '/register', '/api/auth/login'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Allow public routes to bypass authentication
  if (PUBLIC_ROUTES.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // 2. Extract JWT token from cookies or Authorization header
  const token =
    request.cookies.get('token')?.value ||
    request.headers.get('authorization')?.replace('Bearer ', '');

  // 3. Redirect to login if no token is present
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    // 4. Verify token using 'jose' (Edge-compatible)
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || 'your-fallback-secret-key'
    );

    const { payload } = await jwtVerify(token, secret);

    // 5. Pass user details down to downstream requests via custom headers
    const response = NextResponse.next();
    response.headers.set('x-user-id', payload.sub as string);

    return response;
  } catch (error) {
    console.error('JWT verification failed in middleware:', error);

    // Redirect to login on invalid or expired token
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }
}

// Specify which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, SVGs, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
