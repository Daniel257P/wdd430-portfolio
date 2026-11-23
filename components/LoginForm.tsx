'use client';

import { useActionState } from 'react';
import { useSearchParams } from 'next/navigation';
import { authenticate } from '@/lib/actions';

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2';
const inputClass = `w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 ${focusRing}`;

export default function LoginForm() {
  // When proxy.ts sends you here from a protected page, it adds
  // ?callbackUrl=... so you go back to that page after logging in.
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);

  return (
    <form action={formAction} className="w-full max-w-sm space-y-4">
      <div>
        <label htmlFor="email" className="block font-medium">Email</label>
        <input id="email" name="email" type="email" required autoComplete="email"
          className={inputClass} />
      </div>

      <div>
        <label htmlFor="password" className="block font-medium">Password</label>
        <input id="password" name="password" type="password" required minLength={6}
          autoComplete="current-password" className={inputClass} />
      </div>

      {/* signIn() reads this field to know where to go after a successful login. */}
      <input type="hidden" name="redirectTo" value={callbackUrl} />

      <button type="submit" disabled={isPending}
        className={`w-full rounded-md bg-slate-900 px-4 py-2 text-white hover:bg-slate-700 disabled:opacity-50 ${focusRing}`}>
        {isPending ? 'Signing in...' : 'Sign In'}
      </button>

      {/* Always rendered so screen readers announce the error when it appears. */}
      <div aria-live="polite" aria-atomic="true">
        {errorMessage && <p className="text-red-600">{errorMessage}</p>}
      </div>
    </form>
  );
}
