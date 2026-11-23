import { redirect } from "next/navigation";

// /dashboard has no content of its own yet; send the user to the project list.
export default function DashboardPage() {
  redirect("/dashboard/projects");
}
