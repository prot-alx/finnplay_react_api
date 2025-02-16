import { ChangeEvent, useState } from "react";
import { Tooltip } from "../Tooltip";
import { passwordSchema } from "@/features/auth/model/validation/schemas";
import eye from "@/shared/images/password_show_icon.svg";
import styles from "./AuthPasswordInput.module.scss";
import { validateInput } from "@/features/auth";

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
    const { error, event } = validateInput(e, passwordSchema, true);
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
        type={isVisible ? "text" : "password"}
        id="password-input"
        placeholder=" "
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
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
