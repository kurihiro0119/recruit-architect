import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useUserAuth } from '../contexts/UserAuthContext';

interface UserProtectedRouteProps {
  children: ReactNode;
}

export function UserProtectedRoute({ children }: UserProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useUserAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">読み込み中...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

