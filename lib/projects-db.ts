// lib/projects-db.ts
export interface Project {
  id: number;
  title: string;
  description: string;
  type: 'opensource' | 'school';
  technologies: string[];
  link?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'CrashWatch ATX',
    description: 'CrashWatch ATX is a web application that centralizes and visualizes the most common types of traffic accidents in Austin, TX',
    type: 'opensource',
    technologies: ['TypeScript', 'React'],
    link: 'https://github.com/example/repo'
  },
  {
    id: 2,
    title: 'CSE 340 Service Network',
    description: 'A web application for managing and displaying service requests.',
    type: 'school',
    technologies: ['PostgreSQL', 'SQL']
  }
];

export function getProjects(type?: string | null): Project[] {
  if (type) return projects.filter(p => p.type === type);
  return projects;
}

export function getProjectById(id: number): Project | null {
  return projects.find(p => p.id === id) ?? null;
}