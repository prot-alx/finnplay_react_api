import { useAuthStore } from "@/features/auth/model/store";

const BASE_URL = "http://localhost:3000";
// не стал подключать axios, сделаем кастомный "интерцептор", проверяющий авторизован ли пользователь
export async function apiRequest(url: string, options: RequestInit = {}) {
  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (response.status === 401) {
    useAuthStore.getState().logout();
    throw new Error("Session expired. Log in again.");
  }

  return response;
}
