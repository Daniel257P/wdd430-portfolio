import { Suspense } from "react";
import { headers } from "next/headers";
import ProjectList from "@/components/ProjectList";
import type { Project } from "@/lib/projects-db";

async function Projects() {
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto") ?? "http";

  const res = await fetch(`${protocol}://${host}/api/projects`);
  const projects: Project[] = await res.json();

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
