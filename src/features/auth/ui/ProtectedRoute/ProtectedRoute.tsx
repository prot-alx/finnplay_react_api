import { useEffect } from "react";
import { Navigate, useLocation } from "react-router";
import { useAuthStore } from "@/features/auth/model/store";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: Readonly<ProtectedRouteProps>) {
  const location = useLocation();
  const { isAuth, isLoading, checkAuth } = useAuthStore();

  useEffect(() => {
    const verifyAuth = async () => {
      await checkAuth();
    };
    verifyAuth();
  }, [location.pathname]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
