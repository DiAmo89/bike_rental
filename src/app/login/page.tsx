import AuthWrapping from "@/components/auth/auth-wrapping";
import LoginForm from "@/components/auth/login-form";
import React from "react";

export default function Login() {
  return (
    <section>
      <AuthWrapping>
        <LoginForm />
        <h1>HALLO</h1>
      </AuthWrapping>
    </section>
  );
}
