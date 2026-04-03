import { Request, Response } from 'express';
import { RequestWithAuth } from '../middlewares/authMiddleware';

export async function meController(req: Request, res: Response): Promise<void> {
  const authUser = (req as RequestWithAuth).authUser;

  if (!authUser) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  res.status(200).json({ userId: authUser.userId, username: authUser.username });
}
