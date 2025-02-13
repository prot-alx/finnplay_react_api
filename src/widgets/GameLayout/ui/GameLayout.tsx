import { GameFilters, GameList, Header } from ".";
import styles from "./GameLayout.module.scss";

export function GameLayout() {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <div className={styles.content}>
          <aside className={styles.filters}>
            <GameFilters />
          </aside>
          <section className={styles.games}>
            <GameList />
          </section>
        </div>
      </main>
    </div>
  );
}
