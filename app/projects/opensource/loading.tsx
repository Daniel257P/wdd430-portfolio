import ProjectCardSkeleton from "@/components/ProjectCardSkeleton";

// Page-level streaming: Next.js wraps page.tsx in <Suspense> and shows
// this whole-page skeleton until the page finishes loading its data.
export default function Loading() {
  return (
    <>
      <section className="flex items-center justify-center bg-black py-12 animate-pulse">
        <div className="h-10 w-72 rounded bg-slate-700" />
      </section>
      <ProjectCardSkeleton />
    </>
  );
}
