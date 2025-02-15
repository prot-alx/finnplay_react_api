import {
  ProviderFilter,
  GroupFilter,
  SortFilter,
  GridSelector,
  GamesAmount,
  ResetAll,
} from "../components";
import styles from "./FiltersAccordion.module.scss";

interface FiltersAccordionProps {
  isVisible: boolean;
}

export function FiltersAccordion({
  isVisible,
}: Readonly<FiltersAccordionProps>) {
  return (
    <div
      id="filters-accordion"
      className={`${styles.container} ${isVisible ? styles.isVisible : ""}`}
    >
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
