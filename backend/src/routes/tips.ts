import { Router } from 'express';
import { getTip, getTips, saveTip } from '../controllers/tips';
import { protect } from '../middleware/auth';

const router = Router();

router.get('/', getTips);
router.get('/random', getTip);
router.post('/', protect, saveTip);

export default router;