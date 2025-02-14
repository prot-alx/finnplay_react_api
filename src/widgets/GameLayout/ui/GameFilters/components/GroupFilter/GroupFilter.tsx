import { useGamesStore } from "@/features/gamelist/model/store";
import styles from "./GroupFilter.module.scss";

export function GroupFilter() {
  const { groups, filters, setFilters } = useGamesStore();
  const selectedGroups = filters.groupIds;

  const handleGroupChange = (groupId: number) => {
    setFilters({
      groupIds: selectedGroups.includes(groupId)
        ? selectedGroups.filter((id) => id !== groupId)
        : [...selectedGroups, groupId],
    });
  };

  return (
    <div className={styles.groupFilter}>
      <h3 className={styles.title}>Game groups</h3>
      <div className={styles.list}>
        {groups.map((group) => (
          <button
            key={group.id}
            onClick={() => handleGroupChange(group.id)}
            className={`${styles.button} ${
              selectedGroups.includes(group.id) ? styles.active : ""
            }`}
          >
            {group.name}
          </button>
        ))}
      </div>
    </div>
  );
}
