import { Suspense } from "react";
import ProjectCardSkeleton from "@/components/ProjectCardSkeleton";
import SchoolProjectList from "@/components/SchoolProjectList";

// Component-level streaming: the heading renders immediately, and only
// <SchoolProjectList /> waits for data, showing the skeleton meanwhile.
export default function SchoolProjectsPage() {
  return (
    <>
      <section className="flex items-center justify-center bg-black py-12">
        <h1 className="text-4xl font-bold text-white">
          School Projects
        </h1>
      </section>
      <Suspense fallback={<ProjectCardSkeleton />}>
        <SchoolProjectList />
      </Suspense>
    </>
  );
}
