import Theater from '../models/Theater.js';
import ErrorResponse from '../utils/errorResponse.js';

export const getTheaters = async (req, res, next) => {
  try {
    const theaters = await Theater.find().populate('shows');

    res.status(200).json({
      success: true,
      count: theaters.length,
      data: theaters
    });
  } catch (err) {
    next(err);
  }
};

export const getTheater = async (req, res, next) => {
  try {
    const theater = await Theater.findById(req.params.id).populate('shows');

    if (!theater) {
      return next(new ErrorResponse(`Theater not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
      success: true,
      data: theater
    });
  } catch (err) {
    next(err);
  }
};

export const getCities = async (req, res, next) => {
  try {
    const cities = await Theater.distinct('city');

    res.status(200).json({
      success: true,
      count: cities.length,
      data: cities
    });
  } catch (err) {
    next(err);
  }
}; 