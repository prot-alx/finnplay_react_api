import { ChangeEvent, useState } from "react";
import styles from "./AuthLoginInput.module.scss";
import { Tooltip } from "../Tooltip";
import { usernameSchema } from "@/features/auth/model/validation/schemas";

interface AuthLoginInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const AuthLoginInput = ({ value, onChange }: AuthLoginInputProps) => {
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (!newValue) {
      setError(null);
      onChange(e);
      return;
    }

    const result = usernameSchema.safeParse(newValue);
    
    if (!result.success) {
      setError(result.error.issues[0].message);
    } else {
      setError(null);
    }

    onChange(e);
  };

  return (
    <div className={styles.inputWrapper}>
      <input
        type="text"
        id="login-input"
        placeholder=" "
        value={value}
        onChange={handleChange}
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
