import { LoginForm } from "@/features/auth";
import { AuthLayout } from "@/widgets/AuthLayout";

export const LoginPage = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};
