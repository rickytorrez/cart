import express from 'express';
import { authUser, getUserProfile } from '../controllers/userController.js';

import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', authUser);
/**
 * to implement middleware, place it as an argument on the request -> protect
 */
router.route('/profile').get(protect, getUserProfile);

export default router;
