import { Request, Response } from 'express';
import { createUserService } from '../services/createUserService';
import { CreateUserRequestBody } from '../types';

export async function createUserController(req: Request, res: Response): Promise<void> {
  try {
    const {
      username,
      email,
      full_name: fullName,
      password,
      birth_date: birthDate,
      phone_number: phoneNumber,
      profile_picture_url: profilePictureUrl,
    } = req.body as CreateUserRequestBody;

    if (!username || !email || !fullName || !password) {
      res.status(400).json({ error: 'username, email, full_name, and password are required' });
      return;
    }

    const createdUser = await createUserService({
      username,
      email,
      fullName,
      password,
      birthDate,
      phoneNumber,
      profilePictureUrl,
    });
    res.status(201).json(createdUser);
  } catch (error) {
    const pgError = error as { code?: string; detail?: string; message?: string };

    if (pgError.code === '23505') {
      res.status(409).json({ error: 'email or username already exists', detail: pgError.detail });
      return;
    }

    res.status(500).json({ error: 'failed to create user', detail: pgError.message });
  }
}
