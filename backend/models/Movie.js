import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please enter movie title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please enter movie description']
  },
  duration: {
    type: Number,
    required: [true, 'Please enter movie duration in minutes']
  },
  genre: {
    type: [String],
    required: [true, 'Please enter at least one genre']
  },
  language: {
    type: String,
    required: [true, 'Please enter movie language']
  },
  releaseDate: {
    type: Date,
    required: [true, 'Please enter release date']
  },
  poster: {
    type: String,
    required: [true, 'Please add poster URL']
  },
  rating: {
    type: Number,
    min: 0,
    max: 10
  },
  shows: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Show'
  }]
}, { timestamps: true });

export default mongoose.model('Movie', movieSchema);