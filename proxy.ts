import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

// Next.js 16 renamed middleware.ts to proxy.ts (the course still says
// middleware.ts). It runs before each matching request and uses the
// `authorized` callback in auth.config.ts to protect /dashboard.
export default NextAuth(authConfig).auth;

export const config = {
  // Run on every route except API routes, Next.js internals and .png files.
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
