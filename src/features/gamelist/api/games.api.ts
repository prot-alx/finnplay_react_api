import { GameData, apiRequest } from "@/shared/api";

export async function fetchGames(): Promise<GameData> {
  const response = await apiRequest("/games");
  if (!response.ok) {
    throw new Error("Failed to fetch games");
  }
  return response.json();
}
