import { useGamesStore } from "@/features/gamelist";
import styles from "./GamesAmount.module.scss";

export const GamesAmount = () => {
  const count = useGamesStore((state) => state.filteredGames().length);

  return <div className={styles.amount}>Games amount: {count}</div>;
};
