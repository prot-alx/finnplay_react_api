import { useRef, useCallback, ChangeEvent, useEffect, useState } from "react";
import { useGamesStore } from "@/features/gamelist";
import styles from "./SearchFilter.module.scss";

export function SearchFilter() {
  const { filters, setFilters } = useGamesStore();
  const [inputValue, setInputValue] = useState(filters.searchQuery);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputValue(value);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setFilters({ searchQuery: value });
      }, 200);
    },
    [setFilters]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className={styles.search}>
      <input
        type="text"
        value={inputValue}
        onChange={handleSearch}
        placeholder="Search"
        className={styles.input}
      />
    </div>
  );
}
