import Movie from '../models/Movie.js';
import Theater from '../models/Theater.js';
import Show from '../models/Show.js';
import Booking from '../models/Booking.js';
import ErrorResponse from '../utils/errorResponse.js';

export const addMovie = async (req, res, next) => {
  try {
    const movieData = { ...req.body };
    
    if (movieData.releaseDate) {
      if (movieData.releaseDate.includes('/')) {
        const [day, month, year] = movieData.releaseDate.split('/');
        movieData.releaseDate = new Date(year, month - 1, day);
      } else {
        movieData.releaseDate = new Date(movieData.releaseDate);
      }
    }

    const movie = await Movie.create(movieData);

    res.status(201).json({
      success: true,
      data: movie
    });
  } catch (err) {
    next(err);
  }
};

export const addTheater = async (req, res, next) => {
  try {
    const theater = await Theater.create(req.body);

    res.status(201).json({
      success: true,
      data: theater
    });
  } catch (err) {
    next(err);
  }
};

export const addShow = async (req, res, next) => {
  try {
    const { movieId, theaterId, time, price } = req.body;

    const movie = await Movie.findById(movieId);
    const theater = await Theater.findById(theaterId);

    if (!movie || !theater) {
      return next(new ErrorResponse('Movie or theater not found', 404));
    }

    let showTime;
    if (time) {
      if (time.includes('/')) {
        const [datePart, timePart] = time.split(' ');
        const [day, month, year] = datePart.split('/');
        const [hours, minutes] = timePart.split(':');
        showTime = new Date(year, month - 1, day, hours, minutes);
      } else {
        showTime = new Date(time);
      }
    }

    const show = await Show.create({
      movie: movieId,
      theater: theaterId,
      time: showTime,
      price,
      availableSeats: theater.seats
    });

    movie.shows.push(show._id);
    theater.shows.push(show._id);
    await movie.save();
    await theater.save();

    res.status(201).json({
      success: true,
      data: show
    });
  } catch (err) {
    next(err);
  }
};

export const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email')
      .populate({
        path: 'show',
        populate: [
          { path: 'movie' },
          { path: 'theater' }
        ]
      });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (err) {
    next(err);
  }
}; 