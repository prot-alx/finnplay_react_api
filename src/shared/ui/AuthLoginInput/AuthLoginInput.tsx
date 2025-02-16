import { ChangeEvent } from "react";
import { Tooltip } from "../Tooltip";
import { useInputValidation } from "@/features/auth";
import styles from "./AuthLoginInput.module.scss";

interface AuthLoginInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const AuthLoginInput = ({ value, onChange }: AuthLoginInputProps) => {
  const { error, handleChange, handleKeyDown } = useInputValidation({
    minLength: 3,
    maxLength: 20,
  });

  return (
    <div className={styles.inputWrapper}>
      <input
        type="text"
        id="login-input"
        placeholder=" "
        value={value}
        onChange={(e) => handleChange(e, onChange)}
        onKeyDown={handleKeyDown}
        className={`${styles.input} ${error ? styles.error : ""}`}
        maxLength={20}
      />
      <label htmlFor="login-input" className={styles.label}>
        Login
      </label>
      <Tooltip show={!!error} message={error || ""} />
    </div>
  );
};
