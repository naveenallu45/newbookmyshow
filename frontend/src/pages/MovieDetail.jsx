import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config.js';

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/movies/${id}`);
        setMovie(res.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching movie:', err);
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!movie) return <div className="text-center mt-10">Movie not found</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-96 object-cover"
            />
          </div>
          <div className="md:w-2/3 p-6">
            <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
            <p className="text-gray-600 mb-4">{movie.description}</p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <span className="font-semibold">Genre:</span> {movie.genre}
              </div>
              <div>
                <span className="font-semibold">Duration:</span> {movie.duration} minutes
              </div>
              <div>
                <span className="font-semibold">Language:</span> {movie.language}
              </div>
              <div>
                <span className="font-semibold">Rating:</span> {movie.rating}
              </div>
            </div>
            
            {movie.shows && movie.shows.length > 0 ? (
              <div>
                <h2 className="text-xl font-semibold mb-4">Available Shows</h2>
                <div className="grid gap-4">
                  {movie.shows.map((show) => (
                    <div key={show._id} className="border rounded p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold">{show.theater.name}</p>
                          <p className="text-gray-600">{show.theater.city}</p>
                          <p className="text-gray-600">
                            {new Date(show.time).toLocaleString()}
                          </p>
                        </div>
                        <Link
                          to={`/book/${show._id}`}
                          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                          Book Now
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-gray-600">No shows available for this movie.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;