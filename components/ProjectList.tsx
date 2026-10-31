import ProjectCard from "./ProjectCard";

export interface Project {
    id: string;
    title: string;
    description: string;
    technologies: string[];
    link?: string;
}

interface ProjectListProps {
  projects: Project[];
}

export default function ProjectList({ projects }: ProjectListProps) {
    return (
        <section className="grid gap-4 md:grid-cols-2">
            {projects.map((project) => (
                <ProjectCard key={project.id} {...project} />
            ))}
        </section>
  );
}