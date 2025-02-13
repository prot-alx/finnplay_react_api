import { LogoutButton } from "@/features/auth";
import styles from "./Header.module.scss";

export function Header() {
  return (
    <header className={styles.header}>
      <LogoutButton />
    </header>
  );
}
