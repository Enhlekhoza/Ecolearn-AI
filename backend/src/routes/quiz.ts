import { Router } from 'express';
import { getQuizzes, getQuiz, submitQuiz } from '../controllers/quiz';
import { protect } from '../middleware/auth';

const router = Router();

router.get('/', getQuizzes);
router.get('/:id', getQuiz);
router.post('/:id/submit', protect, submitQuiz);

export default router;
