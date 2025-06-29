import { Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';
import Header from './components/Header.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Movies from './pages/Movies.jsx';
import MovieDetail from './pages/MovieDetail.jsx';
import BookShow from './pages/BookShow.jsx';
import MyBookings from './pages/MyBookings.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import AdminBookings from './pages/AdminBookings.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

function App() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> 
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieDetail />} />
        <Route path="/book/:showId" element={<ProtectedRoute element={<BookShow />} />} />
        <Route path="/my-bookings" element={<ProtectedRoute element={<MyBookings />} />} />
        <Route path="/admin" element={<ProtectedRoute element={<AdminDashboard />} adminOnly={true} />} />
        <Route path="/admin/bookings" element={<ProtectedRoute element={<AdminBookings />} adminOnly={true} />} />
      </Routes>
    </div>
  );
}

export default App;