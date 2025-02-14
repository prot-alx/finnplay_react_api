import { ChangeEvent } from "react";
import { useGamesStore } from "@/features/gamelist/model/store";
import styles from "./SearchFilter.module.scss";

export function SearchFilter() {
  const { filters, setFilters } = useGamesStore();

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters({ searchQuery: e.target.value });
  };

  return (
    <div className={styles.search}>
      <input
        type="text"
        value={filters.searchQuery}
        onChange={handleSearch}
        placeholder="Search"
        className={styles.input}
      />
    </div>
  );
}
