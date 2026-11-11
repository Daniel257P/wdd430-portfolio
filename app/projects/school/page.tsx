import { Suspense } from "react";
import { connection } from "next/server";
import ProjectList from "@/components/ProjectList";
import { getProjects } from "@/lib/projects-db";

async function SchoolProjects() {
  // Opt into dynamic rendering: run on every request, never prerender.
  await connection();
  const projects = await getProjects("school");

  return <ProjectList projects={projects} />;
}

export default function SchoolProjectsPage() {
  return (
    <>
      <section className="flex items-center justify-center bg-black py-12">
        <h1 className="text-4xl font-bold text-white">
          School Projects
        </h1>
      </section>
      <Suspense fallback={<p className="py-6">Loading projects...</p>}>
        <SchoolProjects />
      </Suspense>
    </>
  );
}
