import { useEffect } from "react";
import { BrowserRouter } from "react-router";
import { AppRouter } from "./router";
import { useAuthStore } from "@/features/auth";
import { Loader } from "@/shared/ui/Loader/Loader";
import styles from "./App.module.scss";

export function App() {
  const { checkAuth, isInitialized } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  if (!isInitialized) {
    return <Loader size="large" global />;
  }

  return (
    <BrowserRouter>
      <div className={styles.appContainer}>
        <AppRouter />
      </div>
    </BrowserRouter>
  );
}
