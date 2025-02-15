import { GridColumns, useGrid } from "@/widgets/GameLayout/context";
import styles from "./ColumnSelector.module.scss";

const COLUMNS: GridColumns[] = [2, 3, 4];

export const ColumnSelector = () => {
  const { gridColumns, setGridColumns } = useGrid();
  
  const getFillWidth = () => {
    if (gridColumns === 2) return "0%";
    if (gridColumns === 3) return "50%";
    return "100%";
  };

  return (
    <div className={styles.selector}>
      <div className={styles.title}>Column</div>
      <div className={styles.track}>
        <div 
          className={styles.fill} 
          style={{ width: getFillWidth() }} 
        />
        {COLUMNS.map((value) => (
          <button
            key={value}
            onClick={() => setGridColumns(value)}
            className={styles.button}
            data-active={value <= gridColumns}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
};
