import { useEffect } from "react";
import { Navigate, useLocation } from "react-router";
import { useAuthStore } from "@/features/auth/model/store";
import { Loader } from "@/shared/ui";

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
    return <Loader size="large" global />;
  }

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
