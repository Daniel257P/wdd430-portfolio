import type { NextAuthConfig } from 'next-auth';

// Settings shared by proxy.ts and auth.ts.
// Keep this file free of database/bcrypt imports: proxy.ts loads it on
// every request, so it must stay small.
export const authConfig = {
  pages: {
    signIn: '/login', // where logged-out users are sent
  },
  callbacks: {
    // Runs in proxy.ts before a page loads. Return true to allow the request,
    // false to send the user to the sign-in page, or a Response to redirect.
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

      if (isOnDashboard) {
        return isLoggedIn; // logged out -> redirected to /login
      }

      // Already logged in? Skip the login page and go to the dashboard.
      if (isLoggedIn && nextUrl.pathname === '/login') {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }

      return true; // every other page is public
    },
  },
  providers: [], // added in auth.ts
} satisfies NextAuthConfig;
