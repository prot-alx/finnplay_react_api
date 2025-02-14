import { create } from "zustand";
import { Game, Group, Provider } from "@/entities";
import { fetchGames } from "../api";

interface Filters {
  groupIds: number[];
  providerIds: number[];
  searchQuery: string;
}

type SortType = "a-z" | "z-a" | "newest" | null;

interface GamesState {
  games: Game[];
  providers: Provider[];
  groups: Group[];
  isLoading: boolean;
  error: string | null;

  fetchGameData: () => Promise<void>;

  filters: Filters;
  setFilters: (updates: Partial<Filters>) => void;
  resetFilters: () => void;

  sort: SortType;
  setSort: (type: SortType) => void;

  filteredGames: () => Game[];
}

export const useGamesStore = create<GamesState>((set, get) => ({
  games: [],
  providers: [],
  groups: [],
  isLoading: false,
  error: null,
  sort: null,

  async fetchGameData() {
    set({ isLoading: true, error: null });
    try {
      const data = await fetchGames();
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

  filters: {
    groupIds: [],
    providerIds: [],
    searchQuery: "",
  },

  setFilters(updates) {
    set((state) => ({
      filters: { ...state.filters, ...updates },
    }));
  },

  resetFilters() {
    set({ filters: { groupIds: [], providerIds: [], searchQuery: "" } });
  },

  setSort(type) {
    set({ sort: type });
  },

  filteredGames() {
    const { games, filters, groups, sort } = get();

    const groupMap = new Map(groups.map((group) => [group.id, group.games]));
    const groupGamesSet = new Set<number>();

    if (filters.groupIds.length) {
      filters.groupIds.forEach((groupId) => {
        const gameIds = groupMap.get(groupId);
        if (gameIds) {
          gameIds.forEach((gameId) => groupGamesSet.add(gameId));
        }
      });
    }

    let filtered = games.filter((game) => {
      if (
        filters.providerIds.length &&
        !filters.providerIds.includes(game.provider)
      ) {
        return false;
      }
      if (filters.groupIds.length && !groupGamesSet.has(game.id)) {
        return false;
      }
      if (
        filters.searchQuery &&
        !game.name.toLowerCase().includes(filters.searchQuery.toLowerCase())
      ) {
        return false;
      }
      return true;
    });

    if (sort) {
      filtered = filtered.sort((a, b) => {
        if (sort === "a-z") return a.name.localeCompare(b.name);
        if (sort === "z-a") return b.name.localeCompare(a.name);
        if (sort === "newest")
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        return 0;
      });
    }

    return filtered;
  },
}));
