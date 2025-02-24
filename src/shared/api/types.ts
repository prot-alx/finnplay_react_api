import { Game, Group, Provider } from "@/entities";

export interface GameData {
  games: Game[];
  providers: Provider[];
  groups: Group[];
}

export interface ApiError {
  message: string | string[];
  error?: string;
  statusCode: number;
}

export type ApiResponse<T> =
  | {
      data: T;
      error: null;
    }
  | {
      data: null;
      error: ApiError;
    };
