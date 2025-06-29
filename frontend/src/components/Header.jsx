import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          BookMyShow
        </Link>
        <nav className="flex space-x-4">
          <Link to="/movies" className="hover:underline">
            Movies
          </Link>
          {user ? (
            <>
              <Link to="/my-bookings" className="hover:underline">
                My Bookings
              </Link>
              {user.role === 'admin' && (
                <>
                  <Link to="/admin" className="hover:underline">
                    Admin Dashboard
                  </Link>
                  <Link to="/admin/bookings" className="hover:underline">
                    All Bookings
                  </Link>
                </>
              )}
              <button onClick={handleLogout} className="hover:underline">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/register" className="hover:underline">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
