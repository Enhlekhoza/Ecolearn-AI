import { Router } from 'express';
import { signup, login } from '../controllers/auth';
import { protect } from '../middleware/auth';
import { getProfile } from '../controllers/user';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', protect, getProfile);

export default router;