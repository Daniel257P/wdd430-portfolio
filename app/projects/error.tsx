'use client'; // Error boundaries must be Client Components

import { useEffect } from 'react';
import Link from 'next/link';

// Shown when anything under /projects throws an error that isn't handled
// (a failed database query, a Server Action that throws, etc.).
export default function ProjectsError({
  error,
  retry,
}: {
  error: unknown; // may not be an Error, so check before reading .message
  retry: () => void; // re-fetches and re-renders this segment
}) {
  useEffect(() => {
    // Log the error so it shows in the browser console.
    console.error(error);
  }, [error]);

  const message =
    error instanceof Error ? error.message : 'An unexpected error occurred.';

  return (
    <section className="my-12 flex flex-col items-center gap-4 text-center">
      <h2 className="text-2xl font-bold">Something went wrong!</h2>
      <p className="text-slate-600">{message}</p>
      <div className="flex gap-4">
        <button
          onClick={() => retry()}
          className="rounded-md bg-slate-900 px-4 py-2 text-white hover:bg-slate-700"
        >
          Try Again
        </button>
        <Link
          href="/projects"
          className="rounded-md bg-slate-200 px-4 py-2 text-slate-900 hover:bg-slate-300"
        >
          Back to Projects
        </Link>
      </div>
    </section>
  );
}
