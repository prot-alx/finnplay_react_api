import { BrowserRouter } from "react-router";
import { useEffect } from "react";
import { AppRouter } from "./router";
import { useAuthStore } from "@/features/auth";

export function App() {
  const { checkAuth, isInitialized, isLoading } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (!isInitialized || isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}
