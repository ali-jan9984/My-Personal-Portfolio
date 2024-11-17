import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Middleware function
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  // Redirect unauthenticated users trying to access protected routes
  if (!token) {
    if (
      url.pathname.startsWith("/dashboard") ||
      url.pathname.startsWith("/verify") ||
      url.pathname.startsWith("/contact")
    ) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
  }

  // Redirect authenticated users away from auth-related routes
  if (
    token &&
    (
      url.pathname.startsWith("/sign-in") ||
      url.pathname.startsWith("/sign-up") ||
      url.pathname.startsWith("/verify")
    )
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next(); // Allow other routes to proceed
}

// Config to specify the routes middleware should match
export const config = {
  matcher: [
    '/sign-in',
    '/sign-up',
    '/contact',
    '/dashboard/:path*',
    '/verify/:path*',
  ],
};
