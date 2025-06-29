import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config.js';

function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_BASE_URL}/admin/bookings`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookings(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch bookings');
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">All Bookings (Admin)</h1>
      {bookings.length === 0 ? (
        <p className="text-gray-600">No bookings found.</p>
      ) : (
        <div className="grid gap-4">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold">{booking.show?.movie?.title || 'Movie Title Not Available'}</h3>
                <span className={`px-2 py-1 rounded text-sm ${
                  booking.paymentStatus === 'completed' ? 'bg-green-100 text-green-800' :
                  booking.paymentStatus === 'failed' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {booking.paymentStatus || 'pending'}
                </span>
              </div>
              <p className="text-gray-600">User: {booking.user?.name || 'Unknown'} ({booking.user?.email || 'No email'})</p>
              <p className="text-gray-600">Theater: {booking.show?.theater?.name || 'Theater Not Available'}</p>
              <p className="text-gray-600">Show Time: {booking.show?.time ? new Date(booking.show.time).toLocaleString() : 'Time Not Available'}</p>
              <p className="text-gray-600">Seats: {booking.seats.join(', ')}</p>
              <p className="text-gray-600">Total Amount: ₹{booking.totalAmount}</p>
              <p className="text-gray-600">Booking Date: {new Date(booking.bookingDate).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminBookings; 