import AuthWrapping from "@/components/auth/auth-wrapping";
import RegisterFom from "@/components/auth/register-form";

export default function SignUp() {
  return (
    <section>
      <div>
        <AuthWrapping>
          <RegisterFom />
        </AuthWrapping>
      </div>
    </section>
  );
}
