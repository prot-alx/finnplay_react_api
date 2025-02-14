import { useAuthStore } from "@/features/auth/model/store";
import { useNavigate } from "react-router";
import styles from "./LogoutButton.module.scss";

export function LogoutButton() {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <button className={styles.logoutButton} onClick={handleLogout}>
      Logout
    </button>
  );
}
