import { create } from "zustand";
import { loginUser, checkAuth, logoutUser } from "../api";

interface AuthState {
  isAuth: boolean;
  isLoading: boolean;
  error: string | string[] | null;
  isInitialized: boolean;
  login: (username: string, password: string) => Promise<void>;
  checkAuth: () => Promise<boolean>;
  logout: () => Promise<void>;
  setError: (error: string | string[] | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuth: false,
  isLoading: false,
  error: null,
  isInitialized: false,
  login: async (username: string, password: string) => {
    set({ isLoading: true, error: null });
    const response = await loginUser({ username, password });

    set({
      isAuth: !response.error,
      error: response.error?.message || null,
      isLoading: false,
    });

    if (response.error) {
      throw response.error;
    }
  },

  checkAuth: async () => {
    set({ isLoading: true, error: null });
    const response = await checkAuth();

    set({
      isAuth: !response.error,
      error: response.error?.message || null,
      isInitialized: true,
      isLoading: false,
    });

    return !response.error;
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    const response = await logoutUser();

    set({
      isAuth: false,
      error: response.error?.message || null,
      isInitialized: true,
      isLoading: false,
    });

    if (response.error) {
      throw response.error;
    }
  },

  setError: (error) => set({ error }),
}));
