import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const token = Cookies.get('token');
  
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};