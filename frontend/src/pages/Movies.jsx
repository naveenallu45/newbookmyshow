import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config.js';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const url = city
          ? `${API_BASE_URL}/movies/city/${city}`
          : `${API_BASE_URL}/movies`;
        const res = await axios.get(url);
        setMovies(res.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching movies:', err);
        setLoading(false);
      }
    };

    fetchMovies();
  }, [city]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Movies</h1>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-2 border rounded"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <div key={movie._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{movie.title}</h3>
              <p className="text-gray-600 mb-2">{movie.genre}</p>
              <p className="text-gray-600 mb-4">{movie.duration} minutes</p>
              <Link
                to={`/movies/${movie._id}`}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Movies;