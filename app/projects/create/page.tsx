import ProjectForm from "@/components/ProjectForm";
import { createProject } from "@/lib/actions";

export default function CreateProjectPage() {
  return (
    <>
      <section className="flex items-center justify-center bg-black py-12">
        <h1 className="text-4xl font-bold text-white">Create Project</h1>
      </section>
      <ProjectForm action={createProject} submitLabel="Create Project" />
    </>
  );
}
