import { Router } from 'express';
import { sendMessage, getHistory, getSessions } from '../controllers/chat';
// import { protect } from '../middleware/auth'; // Comment out or remove protect import

const router = Router();

router.get('/sessions', getSessions);
router.post('/send', sendMessage);
router.get('/history/:sessionId', getHistory);

export default router;