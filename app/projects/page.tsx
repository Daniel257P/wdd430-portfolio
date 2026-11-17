import { Suspense } from "react";
import Link from "next/link";
import ProjectList from "@/components/ProjectList";
import ProjectSearch from "@/components/ProjectSearch";
import Pagination from "@/components/Pagination";
import ProjectCardSkeleton from "@/components/ProjectCardSkeleton";
import { fetchFilteredProjects, fetchProjectsPages } from "@/lib/projects-db";

type SearchParams = Promise<{ query?: string; page?: string }>;

// Reads the URL (?query=...&page=...) and loads the matching projects.
async function ProjectResults({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const query = params?.query?.trim() ?? "";
  const currentPage = Math.max(1, Number(params?.page) || 1);

  // Run both queries at the same time.
  const [projects, totalPages] = await Promise.all([
    fetchFilteredProjects(query, currentPage),
    fetchProjectsPages(query),
  ]);

  return (
    <>
      {projects.length > 0 ? (
        <ProjectList projects={projects} />
      ) : (
        <p className="py-6">
          {query ? <>No projects match &quot;{query}&quot;.</> : "No projects found."}
        </p>
      )}
      <Pagination totalPages={totalPages} />
    </>
  );
}

export default function ProjectsPage(props: { searchParams: SearchParams }) {
  return (
    <>
      <section className="flex items-center justify-center bg-black py-12">
        <h1 className="text-4xl font-bold text-white">
          Projects Overview
        </h1>
      </section>

      <div className="my-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <Link
          href="/projects/create"
          className="shrink-0 rounded-md bg-slate-900 px-4 py-2 text-center text-white hover:bg-slate-700"
        >
          + Create Project
        </Link>
        {/* useSearchParams in a Client Component needs a Suspense boundary */}
        <Suspense fallback={<div className="h-10 rounded-md bg-slate-200" />}>
          <ProjectSearch />
        </Suspense>
      </div>

      <Suspense fallback={<ProjectCardSkeleton />}>
        <ProjectResults searchParams={props.searchParams} />
      </Suspense>
    </>
  );
}
