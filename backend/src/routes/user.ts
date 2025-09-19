
import { Router } from 'express';
import { getProfile } from '../controllers/user';
import { protect } from '../middleware/auth';

const router = Router();

router.get('/profile', protect, getProfile);

export default router;
