import { ChangeEvent } from "react";
import styles from "./AuthLoginInput.module.scss";

interface AuthLoginInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const AuthLoginInput = ({ value, onChange }: AuthLoginInputProps) => {
  return (
    <div className={styles.inputWrapper}>
      <input
        type="text"
        id="login-input"
        placeholder=" "
        value={value}
        onChange={onChange}
        className={styles.input}
      />
      <label htmlFor="login-input" className={styles.label}>
        Login
      </label>
    </div>
  );
};
