import { useGamesStore } from "@/features/gamelist";
import styles from "./ResetAll.module.scss";
import { useGrid } from "@/widgets/GameLayout/context";

export function ResetAll() {
  const { resetFilters } = useGamesStore();
  const { setGridColumns } = useGrid();

  const handleReset = () => {
    resetFilters();
    setGridColumns(4);
  }

  return (
    <button className={styles.resetButton} onClick={handleReset}>
      Reset
    </button>
  );
}
