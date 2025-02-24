import { ApiResponse } from ".";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";
// базовая функция для запросов
export async function apiRequest<T>(
  url: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    // пробуем получить тело ответа, если оно есть
    let data;
    try {
      data = await response.json();
    } catch {
      data = null;
    }

    // если не успех - формируем ошибку
    if (!response.ok) {
      return {
        data: null,
        error: {
          message: data?.message || response.statusText || "Server error",
          statusCode: response.status,
        },
      };
    }

    // успешный ответ
    return {
      data: data || (true as T),
      error: null,
    };
  } catch {
    // любые ошибки сети
    return {
      data: null,
      error: {
        message: "Server is not available",
        statusCode: 503,
      },
    };
  }
}
