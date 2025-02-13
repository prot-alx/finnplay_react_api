import { LoginForm } from "@/features/auth/ui/LoginForm";
import { AuthLayout } from "@/widgets/AuthLayout/AuthLayout";

export const LoginPage = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};
