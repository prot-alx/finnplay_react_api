import { ApiResponse, GameData, apiRequest } from "@/shared/api";

export async function fetchGames(): Promise<ApiResponse<GameData>> {
  return apiRequest<GameData>("/games");
}
