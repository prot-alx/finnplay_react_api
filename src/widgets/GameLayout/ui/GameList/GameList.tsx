import { useGamesStore } from "@/features/gamelist";
import { GameCard } from "./GameCard";
import styles from "./GameList.module.scss";
import { useGrid } from "../../context";

export function GameList() {
  const { filteredGames, isLoading, error } = useGamesStore();
  const { gridColumns } = useGrid();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const games = filteredGames();

  return (
    <div className={styles.list} data-columns={gridColumns}>
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}
