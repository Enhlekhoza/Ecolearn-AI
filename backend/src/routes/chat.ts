import { Router } from 'express';
import { sendMessage, getHistory, getSessions } from '../controllers/chat';
import { protect } from '../middleware/auth';

const router = Router();

router.get('/sessions', protect, getSessions);
router.post('/send', protect, sendMessage);
router.get('/history/:sessionId', protect, getHistory);

export default router;