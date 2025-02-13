import { ChangeEvent } from "react";
import styles from "./AuthPasswordInput.module.scss";

interface AuthPasswordInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const AuthPasswordInput = ({
  value,
  onChange,
}: AuthPasswordInputProps) => {
  return (
    <div className={styles.inputWrapper}>
      <input
        type="password"
        id="password-input"
        placeholder=" "
        value={value}
        onChange={onChange}
        className={styles.input}
      />
      <label htmlFor="password-input" className={styles.label}>
        Password
      </label>
    </div>
  );
};
