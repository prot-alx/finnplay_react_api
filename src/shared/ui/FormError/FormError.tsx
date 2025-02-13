import styles from "./FormError.module.scss";

interface FormErrorProps {
  error: string[] | string | null;
}

export const FormError = ({ error }: FormErrorProps) => {
  if (!error) return null;

  // Если error - массив
  if (Array.isArray(error)) {
    return (
      <div className={styles.errorList}>
        {error.map((msg) => (
          <p key={msg} className={styles.errorItem}>
            {msg}
          </p>
        ))}
      </div>
    );
  }

  // Если error - строка
  return <p className={styles.error}>{error}</p>;
};
