import styles from "./AuthLayout.module.scss";
import logo from "@/shared/images/logo.svg";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <img src={logo} alt="Logo" className={styles.logo} />
        {children}
      </div>
    </div>
  );
};
