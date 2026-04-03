import { Router } from 'express';
import { createUserController } from '../controllers/createUserController';

const authRoutes = Router();

authRoutes.post('/register', createUserController);

export default authRoutes;
