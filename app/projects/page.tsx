import { Suspense } from "react";
import { connection } from "next/server";
import ProjectList from "@/components/ProjectList";
import { getProjects } from "@/lib/projects-db";

async function Projects() {
  // Opt into dynamic rendering: run on every request, never prerender.
  await connection();
  const projects = await getProjects();

  return <ProjectList projects={projects} />;
}

export default function ProjectsPage() {
  return (
    <>
      <section className="flex items-center justify-center bg-black py-12">
        <h1 className="text-4xl font-bold text-white">
          Projects Overview
        </h1>
      </section>
      <Suspense fallback={<p className="py-6">Loading projects...</p>}>
        <Projects />
      </Suspense>
    </>
  );
}
