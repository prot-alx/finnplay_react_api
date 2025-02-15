import { ChangeEvent, useState } from "react";
import eye from "@/shared/images/password_show_icon.svg";
import { Tooltip } from "../Tooltip";
import { passwordSchema } from "@/features/auth/model/validation/schemas";
import styles from "./AuthPasswordInput.module.scss";

interface AuthPasswordInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const AuthPasswordInput = ({
  value,
  onChange,
}: AuthPasswordInputProps) => {
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (!newValue) {
      setError(null);
      onChange(e);
      return;
    }
    const result = passwordSchema.safeParse(newValue);
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
        type={isVisible ? "text" : "password"}
        id="password-input"
        placeholder=" "
        value={value}
        onChange={handleChange}
        className={`${styles.input} ${error ? styles.error : ""}`}
        maxLength={32}
      />
      <label htmlFor="password-input" className={styles.label}>
        Password
      </label>
      <button
        type="button"
        onClick={() => setIsVisible(!isVisible)}
        className={styles.passwordToggle}
        aria-label={isVisible ? "Hide password" : "Show password"}
        data-testid="password-toggle"
      >
        <img
          src={eye}
          alt=""
          className={styles.passwordIcon}
          aria-hidden="true"
        />
      </button>
      <Tooltip show={!!error} message={error || ""} />
    </div>
  );
};
