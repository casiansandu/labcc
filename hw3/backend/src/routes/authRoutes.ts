import { Router } from 'express';
import { createUserController } from '../controllers/createUserController';
import { loginController } from '../controllers/loginController';
import { meController } from '../controllers/meController';
import { authMiddleware } from '../middlewares/authMiddleware';

const authRoutes = Router();

authRoutes.post('/register', createUserController);
authRoutes.post('/login', loginController);
authRoutes.get('/me', authMiddleware, meController);

export default authRoutes;
