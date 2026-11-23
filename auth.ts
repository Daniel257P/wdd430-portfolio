import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { authConfig } from './auth.config';
import { getUserByEmail } from '@/lib/data';

const CredentialsSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      // Called by signIn('credentials', formData). Return the user to log in,
      // or null to reject (the login form then shows "Invalid email or password").
      async authorize(credentials) {
        const parsed = CredentialsSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;
        const user = await getUserByEmail(email);
        if (!user) return null;

        // Compare the typed password with the stored hash.
        const passwordsMatch = await bcrypt.compare(password, user.passwordHash);
        if (!passwordsMatch) return null;

        // Only these fields go into the session (never the hash).
        return { id: String(user.id), name: user.name, email: user.email };
      },
    }),
  ],
});
