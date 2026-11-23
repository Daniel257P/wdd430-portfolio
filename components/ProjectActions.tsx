import Link from "next/link";
import { deleteProject } from "@/lib/actions";

// Edit/Delete buttons, only shown on the dashboard (logged-in owner).
export default function ProjectActions({ id }: { id: number }) {
  return (
    <div className="flex gap-2">
      <Link
        href={`/dashboard/projects/${id}/edit`}
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
  );
}
