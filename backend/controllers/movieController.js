import Movie from '../models/Movie.js';
import ErrorResponse from '../utils/errorResponse.js';

export const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find().populate('shows');

    res.status(200).json({
      success: true,
      count: movies.length,
      data: movies
    });
  } catch (err) {
    next(err);
  }
};

export const getMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id).populate('shows');

    if (!movie) {
      return next(new ErrorResponse(`Movie not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
      success: true,
      data: movie
    });
  } catch (err) {
    next(err);
  }
};

export const getMoviesByCity = async (req, res, next) => {
  try {
    const movies = await Movie.find().populate({
      path: 'shows',
      populate: {
        path: 'theater',
        match: { city: req.params.city }
      }
    });

    const filteredMovies = movies
      .filter(movie => movie.shows.some(show => show.theater !== null))
      .map(movie => ({
        ...movie._doc,
        shows: movie.shows.filter(show => show.theater !== null)
      }));

    res.status(200).json({
      success: true,
      count: filteredMovies.length,
      data: filteredMovies
    });
  } catch (err) {
    next(err);
  }
}; 