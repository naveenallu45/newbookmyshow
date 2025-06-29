import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function ProtectedRoute({ element, adminOnly = false }) {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  if (!user) return <Navigate to="/login" />;

  if (adminOnly && user.role !== 'admin') return <Navigate to="/" />;

  return element;
}

export default ProtectedRoute;