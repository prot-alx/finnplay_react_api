import { apiRequest } from "@/shared/api";

interface LoginCredentials {
  username: string;
  password: string;
}

export async function loginUser(credentials: LoginCredentials) {
  return apiRequest<boolean>("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export async function checkAuth() {
  return apiRequest<boolean>("/auth/check");
}

export async function logoutUser() {
  return apiRequest<boolean>("/auth/logout", {
    method: "POST",
  });
}