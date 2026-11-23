import { Suspense } from "react";
import { notFound } from "next/navigation";
import ProjectForm from "@/components/ProjectForm";
import { updateProject } from "@/lib/actions";
import { getProjectById } from "@/lib/projects-db";


type Params = Promise<{ id: string }>;

// Loads the project from the URL id and fills the form with it.
async function EditProjectForm({ params }: { params: Params }) {
  const { id: idParam } = await params; // params is a Promise in Next 16
  const id = Number(idParam);
  if (!Number.isInteger(id)) notFound();

  const project = await getProjectById(id);
  if (!project) notFound();

  // Pre-fill the first argument, so the form calls updateProject(id, prevState, formData).
  const updateProjectWithId = updateProject.bind(null, id);

  return (
    <ProjectForm
      action={updateProjectWithId}
      project={project}
      submitLabel="Save Changes"
    />
  );
}

export default function EditProjectPage(props: { params: Params }) {
  return (
    <>
      <section className="flex items-center justify-center bg-black py-12">
        <h1 className="text-4xl font-bold text-white">Edit Project</h1>
      </section>
      <Suspense fallback={<p className="py-6">Loading project...</p>}>
        <EditProjectForm params={props.params} />
      </Suspense>
    </>
  );
}