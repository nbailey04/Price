// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const isLoggedIn = req.cookies.get('loggedIn')?.value;

  if (!isLoggedIn && req.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

// Apply middleware to root only
export const config = {
  matcher: ['/'],
};
