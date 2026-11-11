'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function ProjectSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Wait 300 ms after the user stops typing before updating the URL.
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1'); // a new search always starts on page 1

    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }

    // replace() updates the URL without a full page reload.
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative">
      <label htmlFor="project-search" className="sr-only">
        Search projects
      </label>
      <input
        id="project-search"
        type="search"
        placeholder="Search projects..."
        defaultValue={searchParams.get('query')?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full rounded-md border border-slate-300 bg-white px-4 py-2 text-slate-900 placeholder:text-slate-500"
      />
    </div>
  );
}
