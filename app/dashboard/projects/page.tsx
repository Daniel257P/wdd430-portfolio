import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import ProjectList from "@/components/ProjectList";
import ProjectCardSkeleton from "@/components/ProjectCardSkeleton";
import { getProjects } from "@/lib/projects-db";

async function ManageProjectList() {
  await connection(); // always load fresh data
  const projects = await getProjects();

  if (projects.length === 0) {
    return <p className="py-6">No projects yet. Create your first one!</p>;
  }
  return <ProjectList projects={projects} showActions />;
}

export default function ManageProjectsPage() {
  return (
    <>
      <section className="flex items-center justify-center bg-black py-12">
        <h1 className="text-4xl font-bold text-white">Manage Projects</h1>
      </section>

      <div className="my-6">
        <Link
          href="/dashboard/projects/new"
          className="inline-block rounded-md bg-slate-900 px-4 py-2 text-white hover:bg-slate-700"
        >
          + New Project
        </Link>
      </div>

      <Suspense fallback={<ProjectCardSkeleton />}>
        <ManageProjectList />
      </Suspense>
    </>
  );
}
