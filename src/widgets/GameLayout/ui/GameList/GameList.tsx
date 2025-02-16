import { useGamesStore } from "@/features/gamelist";
import { useGrid } from "../../context";
import { Loader } from "@/shared/ui";
import { GameCard } from "./GameCard";
import styles from "./GameList.module.scss";

export function GameList() {
  const filteredGames = useGamesStore((state) => state.filteredGames);
  const isLoading = useGamesStore((state) => state.isLoading);
  const error = useGamesStore((state) => state.error);
  const { gridColumns } = useGrid();

  if (isLoading) return <Loader size="large" global />;

  if (error) {
    return (
      <div className={styles.error}>
        <p>Failed to load games</p>
        <p className={styles.errorDetails}>{error}</p>
      </div>
    );
  }

  if (filteredGames.length === 0) {
    return <div className={styles.empty}>No games found</div>;
  }

  return (
    <div className={styles.list} data-columns={gridColumns}>
      {filteredGames.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}
