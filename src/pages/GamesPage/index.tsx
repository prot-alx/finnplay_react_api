import { useEffect } from "react";
import { useGamesStore } from "@/features/gamelist";
import { GameLayout } from "@/widgets/GameLayout";

export function GamesPage() {
  const { fetchGameData } = useGamesStore();

  useEffect(() => {
    fetchGameData();
  }, [fetchGameData]);

  return <GameLayout />;
}
