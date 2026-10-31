interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
}

export default function ProjectCard({ title, description, technologies, link }: ProjectCardProps) {
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
    </article>
  );
}


