
import { Router } from 'express';
import { calculate, getFootprint } from '../controllers/calculator';
import { protect } from '../middleware/auth';

const router = Router();

router.post('/calculate', protect, calculate);
router.get('/footprint', protect, getFootprint);

export default router;
