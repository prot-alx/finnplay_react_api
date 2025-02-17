const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";
// базовая функция для запросов
export async function apiRequest(url: string, options: RequestInit = {}) {
  console.log(BASE_URL)
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
