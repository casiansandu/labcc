import { Request, Response } from 'express';
import loginService from '../services/loginService';

export async function loginController(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body as { email: string; password: string };

    if (!email || !password) {
      res.status(400).json({ error: 'email and password are required' });
      return;
    }

    const token = await loginService(email, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ error: 'Invalid credentials' });
  }
}