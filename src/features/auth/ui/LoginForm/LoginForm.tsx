import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "../../model/store";
import styles from "./LoginForm.module.scss";
import {
  AuthLoginInput,
  AuthPasswordInput,
  Button,
  FormError,
} from "@/shared/ui";

export function LoginForm() {
  const navigate = useNavigate();
  const { login, isLoading, error, isAuth } = useAuthStore();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    if (isAuth) {
      navigate("/games");
    }
  }, [isAuth, navigate]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await login(username, password);
    } catch (err) {
      console.error("Login error:", err);
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
      <Button type="submit" disabled={isLoading || !username || !password}>
        {isLoading ? "Загрузка..." : "Login"}
      </Button>
      <FormError error={error} />
    </form>
  );
}
