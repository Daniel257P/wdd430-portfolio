import Link from "next/link";
import SignOutButton from "@/components/SignOutButton";

// Shared by every page under /dashboard (protected by proxy.ts).
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <nav
        aria-label="Dashboard"
        className="my-4 flex flex-wrap items-center gap-4 rounded-md bg-slate-100 px-4 py-3"
      >
        <span className="font-semibold text-slate-900">Dashboard</span>
        <Link href="/dashboard/projects" className="text-slate-700 hover:underline">
          Manage Projects
        </Link>
        <Link href="/dashboard/projects/new" className="text-slate-700 hover:underline">
          New Project
        </Link>
        <Link href="/projects" className="text-slate-700 hover:underline">
          View Public Site
        </Link>
        <div className="ml-auto">
          <SignOutButton />
        </div>
      </nav>
      {children}
    </section>
  );
}
