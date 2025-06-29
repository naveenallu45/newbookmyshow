import express from 'express';
import { getShowDetails, createBooking, getMyBookings, getBooking } from '../controllers/bookingController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/my-bookings', protect, getMyBookings);
router.get('/booking/:id', protect, getBooking);
router.get('/:showId', protect, getShowDetails);
router.post('/', protect, createBooking);

export default router; 