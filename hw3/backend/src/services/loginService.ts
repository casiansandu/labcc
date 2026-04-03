import { db } from '../db/db';
import { hashPassword } from '../utils/hashPassword';

export async function loginService(email: string, password: string): Promise<string> {
  const passwordHash = hashPassword(password);

  const result = await db.query<{ id: number; username: string }>(
    'SELECT id, username FROM users WHERE email = $1 AND password = $2',
    [email.toLowerCase(), passwordHash]
  );

  if (result.rows.length === 0) {
    throw new Error('Invalid credentials');
  }

  // For simplicity, return a fake token
  return `token_${result.rows[0].id}`;
}

export default loginService;