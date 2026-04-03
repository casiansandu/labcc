import { Response } from 'express';
import { RequestWithAuth } from '../middlewares/authMiddleware';
import { uploadProfilePictureService } from '../services/uploadProfilePictureService';

export async function uploadProfilePictureController(
  req: RequestWithAuth,
  res: Response
): Promise<void> {
  const authUser = req.authUser;

  if (!authUser) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  if (!req.file) {
    res.status(400).json({ error: 'No file uploaded' });
    return;
  }

  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (!allowedMimeTypes.includes(req.file.mimetype)) {
    res.status(400).json({ error: 'Invalid file type. Only JPEG, PNG, and WebP allowed.' });
    return;
  }

  const maxFileSize = 5 * 1024 * 1024; // 5MB
  if (req.file.size > maxFileSize) {
    res.status(400).json({ error: 'File too large. Maximum size is 5MB.' });
    return;
  }

  try {
    const imageUrl = await uploadProfilePictureService(
        authUser.userId,
        req.file.buffer,
        req.file.originalname,
        req.file.mimetype // Pass this down!
    );

    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error('Profile picture upload error:', error);
    res.status(500).json({ error: 'Failed to upload profile picture' });
  }
}
