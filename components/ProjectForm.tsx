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

// focus-visible: a clear ring for keyboard users (Tab), not on mouse clicks.
const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2';

const inputClass = `w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 aria-[invalid=true]:border-red-600 ${focusRing}`;

// Error messages for one field. The container is ALWAYS rendered (even when
// empty) because screen readers only announce changes inside a live region
// that already exists on the page.
function FieldErrors({ id, errors }: { id: string; errors?: string[] }) {
  return (
    <div id={id} aria-live="polite" aria-atomic="true">
      {errors?.map((error) => (
        <p key={error} className="mt-1 text-sm text-red-600">{error}</p>
      ))}
    </div>
  );
}

export default function ProjectForm({ action, project, submitLabel }: ProjectFormProps) {
  const initialState: ProjectFormState = { errors: {}, message: null };
  const [state, formAction, isPending] = useActionState(action, initialState);
  const errors = state.errors ?? {};

  // After a failed submit, show what the user typed; otherwise the saved project.
  const values = {
    title: state.values?.title ?? project?.title ?? '',
    description: state.values?.description ?? project?.description ?? '',
    type: state.values?.type ?? project?.type ?? '',
    technologies: state.values?.technologies ?? project?.technologies.join(', ') ?? '',
    yearCompleted: state.values?.yearCompleted ?? project?.year_completed?.toString() ?? '',
    link: state.values?.link ?? project?.link ?? '',
  };

  return (
    <form action={formAction} className="my-6 max-w-xl space-y-4">
      <div>
        <label htmlFor="title" className="block font-medium">Title</label>
        <input id="title" name="title" type="text" required defaultValue={values.title}
          className={inputClass}
          aria-describedby="title-error" aria-invalid={!!errors.title} />
        <FieldErrors id="title-error" errors={errors.title} />
      </div>

      <div>
        <label htmlFor="description" className="block font-medium">Description</label>
        <textarea id="description" name="description" rows={4} required defaultValue={values.description}
          className={inputClass}
          aria-describedby="description-error" aria-invalid={!!errors.description} />
        <FieldErrors id="description-error" errors={errors.description} />
      </div>

      <div>
        <label htmlFor="type" className="block font-medium">Type</label>
        <select id="type" name="type" required defaultValue={values.type}
          className={inputClass}
          aria-describedby="type-error" aria-invalid={!!errors.type}>
          <option value="" disabled>Select a type</option>
          <option value="opensource">Open Source</option>
          <option value="school">School</option>
        </select>
        <FieldErrors id="type-error" errors={errors.type} />
      </div>

      <div>
        <label htmlFor="technologies" className="block font-medium">
          Technologies <span className="text-sm text-slate-500">(comma-separated)</span>
        </label>
        <input id="technologies" name="technologies" type="text" required defaultValue={values.technologies}
          placeholder="Next.js, TypeScript, PostgreSQL"
          className={inputClass}
          aria-describedby="technologies-error" aria-invalid={!!errors.technologies} />
        <FieldErrors id="technologies-error" errors={errors.technologies} />
      </div>

      <div>
        <label htmlFor="yearCompleted" className="block font-medium">Year Completed</label>
        <input id="yearCompleted" name="yearCompleted" type="number" required
          min="2000" max="2099" defaultValue={values.yearCompleted}
          className={inputClass}
          aria-describedby="yearCompleted-error" aria-invalid={!!errors.yearCompleted} />
        <FieldErrors id="yearCompleted-error" errors={errors.yearCompleted} />
      </div>

      <div>
        <label htmlFor="link" className="block font-medium">
          Link <span className="text-sm text-slate-500">(optional)</span>
        </label>
        <input id="link" name="link" type="url" defaultValue={values.link}
          placeholder="https://github.com/..."
          className={inputClass}
          aria-describedby="link-error" aria-invalid={!!errors.link} />
        <FieldErrors id="link-error" errors={errors.link} />
      </div>

      {/* General form message (also always rendered as a live region). */}
      <div aria-live="polite" aria-atomic="true">
        {state.message && <p className="text-red-600">{state.message}</p>}
      </div>

      <div className="flex gap-4">
        <button type="submit" disabled={isPending}
          className={`rounded-md bg-slate-900 px-4 py-2 text-white hover:bg-slate-700 disabled:opacity-50 ${focusRing}`}>
          {isPending ? 'Saving...' : submitLabel}
        </button>
        <Link href="/projects"
          className={`rounded-md bg-slate-200 px-4 py-2 text-slate-900 hover:bg-slate-300 ${focusRing}`}>
          Cancel
        </Link>
      </div>
    </form>
  );
}
