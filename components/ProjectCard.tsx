import Link from "next/link";
import { deleteProject } from "@/lib/actions";

interface ProjectCardProps {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
}

export default function ProjectCard({ id, title, description, technologies, link }: ProjectCardProps) {
  return (
    <article className="flex flex-col bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-700 mb-4">{description}</p>
      <ul className="flex flex-wrap gap-2 mb-4">
        {technologies.map((tech) => (
          <li
            key={tech}
            className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-800"
          >
            {tech}
          </li>
        ))}
      </ul>
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto self-start inline-block bg-slate-900 text-white px-4 py-2 rounded-md hover:bg-slate-700 transition-colors"
        >
          View Project
        </a>
      )}

      <div className={`${link ? "mt-4" : "mt-auto"} flex gap-2`}>
        <Link
          href={`/projects/${id}/edit`}
          className="rounded-md bg-slate-200 px-4 py-2 text-sm text-slate-900 hover:bg-slate-300"
        >
          Edit
        </Link>
        {/* The hidden id tells deleteProject which single row to remove. */}
        <form action={deleteProject}>
          <input type="hidden" name="id" value={id} />
          <button
            type="submit"
            className="rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
          >
            Delete
          </button>
        </form>
      </div>
    </article>
  );
}
