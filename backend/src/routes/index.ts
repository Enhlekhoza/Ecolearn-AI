import { Router } from 'express';
import authRoutes from './auth';
import userRoutes from './user';
import calculatorRoutes from './calculator';
import chatRoutes from './chat';
import tipsRoutes from './tips';
import badgeRoutes from './badges';
import quizRoutes from './quiz';
import leaderboardRoutes from './leaderboard';

const router = Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/calculator', calculatorRoutes);
router.use('/chat', chatRoutes);
router.use('/tips', tipsRoutes);
router.use('/badges', badgeRoutes);
router.use('/quiz', quizRoutes);
router.use('/leaderboard', leaderboardRoutes);

export default router;