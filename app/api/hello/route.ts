import { getProjects } from "@/lib/projects-db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    const filteredProjects = type
  ? (await getProjects(type)).filter((project) => project.type === type)
  : await getProjects();

  return Response.json({ filteredProjects });
}