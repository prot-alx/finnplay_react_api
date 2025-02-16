import { ChangeEvent } from "react";
import { ZodSchema } from "zod";

interface ValidatorResult {
  error: string | null;
  event: ChangeEvent<HTMLInputElement>;
}

export const validateInput = (
  e: ChangeEvent<HTMLInputElement>,
  schema: ZodSchema,
  removeSpaces = true
): ValidatorResult => {
  const newValue = removeSpaces
    ? e.target.value.replace(/\s/g, "")
    : e.target.value;

  // создаем новый ивент с обработанным значением
  const syntheticEvent = {
    ...e,
    target: {
      ...e.target,
      value: newValue,
    },
  } as ChangeEvent<HTMLInputElement>;

  if (!newValue) {
    return {
      error: null,
      event: syntheticEvent,
    };
  }

  const result = schema.safeParse(newValue);

  return {
    error: !result.success ? result.error.issues[0].message : null,
    event: syntheticEvent,
  };
};
