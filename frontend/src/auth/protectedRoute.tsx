import { Navigate } from 'react-router-dom';
import { useAuth } from './authContext';

export default function ProtectedRoute({ children }: any) {
  const { auth } = useAuth();

  if (!auth.token) {
    return <Navigate to="/login" />;
  }

  return children;
}
