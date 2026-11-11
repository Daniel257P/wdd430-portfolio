import { connection } from "next/server";
import ProjectList from "./ProjectList";
import { getProjects } from "@/lib/projects-db";

// Async Server Component that loads its own data, so it can be
// streamed independently inside a <Suspense> boundary.
export default async function SchoolProjectList() {
  // Opt into dynamic rendering: run on every request, never prerender.
  await connection();
  const projects = await getProjects("school");

  return <ProjectList projects={projects} />;
}
