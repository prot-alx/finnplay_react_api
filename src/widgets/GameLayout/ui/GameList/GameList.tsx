import { useGamesStore } from "@/features/gamelist";
import { GameCard } from "./GameCard";
import styles from "./GameList.module.scss";
import { useGrid } from "../../context";

export function GameList() {
  const filteredGames = useGamesStore(state => state.filteredGames);
  const isLoading = useGamesStore(state => state.isLoading);
  const error = useGamesStore(state => state.error);
  const { gridColumns } = useGrid();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.list} data-columns={gridColumns}>
      {filteredGames.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}
