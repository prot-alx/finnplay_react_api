import {
  SearchFilter,
  ProviderFilter,
  GroupFilter,
  SortFilter,
  GridSelector,
  GamesAmount,
  ResetAll,
} from "./components";
import styles from "./GameFilters.module.scss";

export function GameFilters() {
  return (
    <div className={styles.filters}>
      <SearchFilter />
      <ProviderFilter />
      <GroupFilter />
      <SortFilter />
      <GridSelector />
      <div className={styles.resetMenu}>
        <GamesAmount />
        <ResetAll />
      </div>
    </div>
  );
}
