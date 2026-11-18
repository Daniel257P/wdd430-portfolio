'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

// Rules every project must follow before it can be saved.
const ProjectFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, 'Title must be at least 3 characters.')
    .max(100, 'Title must be 100 characters or less.'),
  description: z
    .string()
    .trim()
    .min(20, 'Description must be at least 20 characters.'),
  type: z.enum(['opensource', 'school'], { error: 'Choose a project type.' }),
  technologies: z
    .array(z.string().min(2, 'Each technology must be at least 2 characters.'))
    .min(1, 'Add at least one technology.'),
  // FormData values are strings, so coerce "2024" -> 2024 before checking.
  yearCompleted: z.coerce
    .number({ error: 'Enter the year the project was completed.' })
    .int('Year must be a whole number.')
    .min(2000, 'Year must be 2000 or later.')
    // Checked when the form is submitted, so it's always the current year.
    .refine((year) => year <= new Date().getFullYear(), 'Year cannot be in the future.'),
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
  const fields = ['title', 'description', 'type', 'technologies', 'yearCompleted', 'link'];
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
    yearCompleted: formData.get('yearCompleted') || undefined, // empty -> "required" error
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

  const { title, description, type, technologies, yearCompleted, link } = validated.data;

  // `sql` only accepts simple values, so the array is sent as JSON text and
  // turned back into a Postgres TEXT[] with json_array_elements_text.
  try {
    await sql`
      INSERT INTO projects (title, description, type, technologies, year_completed, link)
      VALUES (
        ${title},
        ${description},
        ${type},
        ARRAY(SELECT json_array_elements_text(${JSON.stringify(technologies)}::json)),
        ${yearCompleted},
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

  const { title, description, type, technologies, yearCompleted, link } = validated.data;

  try {
    await sql`
      UPDATE projects
      SET title = ${title},
          description = ${description},
          type = ${type},
          technologies = ARRAY(SELECT json_array_elements_text(${JSON.stringify(technologies)}::json)),
          year_completed = ${yearCompleted},
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

  try {
    await sql`DELETE FROM projects WHERE id = ${id}`;
  } catch (error) {
    console.error(error); // full details stay in the server logs
    // A friendly message for app/projects/error.tsx to display.
    throw new Error('Failed to delete project. Please try again.');
  }

  revalidatePath('/projects');
}
