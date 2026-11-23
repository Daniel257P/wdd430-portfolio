import ProjectCard from "./ProjectCard";

export interface Project {
    id: number;
    title: string;
    description: string;
    technologies: string[];
    year_completed?: number | null;
    link?: string;
}

interface ProjectListProps {
  projects: Project[];
  showActions?: boolean; // true on the dashboard: show Edit/Delete
}

export default function ProjectList({ projects, showActions = false }: ProjectListProps) {
    return (
        <section className="grid gap-4 md:grid-cols-2">
            {projects.map((project) => (
                <ProjectCard key={project.id} {...project} showActions={showActions} />
            ))}
        </section>
  );
}