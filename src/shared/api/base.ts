const BASE_URL = "http://localhost:3000";
// базовая функция для запросов
export async function apiRequest(url: string, options: RequestInit = {}) {
  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  return response;
}
