import { ChangeEvent, useState } from "react";
import { useInputValidation } from "@/features/auth";
import { Tooltip } from "../Tooltip";
import eye from "@/shared/images/password_show_icon.svg";
import styles from "./AuthPasswordInput.module.scss";

interface AuthPasswordInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const AuthPasswordInput = ({
  value,
  onChange,
}: AuthPasswordInputProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { error, handleChange, handleKeyDown } = useInputValidation({
    minLength: 6,
    maxLength: 32,
  });

  return (
    <div className={styles.inputWrapper}>
      <input
        type={isVisible ? "text" : "password"}
        id="password-input"
        placeholder=" "
        value={value}
        onChange={(e) => handleChange(e, onChange)}
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
