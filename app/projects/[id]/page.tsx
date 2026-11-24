import type { Metadata } from "next";
import { Suspense, cache } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectById } from "@/lib/projects-db";

type Props = {
  params: Promise<{ id: string }>;
};

// generateMetadata() and the page both need the project. cache() makes the
// second call reuse the first result, so the database is queried only once.
const getProject = cache(async (id: string) => {
  const numericId = Number(id);
  if (!Number.isInteger(numericId) || numericId < 1) return null;
  return getProjectById(numericId);
});

// Builds <title>, <meta name="description"> and Open Graph tags from the
// project in the database. Runs on the server for every request.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested portfolio project could not be found.",
    };
  }

  return {
    title: project.title, // -> "CrashWatch ATX | Project Portfolio"
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      url: `/projects/${project.id}`,
      // No project images in the DB yet, so reuse the site-wide image.
      images: ["/opengraph-image.png"],
    },
  };
}

async function ProjectDetails({ params }: Props) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) notFound();

  return (
    <article className="py-8">
      <h1 className="text-4xl font-bold mb-2">{project.title}</h1>
      <p className="text-slate-500 mb-6">
        {project.type === "opensource" ? "Open Source" : "School"} project
        {project.year_completed && <> · Completed {project.year_completed}</>}
      </p>
      <p className="text-lg text-slate-700 dark:text-slate-300 mb-6">
        {project.description}
      </p>

      <h2 className="text-xl font-semibold mb-2">Technologies</h2>
      <ul className="flex flex-wrap gap-2 mb-8">
        {project.technologies.map((tech) => (
          <li key={tech} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-800">
            {tech}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-4">
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-slate-900 px-4 py-2 text-white hover:bg-slate-700"
          >
            View Project
          </a>
        )}
        <Link href="/projects" className="px-4 py-2 underline">
          Back to all projects
        </Link>
      </div>
    </article>
  );
}

export default function ProjectPage(props: Props) {
  // params is runtime data, so it must be read inside <Suspense>.
  return (
    <Suspense fallback={<p className="py-8">Loading project...</p>}>
      <ProjectDetails params={props.params} />
    </Suspense>
  );
}
