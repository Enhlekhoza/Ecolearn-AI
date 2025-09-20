import { Router } from 'express';
import { getBadges, getUserBadges } from '../controllers/badges';

const router = Router();

router.get('/', getBadges);
router.get('/user/:id', getUserBadges);

export default router;
