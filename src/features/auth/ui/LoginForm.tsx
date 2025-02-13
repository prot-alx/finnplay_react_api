import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router";
import { AuthLoginInput } from "@/shared/ui/AuthLoginInput/AuthLoginInput";
import { AuthPasswordInput } from "@/shared/ui/AuthPasswordInput/AuthPasswordInput";
import { Button } from "@/shared/ui/Button/Button";
import { FormError } from "@/shared/ui/FormError/FormError";
import styles from "./LoginForm.module.scss";
import { loginUser } from "@/api/auth";

interface ErrorResponse {
  message: string | string[];
  error?: string;
  statusCode: number;
}

export function LoginForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | string[] | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    return () => {
      setError(null);
    };
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await loginUser({ username, password });
      navigate("/games");
    } catch (err) {
      const errorResponse = err as ErrorResponse;
      setError(errorResponse.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.loginForm}>
      <div className={styles.formInputs}>
        <AuthLoginInput value={username} onChange={handleUsernameChange} />
        <AuthPasswordInput value={password} onChange={handlePasswordChange} />
      </div>
      <Button type="submit" disabled={loading || !username || !password}>
        {loading ? "Загрузка..." : "Login"}
      </Button>
      <FormError error={error} />
    </form>
  );
}
