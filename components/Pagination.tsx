'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  // Keep the current search query and only change the page number.
  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  if (totalPages <= 1) return null;

  const linkClass = 'rounded-md bg-slate-900 px-4 py-2 text-white hover:bg-slate-700';
  const disabledClass = 'rounded-md bg-slate-200 px-4 py-2 text-slate-500 cursor-not-allowed';

  return (
    <nav aria-label="Pagination" className="mt-6 flex items-center justify-center gap-4">
      {currentPage > 1 ? (
        <Link href={createPageURL(currentPage - 1)} className={linkClass}>
          ← Previous
        </Link>
      ) : (
        <span className={disabledClass} aria-disabled="true">← Previous</span>
      )}

      <span>
        Page {currentPage} of {totalPages}
      </span>

      {currentPage < totalPages ? (
        <Link href={createPageURL(currentPage + 1)} className={linkClass}>
          Next →
        </Link>
      ) : (
        <span className={disabledClass} aria-disabled="true">Next →</span>
      )}
    </nav>
  );
}
