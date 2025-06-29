import express from 'express';
import { getTheaters, getTheater, getCities } from '../controllers/theaterController.js';

const router = express.Router();

router.get('/', getTheaters);
router.get('/:id', getTheater);
router.get('/cities', getCities);

export default router; 