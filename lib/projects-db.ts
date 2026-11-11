// lib/projects-db.ts
import { sql } from '@vercel/postgres';

export interface Project {
  id: number;
  title: string;
  description: string;
  type: 'opensource' | 'school';
  technologies: string[];
  link?: string;
}

export async function getProjects(type?: string | null): Promise<Project[]> {
  if (type) {
    const { rows } = await sql<Project>`
      SELECT * FROM projects WHERE type = ${type} ORDER BY id
    `;
    return rows;
  }
  const { rows } = await sql<Project>`SELECT * FROM projects ORDER BY id`;
  return rows;
}

export const ITEMS_PER_PAGE = 6;

// Search title, description and technologies (case-insensitive) and return
// one page of results. `sql` sends ${...} values as safe parameters.
export async function fetchFilteredProjects(
  query: string,
  currentPage: number
): Promise<Project[]> {
  const pattern = `%${query}%`;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const { rows } = await sql<Project>`
    SELECT * FROM projects
    WHERE title ILIKE ${pattern}
       OR description ILIKE ${pattern}
       OR array_to_string(technologies, ' ') ILIKE ${pattern}
    ORDER BY id
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
  `;
  return rows;
}

// Same filter as fetchFilteredProjects, but returns how many pages exist.
export async function fetchProjectsPages(query: string): Promise<number> {
  const pattern = `%${query}%`;

  const { rows } = await sql<{ count: string }>`
    SELECT COUNT(*) FROM projects
    WHERE title ILIKE ${pattern}
       OR description ILIKE ${pattern}
       OR array_to_string(technologies, ' ') ILIKE ${pattern}
  `;
  // Postgres returns COUNT(*) as a string, so convert it to a number.
  return Math.ceil(Number(rows[0].count) / ITEMS_PER_PAGE);
}

export async function getProjectById(id: number): Promise<Project | null> {
  const { rows } = await sql<Project>`
    SELECT * FROM projects WHERE id = ${id}
  `;
  return rows[0] ?? null;
}