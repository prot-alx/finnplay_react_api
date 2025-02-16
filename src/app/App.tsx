import { useEffect } from "react";
import { BrowserRouter } from "react-router";
import { AppRouter } from "./router";
import { useAuthStore } from "@/features/auth";
import styles from "./App.module.scss";

export function App() {
  const { checkAuth, isInitialized } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <div className={styles.appContainer}>
        <AppRouter />
      </div>
    </BrowserRouter>
  );
}
