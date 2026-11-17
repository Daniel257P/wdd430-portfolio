'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import type { ProjectFormState } from '@/lib/actions';
import type { Project } from '@/lib/projects-db';

interface ProjectFormProps {
  // createProject, or updateProject.bind(null, id) on the edit page
  action: (state: ProjectFormState, formData: FormData) => Promise<ProjectFormState>;
  project?: Project; // filled in when editing
  submitLabel: string;
}

const inputClass =
  'w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900';

// Shows the error messages for one field, if any.
function FieldErrors({ id, errors }: { id: string; errors?: string[] }) {
  if (!errors?.length) return null;
  return (
    <div id={id} aria-live="polite">
      {errors.map((error) => (
        <p key={error} className="mt-1 text-sm text-red-600">{error}</p>
      ))}
    </div>
  );
}

export default function ProjectForm({ action, project, submitLabel }: ProjectFormProps) {
  const initialState: ProjectFormState = { errors: {}, message: null };
  const [state, formAction, pending] = useActionState(action, initialState);

  // After a failed submit, show what the user typed; otherwise the saved project.
  const values = {
    title: state.values?.title ?? project?.title ?? '',
    description: state.values?.description ?? project?.description ?? '',
    type: state.values?.type ?? project?.type ?? '',
    technologies: state.values?.technologies ?? project?.technologies.join(', ') ?? '',
    link: state.values?.link ?? project?.link ?? '',
  };

  return (
    <form action={formAction} className="my-6 max-w-xl space-y-4">
      <div>
        <label htmlFor="title" className="block font-medium">Title</label>
        <input id="title" name="title" type="text" defaultValue={values.title}
          className={inputClass} aria-describedby="title-error" />
        <FieldErrors id="title-error" errors={state.errors?.title} />
      </div>

      <div>
        <label htmlFor="description" className="block font-medium">Description</label>
        <textarea id="description" name="description" rows={4} defaultValue={values.description}
          className={inputClass} aria-describedby="description-error" />
        <FieldErrors id="description-error" errors={state.errors?.description} />
      </div>

      <div>
        <label htmlFor="type" className="block font-medium">Type</label>
        <select id="type" name="type" defaultValue={values.type}
          className={inputClass} aria-describedby="type-error">
          <option value="" disabled>Select a type</option>
          <option value="opensource">Open Source</option>
          <option value="school">School</option>
        </select>
        <FieldErrors id="type-error" errors={state.errors?.type} />
      </div>

      <div>
        <label htmlFor="technologies" className="block font-medium">
          Technologies <span className="text-sm text-slate-500">(comma-separated)</span>
        </label>
        <input id="technologies" name="technologies" type="text" defaultValue={values.technologies}
          placeholder="Next.js, TypeScript, PostgreSQL"
          className={inputClass} aria-describedby="technologies-error" />
        <FieldErrors id="technologies-error" errors={state.errors?.technologies} />
      </div>

      <div>
        <label htmlFor="link" className="block font-medium">
          Link <span className="text-sm text-slate-500">(optional)</span>
        </label>
        <input id="link" name="link" type="url" defaultValue={values.link}
          placeholder="https://github.com/..."
          className={inputClass} aria-describedby="link-error" />
        <FieldErrors id="link-error" errors={state.errors?.link} />
      </div>

      {state.message && (
        <p className="text-red-600" aria-live="polite">{state.message}</p>
      )}

      <div className="flex gap-4">
        <button type="submit" disabled={pending}
          className="rounded-md bg-slate-900 px-4 py-2 text-white hover:bg-slate-700 disabled:opacity-50">
          {pending ? 'Saving...' : submitLabel}
        </button>
        <Link href="/projects" className="rounded-md bg-slate-200 px-4 py-2 text-slate-900 hover:bg-slate-300">
          Cancel
        </Link>
      </div>
    </form>
  );
}
