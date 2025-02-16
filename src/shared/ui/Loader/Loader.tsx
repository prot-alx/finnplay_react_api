import loader from "@/shared/images/loader.svg";
import styles from "./Loader.module.scss";

interface LoaderProps {
  size?: "small" | "medium" | "large";
  className?: string;
  global?: boolean;
}

export const Loader = ({
  size = "medium",
  className = "",
  global = false,
}: LoaderProps) => {
  return (
    <div className={`${styles.container} ${global ? styles.global : ""}`}>
      <img
        src={loader}
        alt="Loading..."
        className={`${styles.loader} ${styles[size]} ${className}`}
      />
    </div>
  );
};
