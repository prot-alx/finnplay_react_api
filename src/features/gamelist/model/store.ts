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
  filteredGames: Game[];
  isLoading: boolean;
  error: string[] | string;
  sort: SortType;
  filters: Filters;
  fetchGameData: () => Promise<void>;
  setFilters: (updates: Partial<Filters>) => void;
  resetFilters: () => void;
  setSort: (type: SortType) => void;
  updateFilteredGames: () => void;
}

export const useGamesStore = create<GamesState>((set, get) => ({
  games: [],
  providers: [],
  groups: [],
  filteredGames: [],
  isLoading: false,
  error: null,
  sort: null,
  filters: {
    groupIds: [],
    providerIds: [],
    searchQuery: "",
  },

  async fetchGameData() {
    set({ isLoading: true, error: null });
    const response = await fetchGames();

    if (response.error) {
      set({ error: response.error.message });
      return;
    }

    set({
      games: response.data.games,
      providers: response.data.providers,
      groups: response.data.groups,
    });

    get().updateFilteredGames();
    set({ isLoading: false });
  },

  updateFilteredGames() {
    const { games, filters, groups, sort } = get();

    // Set со всеми ID игр, которые есть хотя бы в одной группе
    const allGroupGamesSet = new Set<number>();
    groups.forEach((group) => {
      group.games.forEach((gameId) => allGroupGamesSet.add(gameId));
    });

    // Set для фильтрации по выбранным группам
    const selectedGroupGamesSet = new Set<number>();
    if (filters.groupIds.length) {
      filters.groupIds.forEach((groupId) => {
        const group = groups.find((g) => g.id === groupId);
        if (group) {
          group.games.forEach((gameId) => selectedGroupGamesSet.add(gameId));
        }
      });
    }

    let filtered = games.filter((game) => {
      // проверяем, входит ли игра хоть в какую-то группу
      if (!allGroupGamesSet.has(game.id)) {
        return false;
      }

      // фильтр по провайдерам
      if (
        filters.providerIds.length &&
        !filters.providerIds.includes(game.provider)
      ) {
        return false;
      }

      // фильтр по выбранным группам
      if (filters.groupIds.length && !selectedGroupGamesSet.has(game.id)) {
        return false;
      }

      // поисковый фильтр
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
        if (sort === "a-z") {
          return a.name.localeCompare(b.name);
        }
        if (sort === "z-a") {
          return b.name.localeCompare(a.name);
        }
        if (sort === "newest") {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        return null;
      });
    }

    set({ filteredGames: filtered });
  },

  setFilters(updates) {
    set((state) => ({
      filters: { ...state.filters, ...updates },
    }));
    get().updateFilteredGames();
  },

  resetFilters() {
    set({
      filters: { groupIds: [], providerIds: [], searchQuery: "" },
      sort: null,
    });
    get().updateFilteredGames();
  },

  setSort(type) {
    set({ sort: type });
    get().updateFilteredGames();
  },
}));
