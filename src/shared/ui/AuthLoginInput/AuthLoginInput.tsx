import { ChangeEvent, useState } from "react";
import { Tooltip } from "../Tooltip";
import { validateInput, usernameSchema } from "@/features/auth";
import styles from "./AuthLoginInput.module.scss";

interface AuthLoginInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const AuthLoginInput = ({ value, onChange }: AuthLoginInputProps) => {
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { error, event } = validateInput(e, usernameSchema, true);
    setError(error);
    onChange(event);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " ") {
      e.preventDefault();
    }
  };

  return (
    <div className={styles.inputWrapper}>
      <input
        type="text"
        id="login-input"
        placeholder=" "
        value={value}
        onChange={handleChange}
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
