import { GameFilters, GameList, Header } from ".";
import { GridProvider } from "../context";
import styles from "./GameLayout.module.scss";

export function GameLayout() {
  return (
    <GridProvider>
      <div className={styles.layout}>
        <Header />
        <main className={styles.main}>
          <div className={styles.content}>
            <section className={styles.games}>
              <GameList />
            </section>
            <aside className={styles.filters}>
              <GameFilters />
            </aside>
          </div>
        </main>
      </div>
    </GridProvider>
  );
}
