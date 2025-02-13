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
  const response = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData: ErrorResponse = await response.json();
    throw errorData;
  }

  return true;
}
