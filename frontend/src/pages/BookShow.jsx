import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config.js';

function BookShow() {
  const { showId } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchShow = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/bookings/show/${showId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setShow(res.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch show details');
        setLoading(false);
      }
    };

    fetchShow();
  }, [showId]);

  const handleSeatClick = (seatNumber) => {
    setSelectedSeats(prev => 
      prev.includes(seatNumber)
        ? prev.filter(seat => seat !== seatNumber)
        : [...prev, seatNumber]
    );
  };

  const handleBooking = async () => {
    if (selectedSeats.length === 0) {
      setError('Please select at least one seat');
      return;
    }

    setBookingLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await axios.post(
        `${API_BASE_URL}/bookings`,
        {
          showId,
          seats: selectedSeats
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );
      setSuccess('Booking successful! Redirecting to your bookings...');
      setTimeout(() => {
        navigate('/my-bookings');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;
  if (!show) return <div className="text-center mt-10">Show not found</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Book Show</h1>
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">{show.movie.title}</h2>
        <p className="text-gray-600 mb-2">Theater: {show.theater.name}</p>
        <p className="text-gray-600 mb-4">Time: {new Date(show.time).toLocaleString()}</p>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Select Seats</h3>
          <div className="grid grid-cols-10 gap-2">
            {Array.from({ length: 50 }, (_, i) => {
              const seatNumber = i + 1;
              const isBooked = show.bookedSeats.includes(seatNumber);
              const isSelected = selectedSeats.includes(seatNumber);
              
              return (
                <button
                  key={seatNumber}
                  onClick={() => !isBooked && handleSeatClick(seatNumber)}
                  disabled={isBooked}
                  className={`p-2 text-sm rounded ${
                    isBooked
                      ? 'bg-red-500 text-white cursor-not-allowed'
                      : isSelected
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {seatNumber}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mb-6">
          <p className="text-lg">Selected Seats: {selectedSeats.join(', ') || 'None'}</p>
          <p className="text-lg">Total Amount: ₹{selectedSeats.length * show.price}</p>
        </div>

        <button
          onClick={handleBooking}
          disabled={selectedSeats.length === 0 || bookingLoading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {bookingLoading ? 'Processing...' : 'Book Now'}
        </button>
      </div>
    </div>
  );
}

export default BookShow;
