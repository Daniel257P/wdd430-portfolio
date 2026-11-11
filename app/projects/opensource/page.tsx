import { connection } from "next/server";
import ProjectList from "@/components/ProjectList";
import { getProjects } from "@/lib/projects-db";

// Page-level streaming: no <Suspense> here. The whole page waits for the
// data, and app/projects/opensource/loading.tsx is shown in the meantime.
export default async function OpenSourceProjectsPage() {
  // Opt into dynamic rendering: run on every request, never prerender.
  await connection();
  const projects = await getProjects("opensource");

  return (
    <>
      <section className="flex items-center justify-center bg-black py-12">
        <h1 className="text-4xl font-bold text-white">
          Open Source Projects
        </h1>
      </section>
      <ProjectList projects={projects} />
    </>
  );
}
