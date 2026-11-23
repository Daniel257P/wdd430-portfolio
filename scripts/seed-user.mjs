// Creates the users table (if needed) and adds or updates one login account.
// Run it from the project folder:
//   node --env-file=.env.local scripts/seed-user.mjs
// You type your email and password in the terminal; only a bcrypt hash is saved.
import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';
import readline from 'node:readline';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function ask(question) {
  return new Promise((resolve) => rl.question(question, (answer) => resolve(answer.trim())));
}

// Like ask(), but shows * instead of the characters you type.
function askHidden(question) {
  return new Promise((resolve) => {
    const write = rl._writeToOutput.bind(rl);
    rl._writeToOutput = (text) => write(text.includes(question) ? text : '*');
    rl.question(question, (answer) => {
      rl._writeToOutput = write;
      process.stdout.write('\n');
      resolve(answer);
    });
  });
}

const name = await ask('Name: ');
const email = (await ask('Email: ')).toLowerCase();
const password = await askHidden('Password (min 6 characters): ');
const confirm = await askHidden('Confirm password: ');
rl.close();

if (!email.includes('@')) throw new Error('That email does not look valid.');
if (password.length < 6) throw new Error('Password must be at least 6 characters.');
if (password !== confirm) throw new Error('Passwords do not match.');

await sql`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL
  )
`;

const passwordHash = await bcrypt.hash(password, 10);

// Running the script again with the same email updates the name/password.
await sql`
  INSERT INTO users (name, email, password_hash)
  VALUES (${name}, ${email}, ${passwordHash})
  ON CONFLICT (email) DO UPDATE
    SET name = EXCLUDED.name, password_hash = EXCLUDED.password_hash
`;

console.log(`User ${email} is ready. You can now sign in at /login.`);
process.exit(0);
