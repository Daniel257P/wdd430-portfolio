import ProjectList, { Project} from '@/components/ProjectList';
const projects: Project[] = [
  {
    id: 1,
    title: 'CrashWatch ATX',
    description: 'CrashWatch ATX is a web application that centralizes and visualizes the most common types of traffic accidents in Austin, TX',
    technologies: ['JavaScript', 'HTML', 'CSS'],
    link: 'https://github.com/Daniel257P/crashwatch-atx'
  },
  {
    id: 2,
    title: 'CSE 340 Service Network',
    description: 'A web application for managing and displaying service requests.',
    technologies: ['EJS', 'JavaScript', 'CSS'],
    link: 'https://github.com/Daniel257P/CSE340-course-repo'
  }
];

export default function Home() { 
  return (
    <>
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">My Portfolio</h1>
        <p className="text-lg text-slate-700 dark:text-slate-300">
          I&apos;m a full-stack developer learning Next.js and React. Here are some of my recent projects.
        </p>
      </section>
      <section className="pb-12">
        <h2 className="text-2xl font-semibold mb-4">My Projects</h2>
        <ProjectList projects={projects} />
      </section>
    </>
  );
}