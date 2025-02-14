import { LogoutButton } from "@/features/auth";
import logo from "@/shared/images/logo.svg";
import styles from "./Header.module.scss";

export function Header() {
  return (
    <header className={styles.header}>
      <img src={logo} alt="Logo" className={styles.logo} />
      <LogoutButton />
    </header>
  );
}
