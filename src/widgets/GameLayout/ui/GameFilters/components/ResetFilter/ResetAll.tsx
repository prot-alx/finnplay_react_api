import { useGamesStore } from "@/features/gamelist";
import styles from "./ResetAll.module.scss";

export function ResetAll() {
  const { resetFilters } = useGamesStore();

  return (
    <button className={styles.resetButton} onClick={resetFilters}>
      Reset
    </button>
  );
}
