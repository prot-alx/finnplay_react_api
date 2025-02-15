import {
  ProviderFilter,
  GroupFilter,
  SortFilter,
  GamesAmount,
  ResetAll,
  ColumnSelector,
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
      <ColumnSelector />
      <div className={styles.resetMenu}>
        <GamesAmount />
        <ResetAll />
      </div>
    </div>
  );
}
