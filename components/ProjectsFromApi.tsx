import { headers } from "next/headers";
import ProjectList from "./ProjectList";
import type { Project } from "@/lib/projects-db";

interface ProjectsFromApiProps {
  endpoint: string;
}

export default async function ProjectsFromApi({ endpoint }: ProjectsFromApiProps) {
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto") ?? "http";

  const res = await fetch(`${protocol}://${host}${endpoint}`);

  if (!res.ok) {
    return <p className="py-6 text-red-700 dark:text-red-400">Could not load projects.</p>;
  }

  const projects: Project[] = await res.json();

  if (projects.length === 0) {
    return <p className="py-6">No projects found.</p>;
  }

  return (
    <div className="mt-6">
      <ProjectList projects={projects} />
    </div>
  );
}
