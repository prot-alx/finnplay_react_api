import { Routes, Route, Navigate } from "react-router";
import { GamesPage } from "@/pages/GamesPage/GamesPage";
import { LoginPage } from "@/pages/LoginPage/LoginPage";
import { NotFoundPage } from "@/pages/NotFoundPage/NotFoundPage";

export function AppRouter() {
  const isAuth = false;

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
