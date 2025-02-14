import { useGamesStore } from "@/features/gamelist/model/store";
import styles from "./SortFilter.module.scss";

const sortOptions = [
  { value: "a-z", label: "A-Z" },
  { value: "z-a", label: "Z-A" },
  { value: "newest", label: "Newest" },
] as const;

export function SortFilter() {
  const { sort, setSort } = useGamesStore();

  return (
    <div className={styles.sortFilter}>
      <h3 className={styles.title}>Sorting</h3>
      <div className={styles.list}>
        {sortOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setSort(sort === option.value ? null : option.value)}
            className={`${styles.button} ${
              sort === option.value ? styles.active : ""
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
