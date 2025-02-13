import { GroupFilter } from "./components/GroupFilter/GroupFilter";
import styles from "./GameFilters.module.scss";

export function GameFilters() {
  return (
    <div className={styles.filters}>
      <GroupFilter />
      {/* для остальных фильтров */}
    </div>
  );
}