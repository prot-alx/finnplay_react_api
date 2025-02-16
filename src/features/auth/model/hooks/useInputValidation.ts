import { ChangeEvent, useState } from "react";

interface ValidationConfig {
  minLength: number;
  maxLength: number;
}

export const useInputValidation = (config: ValidationConfig) => {
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
  ) => {
    const newValue = e.target.value.replace(/\s/g, "");

    let validationError = null;
    if (newValue) {
      if (newValue.length < config.minLength) {
        validationError = `Minimum ${config.minLength} characters`;
      } else if (newValue.length > config.maxLength) {
        validationError = `Maximum ${config.maxLength} characters`;
      }
    }

    setError(validationError);
    onChange({
      ...e,
      target: { ...e.target, value: newValue },
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " ") e.preventDefault();
  };

  return {
    error,
    handleChange,
    handleKeyDown,
  };
};
