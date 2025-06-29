import { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config.js';

function AdminDashboard() {
  const [movie, setMovie] = useState({
    title: '',
    description: '',
    duration: '',
    genre: '',
    language: '',
    releaseDate: '',
    poster: '',
    rating: '',
  });
  const [theater, setTheater] = useState({
    name: '',
    location: '',
    city: '',
    seats: '',
  });
  const [show, setShow] = useState({
    movieId: '',
    theaterId: '',
    time: '',
    price: '',
  });
  const [error, setError] = useState('');

  const handleMovieSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${API_BASE_URL}/admin/movies`,
        { ...movie, genre: movie.genre.split(',').map((g) => g.trim()) },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      alert('Movie added successfully');
      setMovie({
        title: '',
        description: '',
        duration: '',
        genre: '',
        language: '',
        releaseDate: '',
        poster: '',
        rating: '',
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add movie');
    }
  };

  const handleTheaterSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${API_BASE_URL}/admin/theaters`,
        theater,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      alert('Theater added successfully');
      setTheater({
        name: '',
        location: '',
        city: '',
        seats: '',
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add theater');
    }
  };

  const handleShowSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${API_BASE_URL}/admin/shows`,
        show,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      alert('Show added successfully');
      setShow({
        movieId: '',
        theaterId: '',
        time: '',
        price: '',
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add show');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Admin Dashboard</h2>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add Movie Form */}
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h3 className="text-xl font-semibold mb-4 text-center text-blue-600">Add Movie</h3>
          <form onSubmit={handleMovieSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Title"
              value={movie.title}
              onChange={(e) => setMovie({ ...movie, title: e.target.value })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <textarea
              placeholder="Description"
              value={movie.description}
              onChange={(e) => setMovie({ ...movie, description: e.target.value })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              required
            />
            <input
              type="number"
              placeholder="Duration (minutes)"
              value={movie.duration}
              onChange={(e) => setMovie({ ...movie, duration: e.target.value })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              placeholder="Genre (comma-separated)"
              value={movie.genre}
              onChange={(e) => setMovie({ ...movie, genre: e.target.value })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              placeholder="Language"
              value={movie.language}
              onChange={(e) => setMovie({ ...movie, language: e.target.value })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              placeholder="Release Date (YYYY-MM-DD)"
              value={movie.releaseDate}
              onChange={(e) => setMovie({ ...movie, releaseDate: e.target.value })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              placeholder="Poster URL"
              value={movie.poster}
              onChange={(e) => setMovie({ ...movie, poster: e.target.value })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="number"
              placeholder="Rating (0-10)"
              value={movie.rating}
              onChange={(e) => setMovie({ ...movie, rating: e.target.value })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              max="10"
              step="0.1"
              required
            />
            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors"
            >
              Add Movie
            </button>
          </form>
        </div>

        {/* Add Theater Form */}
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h3 className="text-xl font-semibold mb-4 text-center text-green-600">Add Theater</h3>
          <form onSubmit={handleTheaterSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Name"
              value={theater.name}
              onChange={(e) => setTheater({ ...theater, name: e.target.value })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <input
              type="text"
              placeholder="Location"
              value={theater.location}
              onChange={(e) => setTheater({ ...theater, location: e.target.value })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <input
              type="text"
              placeholder="City"
              value={theater.city}
              onChange={(e) => setTheater({ ...theater, city: e.target.value })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <input
              type="number"
              placeholder="Total Seats"
              value={theater.seats}
              onChange={(e) => setTheater({ ...theater, seats: e.target.value })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              min="1"
              required
            />
            <button 
              type="submit" 
              className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition-colors"
            >
              Add Theater
            </button>
          </form>
        </div>

        {/* Add Show Form */}
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h3 className="text-xl font-semibold mb-4 text-center text-purple-600">Add Show</h3>
          <form onSubmit={handleShowSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Movie ID"
              value={show.movieId}
              onChange={(e) => setShow({ ...show, movieId: e.target.value })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <input
              type="text"
              placeholder="Theater ID"
              value={show.theaterId}
              onChange={(e) => setShow({ ...show, theaterId: e.target.value })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <input
              type="text"
              placeholder="Show Time (YYYY-MM-DD HH:MM)"
              value={show.time}
              onChange={(e) => setShow({ ...show, time: e.target.value })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={show.price}
              onChange={(e) => setShow({ ...show, price: e.target.value })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              min="0"
              step="0.01"
              required
            />
            <button 
              type="submit" 
              className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700 transition-colors"
            >
              Add Show
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
