import styles from "./FormError.module.scss";

interface FormErrorProps {
  error: string[] | string | null;
}

export const FormError = ({ error }: FormErrorProps) => {
  if (!error) return null;

  if (error === "No token provided") return null;
  
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

  return <p className={styles.error}>{error}</p>;
};
