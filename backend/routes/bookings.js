import express from 'express';
import { getShowDetails, createBooking, getMyBookings, getBooking } from '../controllers/bookingController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/:showId', protect, getShowDetails);
router.get('/my-bookings', protect, getMyBookings);
router.post('/', protect, createBooking);
router.get('/booking/:id', protect, getBooking);

export default router; 