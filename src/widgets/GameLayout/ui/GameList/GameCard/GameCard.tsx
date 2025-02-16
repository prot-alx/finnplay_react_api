import { useState } from "react";
import { Game } from "@/entities";
import placeholder from "@/shared/images/image-placeholder-500x500.jpg";
import styles from "./GameCard.module.scss";

interface GameCardProps {
  game: Game;
}

export function GameCard({ game }: Readonly<GameCardProps>) {
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const placeholderUrl = new URL(placeholder, import.meta.url).href;

  const handleImageError = () => {
    if (!imageError) {
      setImageError(true);
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.card}>
      {isLoading && <div className={`${styles.skeleton} ${styles.cover}`} />}

      <picture>
        <source
          srcSet={imageError ? placeholderUrl : game.coverLarge}
          media="(min-width: 768px)"
        />
        <img
          src={imageError ? placeholderUrl : game.cover}
          width={250}
          height={180}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          alt={`${game.name} cover`}
          className={`${styles.cover} ${isLoading ? styles.hidden : ""}`}
          onLoad={() => setIsLoading(false)}
          onError={handleImageError}
        />
      </picture>
    </div>
  );
}
