import { useState } from "react";
import burger from "@/shared/images/burger.svg";
import styles from "./GameFilters.module.scss";
import { SearchFilter } from "./components";
import { FilterList } from "./FilterList/FilterList";

export function GameFilters() {
  const [isShowFilters, setIsShowFilters] = useState(false);
  return (
    <div className={styles.filters}>
      <SearchFilter />
      <button
        className={styles.showSwitch}
        onClick={() => setIsShowFilters(!isShowFilters)}
        type="button"
        aria-expanded={isShowFilters}
        aria-controls="filters-accordion"
      >
        <img
          src={burger}
          alt=""
          aria-hidden="true"
          className={styles.burgerIcon}
        />
        <span>{isShowFilters ? "Hide filters" : "Show filters"}</span>
      </button>
      <FilterList isVisible={isShowFilters} />
    </div>
  );
}
