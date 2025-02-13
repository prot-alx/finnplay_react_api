import { Routes, Route, Navigate } from "react-router";
import { LoginPage, GamesPage, NotFoundPage } from "@/pages";
import { useAuthStore } from "@/features/auth";

export function AppRouter() {
  const { isAuth, isLoading } = useAuthStore();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuth ? <Navigate to="/games" replace /> : <LoginPage />}
      />

      <Route
        path="/games"
        element={isAuth ? <GamesPage /> : <Navigate to="/login" replace />}
      />

      <Route
        path="/"
        element={<Navigate to={isAuth ? "/games" : "/login"} replace />}
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
