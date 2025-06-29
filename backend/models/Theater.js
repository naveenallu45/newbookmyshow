import mongoose from 'mongoose';

const theaterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter theater name'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Please enter theater location']
  },
  city: {
    type: String,
    required: [true, 'Please enter city']
  },
  seats: {
    type: Number,
    required: [true, 'Please enter total seats']
  },
  shows: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Show'
  }]
}, { timestamps: true });

export default mongoose.model('Theater', theaterSchema);