// Placeholder shaped like ProjectList + ProjectCard, shown while projects load.
function CardSkeleton() {
  return (
    <article className="flex flex-col bg-white shadow-md rounded-lg p-6">
      {/* title */}
      <div className="h-6 w-1/2 rounded bg-slate-300 mb-4" />
      {/* description lines */}
      <div className="h-4 w-full rounded bg-slate-200 mb-2" />
      <div className="h-4 w-5/6 rounded bg-slate-200 mb-4" />
      {/* technology pills */}
      <div className="flex gap-2 mb-4">
        <div className="h-6 w-16 rounded-full bg-slate-200" />
        <div className="h-6 w-20 rounded-full bg-slate-200" />
        <div className="h-6 w-14 rounded-full bg-slate-200" />
      </div>
      {/* button */}
      <div className="h-10 w-32 rounded-md bg-slate-300" />
    </article>
  );
}

export default function ProjectCardSkeleton() {
  return (
    <section
      className="grid gap-4 md:grid-cols-2 animate-pulse"
      aria-busy="true"
      aria-label="Loading projects"
    >
      <CardSkeleton />
      <CardSkeleton />
    </section>
  );
}
