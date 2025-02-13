import { useGamesStore } from "@/features/gamelist/model/store";

import styles from "./GameList.module.scss";
import { GameCard } from "./GameCard";

export function GameList() {
  const { games, filters, getGamesByGroup, isLoading, error } = useGamesStore();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const displayedGames = filters.groupId
    ? getGamesByGroup(filters.groupId)
    : games;

  return (
    <div className={styles.list}>
      {displayedGames.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}
