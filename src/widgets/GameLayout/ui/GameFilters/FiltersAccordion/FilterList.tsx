import {
  ProviderFilter,
  GroupFilter,
  SortFilter,
  GamesAmount,
  ResetAll,
  ColumnSelector,
} from "../components";
import styles from "./FilterList.module.scss";

interface FilterListProps {
  isVisible: boolean;
}

export function FilterList({
  isVisible,
}: Readonly<FilterListProps>) {
  return (
    <div
      id="filters-accordion"
      className={`${styles.container} ${isVisible ? styles.isVisible : ""}`}
    >
      <ProviderFilter />
      <GroupFilter />
      <SortFilter />
      <ColumnSelector />
      <div className={styles.resetMenu}>
        <GamesAmount />
        <ResetAll />
      </div>
    </div>
  );
}
