import { create } from "zustand";
import { GameData } from "@/shared/api";
import { Game, Group, Provider } from "@/entities";

interface Filters {
  groupId: number | null;
  providerId: number | null;
}

interface GamesState {
  games: Game[];
  providers: Provider[];
  groups: Group[];
  isLoading: boolean;
  error: string | null;

  // Действия
  fetchGameData: () => Promise<void>;
  // Селекторы
  getGamesByProvider: (providerId: number) => Game[];
  getGamesByGroup: (groupId: number) => Game[];
  getProviderById: (providerId: number) => Provider | undefined;
  // Фильтры
  filters: Filters;
  setFilter: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
  resetFilters: () => void;
}

export const useGamesStore = create<GamesState>((set, get) => ({
  games: [],
  providers: [],
  groups: [],
  isLoading: false,
  error: null,

  fetchGameData: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch("http://localhost:3000/games", {
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to fetch games data");

      const data: GameData = await response.json();
      set({
        games: data.games,
        providers: data.providers,
        groups: data.groups,
      });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Error fetching games",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  // Селекторы для получения связанных данных
  getGamesByProvider: (providerId: number) => {
    const { games } = get();
    return games.filter((game) => game.provider === providerId);
  },

  getGamesByGroup: (groupId: number) => {
    const { games, groups } = get();
    const group = groups.find((g) => g.id === groupId);
    if (!group) return [];
    return games.filter((game) => group.games.includes(game.id));
  },

  getProviderById: (providerId: number) => {
    const { providers } = get();
    return providers.find((provider) => provider.id === providerId);
  },

  filters: {
    groupId: null,
    providerId: null,
  },

  setFilter: (key, value) => {
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value,
      },
    }));
  },

  resetFilters: () => {
    set({ filters: { groupId: null, providerId: null } });
  },
}));
