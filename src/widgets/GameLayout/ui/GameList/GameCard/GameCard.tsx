import { useState } from "react";
import { Game } from "@/entities";
import placeholder from "@/shared/images/image-placeholder-500x500.jpg";
import styles from "./GameCard.module.scss";

interface GameCardProps {
  game: Game;
}

export const GameCard = ({ game }: Readonly<GameCardProps>) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const placeholderUrl = new URL(placeholder, import.meta.url).href;

  const handleImageLoad = () => setImageLoaded(true);
  
  const handleImageError = () => {
    if (!imageError) {
      setImageError(true);
    }
    setImageLoaded(true);
  };

  return (
    <div className={styles.card}>
      {!imageLoaded && <div className={styles.skeleton} />}

      <picture>
        <source
          srcSet={imageError ? placeholderUrl : game.coverLarge}
          media="(min-width: 768px)"
        />
        <img
          src={imageError ? placeholderUrl : game.cover}
          srcSet={
            imageError
              ? placeholderUrl
              : `${game.cover} 1x, ${game.coverLarge} 2x`
          }
          width={250}
          height={180}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          alt={`${game.name} cover`}
          className={styles.cover}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </picture>
    </div>
  );
};
