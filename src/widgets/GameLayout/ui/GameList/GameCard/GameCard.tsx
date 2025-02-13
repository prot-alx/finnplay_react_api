import { Game } from "@/entities";
import styles from "./GameCard.module.scss";
import { useState } from "react";

interface GameCardProps {
  game: Game;
}

export function GameCard({ game }: Readonly<GameCardProps>) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={styles.card}>
      {isLoading && <div className={`${styles.skeleton} ${styles.cover}`} />}
      <img
        src={game.cover}
        loading="lazy"
        decoding="async"
        alt={`${game.name} cover`}
        className={`${styles.cover} ${isLoading ? styles.hidden : ""}`}
        onLoad={() => setIsLoading(false)}
        onError={(e) => {
          e.currentTarget.src = "/placeholder-game.jpg";
          e.currentTarget.onerror = null;
          setIsLoading(false);
        }}
      />
    </div>
  );
}
