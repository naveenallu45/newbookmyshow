import express from 'express';
import { addMovie, addTheater, addShow, getAllBookings } from '../controllers/adminController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

router.post('/movies', addMovie);
router.post('/theaters', addTheater);
router.post('/shows', addShow);
router.get('/bookings', getAllBookings);

export default router; 