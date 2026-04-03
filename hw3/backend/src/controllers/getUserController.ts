import { Response } from 'express';
import { RequestWithAuth } from '../middlewares/authMiddleware';
import { getUserService } from '../services/getUserService';

export async function getUserController(req: RequestWithAuth, res: Response): Promise<void> {
  const authUser = req.authUser;

  if (!authUser) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const user = await getUserService(authUser.userId);

  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  res.status(200).json(user);
}
