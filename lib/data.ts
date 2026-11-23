import { sql } from '@vercel/postgres';

export interface User {
  id: number;
  name: string;
  email: string;
  passwordHash: string; // bcrypt hash, never the real password
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const { rows } = await sql<User>`
    SELECT id, name, email, password_hash AS "passwordHash"
    FROM users
    WHERE email = ${email.toLowerCase()}
  `;
  return rows[0] ?? null;
}
