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
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuth: false,
  isLoading: false,
  error: null,
  isInitialized: false,
  login: async (username: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      await loginUser({ username, password });
      set({ isAuth: true, error: null });
      console.log("Auth state after login:", { isAuth: true });
    } catch (err) {
      set({ error: err.message, isAuth: false });
    } finally {
      set({ isLoading: false });
    }
  },

  checkAuth: async () => {
    set({ isLoading: true, error: null });
    try {
      const isAuthenticated = await checkAuth();
      set({ isAuth: isAuthenticated, isInitialized: true });
      return isAuthenticated;
    } catch {
      set({ isAuth: false, isInitialized: true });
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await logoutUser();
      set({ isAuth: false, error: null, isInitialized: true });
    } catch (err) {
      set({ error: err.message });
      return err;
    } finally {
      set({ isLoading: false });
    }
  },
}));
