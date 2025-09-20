import { Router } from 'express';
import { getTip, getTips, saveTip, completeTip } from '../controllers/tips';
import { protect } from '../middleware/auth';

const router = Router();

router.get('/', getTips);
router.get('/random', getTip);
router.post('/', protect, saveTip);
router.post('/:id/complete', protect, completeTip);

export default router;
