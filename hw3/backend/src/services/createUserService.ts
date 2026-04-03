import { db } from '../db/db';
import { hashPassword } from '../utils/hashPassword';
import { CreateUserInput, CreateUserResult } from '../types';

export async function createUserService(input: CreateUserInput): Promise<CreateUserResult> {
  const username = input.username.trim();
  const email = input.email.trim().toLowerCase();
  const fullName = input.fullName.trim();
  const passwordHash = hashPassword(input.password);

  const result = await db.query<CreateUserResult>(
    `
      INSERT INTO users (username, email, full_name, password, birth_date, phone_number, profile_picture_url)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id, username, email, full_name, birth_date, phone_number, profile_picture_url, created_at, updated_at
    `,
    [
      username,
      email,
      fullName,
      passwordHash,
      input.birthDate ?? null,
      input.phoneNumber ?? null,
      input.profilePictureUrl ?? null,
    ],
  );

  return result.rows[0];
}
