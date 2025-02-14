import { GamesAmount } from "./components/GamesAmount/GamesAmount";
import { GridSelector } from "./components/GridSelector/GridSelector";
import { GroupFilter } from "./components/GroupFilter/GroupFilter";
import { ProviderFilter } from "./components/ProviderFilter/ProviderFilter";
import { ResetAll } from "./components/ResetFilter/ResetAll";
import { SearchFilter } from "./components/SearchFilter/SearchFilter";
import { SortFilter } from "./components/SortFilter/SortFilter";
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
