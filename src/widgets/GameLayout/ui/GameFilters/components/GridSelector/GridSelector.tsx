import { GridColumns, useGrid } from "@/widgets/GameLayout/context";
import styles from "./GridSelector.module.scss";

const COLUMNS: GridColumns[] = [2, 3, 4];

export const GridSelector = () => {
  const { gridColumns, setGridColumns } = useGrid();

  const getFillWidth = () => {
    const totalSteps = COLUMNS.length;
    const currentStep = COLUMNS.indexOf(gridColumns);
    return `${(currentStep / (totalSteps - 1)) * 100}%`;
  };

  const isButtonFilled = (value: GridColumns) => {
    const currentIndex = COLUMNS.indexOf(gridColumns);
    const buttonIndex = COLUMNS.indexOf(value);
    return buttonIndex <= currentIndex;
  };

  return (
    <div className={styles.selector}>
      <div className={styles.title}>Column</div>
      <div
        className={styles.track}
        style={{ "--fill-width": getFillWidth() } as React.CSSProperties}
      >
        <div className={styles.fill} />
        <div className={styles.buttons}>
          {COLUMNS.map((columns) => (
            <button
              key={columns}
              onClick={() => setGridColumns(columns)}
              className={styles.button}
              data-active={gridColumns === columns}
              data-filled={isButtonFilled(columns)}
            >
              {columns}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
