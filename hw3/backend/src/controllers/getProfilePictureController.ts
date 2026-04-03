import { Response } from 'express';
import { getUserProfilePictureService } from '../services/getProfilePictureService';
import { RequestWithAuth } from '../middlewares/authMiddleware';

export async function getProfilePictureController(req: RequestWithAuth, res: Response): Promise<void> {
  const userId = req.authUser?.userId;

  if (!userId || Number.isNaN(userId)) {
    res.status(400).json({ error: 'Invalid or missing user ID' });
    return;
  }

  const profilePicture = await getUserProfilePictureService(userId);

  if (!profilePicture) {
    res.status(404).json({ error: 'No profile picture found' });
    return;
  }

  res.status(200).json(profilePicture);
}
