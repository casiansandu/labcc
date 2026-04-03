import { Router } from 'express';
import { createUserController } from '../controllers/createUserController';
import { loginController } from '../controllers/loginController';

const authRoutes = Router();

authRoutes.post('/register', createUserController);
authRoutes.post('/login', loginController);

export default authRoutes;
