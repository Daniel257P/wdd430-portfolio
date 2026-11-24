import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <section className="py-12 text-center">
      <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
      <p className="mb-6">The project you are looking for doesn&apos;t exist.</p>
      <Link href="/projects" className="underline">
        Back to all projects
      </Link>
    </section>
  );
}
