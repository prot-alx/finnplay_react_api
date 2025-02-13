import { useAuthStore } from "@/features/auth";

interface LoginCredentials {
  username: string;
  password: string;
}
interface ErrorResponse {
  message: string | string[];
  error?: string;
  statusCode: number;
}

const BASE_URL = "http://localhost:3000";

export async function loginUser(credentials: LoginCredentials) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData: ErrorResponse = await response.json();
    throw errorData;
  }

  return true;
}

export async function checkAuth() {
  try {
    const response = await fetch(`${BASE_URL}/auth/check`, {
      credentials: "include",
    });
    return response.ok;
  } catch {
    return false;
  }
}

export async function authorizedFetch(url: string, options: RequestInit = {}) {
  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    credentials: "include",
  });

  if (response.status === 401) {
    useAuthStore.getState().logout();
    throw new Error("Сессия истекла. Пожалуйста, войдите снова");
  }

  return response;
}

export async function logoutUser() {
  const response = await fetch(`${BASE_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    const errorData: ErrorResponse = await response.json();
    throw errorData;
  }
}
