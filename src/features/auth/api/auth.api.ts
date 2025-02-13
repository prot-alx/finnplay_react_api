import { apiRequest } from "@/shared/api";

interface LoginCredentials {
  username: string;
  password: string;
}

interface ErrorResponse {
  message: string | string[];
  error?: string;
  statusCode: number;
}

export async function loginUser(credentials: LoginCredentials) {
  const response = await apiRequest("/auth/login", {
    method: "POST",
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
    const response = await apiRequest("/auth/check");
    return response.ok;
  } catch {
    return false;
  }
}

export async function logoutUser() {
  const response = await apiRequest("/auth/logout", {
    method: "POST",
  });
  if (!response.ok) {
    const errorData: ErrorResponse = await response.json();
    throw errorData;
  }
}
