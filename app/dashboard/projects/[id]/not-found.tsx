import Link from "next/link";

// Shown when notFound() is called under /projects/[id]
// (for example, /projects/999/edit when project 999 doesn't exist).
export default function NotFound() {
  return (
    <section className="my-12 flex flex-col items-center gap-4 text-center">
      <h2 className="text-2xl font-bold">Project Not Found</h2>
      <p className="text-slate-600">
        The project you are looking for doesn&apos;t exist or was deleted.
      </p>
      <Link
        href="/projects"
        className="rounded-md bg-slate-900 px-4 py-2 text-white hover:bg-slate-700"
      >
        Back to Projects
      </Link>
    </section>
  );
}
