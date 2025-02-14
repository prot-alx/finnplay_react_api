import { useGamesStore } from "@/features/gamelist/model/store";
import styles from "./ProviderFilter.module.scss";

export function ProviderFilter() {
  const { providers, filters, setFilters } = useGamesStore();
  const selectedProviders = filters.providerIds;

  const handleProviderChange = (providerId: number) => {
    setFilters({
      providerIds: selectedProviders.includes(providerId)
        ? selectedProviders.filter((id) => id !== providerId)
        : [...selectedProviders, providerId],
    });
  };

  return (
    <div className={styles.providerFilter}>
      <h3 className={styles.title}>Providers</h3>
      <div className={styles.list}>
        {providers.map((provider) => (
          <button
            key={provider.id}
            onClick={() => handleProviderChange(provider.id)}
            className={`${styles.button} ${
              selectedProviders.includes(provider.id) ? styles.active : ""
            }`}
          >
            {provider.name}
          </button>
        ))}
      </div>
    </div>
  );
}
