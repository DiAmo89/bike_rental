import AuthWrapping from "@/components/auth/auth-wrapping";
import LoginForm from "@/components/auth/login-form";

export default function Login() {
  return (
    <section>
      <AuthWrapping>
        <LoginForm />
      </AuthWrapping>
    </section>
  );
}
