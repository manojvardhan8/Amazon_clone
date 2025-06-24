// backend/routes/cartRoutes.js
import express from 'express';
const router = express.Router();
import { getCart, addItemToCart } from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';

// All these routes are protected
router.route('/').get(protect, getCart).post(protect, addItemToCart);

export default router;