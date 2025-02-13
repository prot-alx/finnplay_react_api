import { useAuthStore } from "@/features/auth";

export async function fetchGames() {
  const response = await fetch("http://localhost:3000/games", {
    credentials: "include",
  });

  if (response.status === 401) {
    useAuthStore.getState().logout();
    throw new Error("Auth required");
  }

  if (!response.ok) {
    throw new Error("Failed to fetch games");
  }

  return response.json();
}
