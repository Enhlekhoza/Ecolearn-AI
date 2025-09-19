import { Router } from 'express';
import authRoutes from './auth';
import userRoutes from './user';
import calculatorRoutes from './calculator';
import chatRoutes from './chat';
import tipsRoutes from './tips';

const router = Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/calculator', calculatorRoutes);
router.use('/chat', chatRoutes);
router.use('/tips', tipsRoutes);

export default router;
