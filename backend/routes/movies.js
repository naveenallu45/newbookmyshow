import express from 'express';
import { getMovies, getMovie, getMoviesByCity } from '../controllers/movieController.js';

const router = express.Router();

router.get('/', getMovies);
router.get('/:id', getMovie);
router.get('/city/:city', getMoviesByCity);

export default router; 