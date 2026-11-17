'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

// Rules every project must follow before it can be saved.
const ProjectFormSchema = z.object({
  title: z.string().trim().min(1, 'Title is required.').max(100, 'Title must be 100 characters or less.'),
  description: z.string().trim().min(1, 'Description is required.'),
  type: z.enum(['opensource', 'school'], { error: 'Choose a project type.' }),
  technologies: z.array(z.string()).min(1, 'Add at least one technology.'),
  link: z.url('Link must be a valid URL.').optional(),
});

// What the form receives back: field errors and/or a general message.
// `values` sends the user's input back so the fields aren't cleared on error.
export type ProjectFormState = {
  errors?: Partial<Record<keyof z.infer<typeof ProjectFormSchema>, string[]>>;
  message?: string | null;
  values?: Record<string, string>;
};

function formValues(formData: FormData): Record<string, string> {
  const fields = ['title', 'description', 'type', 'technologies', 'link'];
  return Object.fromEntries(fields.map((f) => [f, String(formData.get(f) ?? '')]));
}

// Read the raw FormData and check it against the schema.
function validateProjectForm(formData: FormData) {
  const technologies = String(formData.get('technologies') ?? '')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean); // "React, , Next.js" -> ["React", "Next.js"]

  const link = String(formData.get('link') ?? '').trim();

  return ProjectFormSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    type: formData.get('type'),
    technologies,
    link: link || undefined, // empty field = no link
  });
}

export async function createProject(
  _prevState: ProjectFormState,
  formData: FormData
): Promise<ProjectFormState> {
  const validated = validateProjectForm(formData);
  if (!validated.success) {
    return {
      errors: z.flattenError(validated.error).fieldErrors,
      message: 'Please fix the errors below.',
      values: formValues(formData),
    };
  }

  const { title, description, type, technologies, link } = validated.data;

  // `sql` only accepts simple values, so the array is sent as JSON text and
  // turned back into a Postgres TEXT[] with json_array_elements_text.
  try {
    await sql`
      INSERT INTO projects (title, description, type, technologies, link)
      VALUES (
        ${title},
        ${description},
        ${type},
        ARRAY(SELECT json_array_elements_text(${JSON.stringify(technologies)}::json)),
        ${link ?? null}
      )
    `;
  } catch (error) {
    console.error(error);
    return { message: 'Database error: could not create the project.', values: formValues(formData) };
  }

  revalidatePath('/projects');
  redirect('/projects'); // outside try/catch: redirect works by throwing
}

// `id` comes first because the edit page calls updateProject.bind(null, id).
export async function updateProject(
  id: number,
  _prevState: ProjectFormState,
  formData: FormData
): Promise<ProjectFormState> {
  const validated = validateProjectForm(formData);
  if (!validated.success) {
    return {
      errors: z.flattenError(validated.error).fieldErrors,
      message: 'Please fix the errors below.',
      values: formValues(formData),
    };
  }

  const { title, description, type, technologies, link } = validated.data;

  try {
    await sql`
      UPDATE projects
      SET title = ${title},
          description = ${description},
          type = ${type},
          technologies = ARRAY(SELECT json_array_elements_text(${JSON.stringify(technologies)}::json)),
          link = ${link ?? null}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error(error);
    return { message: 'Database error: could not update the project.', values: formValues(formData) };
  }

  revalidatePath('/projects');
  redirect('/projects');
}

// Each card's delete form sends a hidden "id" field, so only that row is removed.
export async function deleteProject(formData: FormData) {
  const id = Number(formData.get('id'));
  if (!Number.isInteger(id) || id < 1) return;

  await sql`DELETE FROM projects WHERE id = ${id}`;
  revalidatePath('/projects');
}
