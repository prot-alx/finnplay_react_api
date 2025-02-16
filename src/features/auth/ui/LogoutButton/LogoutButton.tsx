import { useNavigate } from "react-router";
import { useAuthStore } from "@/features/auth/model/store";
import profileIcon from "@/shared/images/icons__profile_16px.svg";
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
    <button
      type="button"
      className={styles.logoutButton}
      onClick={handleLogout}
    >
      <img
        className={styles.profileIcon}
        src={profileIcon}
        alt=""
        aria-hidden="true"
      />
      <span>Logout</span>
    </button>
  );
}
