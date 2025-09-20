import { Router } from 'express';
import { getQuizzes, getQuiz, submitQuiz } from '../controllers/quiz';
import { protect } from '../middleware/auth'; // Keep import for other protected routes if any

const router = Router();

router.get('/', getQuizzes);
router.get('/:id', getQuiz);
router.post('/:id/submit', submitQuiz); // Removed 'protect' middleware

export default router;