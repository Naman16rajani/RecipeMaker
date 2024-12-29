import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = Cookies.get('token');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};