import AuthWrapping from "@/components/auth/auth-wrapping";
import RegisterForm from "@/components/auth/register-form";

export default function SignUp() {
  return (
    <section>
      <div>
        <AuthWrapping>
          <RegisterForm />
        </AuthWrapping>
      </div>
    </section>
  );
}
