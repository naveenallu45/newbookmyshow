import Show from '../models/Show.js';
import Booking from '../models/Booking.js';
import User from '../models/User.js';
import ErrorResponse from '../utils/errorResponse.js';

export const getShowDetails = async (req, res, next) => {
  try {
    const show = await Show.findById(req.params.showId)
      .populate('movie')
      .populate('theater');

    if (!show) {
      return next(new ErrorResponse('Show not found', 404));
    }

    res.status(200).json({
      success: true,
      data: show
    });
  } catch (err) {
    next(err);
  }
};

export const createBooking = async (req, res, next) => {
  try {
    const { showId, seats, totalAmount } = req.body;

    const show = await Show.findById(showId);

    if (!show) {
      return next(new ErrorResponse('Show not found', 404));
    }

    if (seats > show.availableSeats) {
      return next(new ErrorResponse('Not enough seats available', 400));
    }

    const booking = await Booking.create({
      user: req.user.id,
      show: showId,
      seats,
      totalAmount,
      paymentStatus: 'completed',
      bookingDate: new Date()
    });

    show.availableSeats -= seats;
    await show.save();

    const user = await User.findById(req.user.id);
    user.bookings.push(booking._id);
    await user.save();

    res.status(201).json({
      success: true,
      data: booking
    });
  } catch (err) {
    next(err);
  }
};

export const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
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

export const getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate({
        path: 'show',
        populate: [
          { path: 'movie' },
          { path: 'theater' }
        ]
      });

    if (!booking) {
      return next(new ErrorResponse('Booking not found', 404));
    }

    if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new ErrorResponse('Not authorized to access this booking', 401));
    }

    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (err) {
    next(err);
  }
}; 