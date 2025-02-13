import { useGamesStore } from "@/features/gamelist/model/store";
import styles from "./GroupFilter.module.scss";

export function GroupFilter() {
  const { groups, filters, setFilter } = useGamesStore();
  const selectedGroupId = filters.groupId;

  const handleGroupChange = (groupId: number) => {
    setFilter("groupId", groupId === selectedGroupId ? null : groupId);
  };

  return (
    <div className={styles.groupFilter}>
      <h3 className={styles.title}>Groups</h3>
      <div className={styles.list}>
        {groups.map((group) => (
          <button
            key={group.id}
            onClick={() => handleGroupChange(group.id)}
            className={`${styles.button} ${
              selectedGroupId === group.id ? styles.active : ""
            }`}
          >
            {group.name}
          </button>
        ))}
      </div>
    </div>
  );
}
