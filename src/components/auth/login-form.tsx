"use client";

import { X, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginSchema } from "@/lib/schemas/auth-schema";

export default function LoginForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const validation = loginSchema.safeParse(formData);

    if (!validation.success) {
      const fieldErrors = validation.error.flatten().fieldErrors;
      const firstError = Object.values(fieldErrors)[0]?.[0];

      setError(firstError || "Invalid login data");
      setIsLoading(false);
      return;
    }

    const result = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });

    if (result?.error) {
      setError("Incorrect email address or password");
      setIsLoading(false);
    } else {
      router.push("/user-profile");
      router.refresh();
    }
  };

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/user-profile" });
  };

  return (
    <div className="relative mx-auto w-full max-w-xl rounded-xl border border-zinc-800 bg-zinc-950 p-6 shadow-xl text-zinc-50">
      <div className="absolute top-3 right-3">
        <Link href="/">
          <Button
            variant="outline"
            type="button"
            size="icon"
            className="group border-zinc-800 hover:border-gray-400 bg-transparent h-8 w-8"
          >
            <X className="h-4 w-4 text-amber-50 transition-all duration-500 group-hover:rotate-180 group-hover:text-white group-hover:scale-110" />
          </Button>
        </Link>
      </div>

      <div className="flex flex-col space-y-1.5 pb-6">
        <h3 className="text-2xl font-semibold tracking-tight text-zinc-50">
          Welcome back
        </h3>
        <p className="text-sm text-zinc-400">
          Enter your details below to access your account
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-md bg-red-500/10 p-3 text-sm text-red-500 border border-red-500/20 text-center animate-in fade-in duration-300">
          {error}
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-sm font-medium leading-none text-zinc-50"
          >
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="name@example.com"
            required
            value={formData.email}
            onChange={handleChange}
            className="flex h-10 w-full rounded-md border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm transition-colors placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-sm font-medium leading-none text-zinc-50"
            >
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-xs text-zinc-400 hover:text-zinc-50 transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="flex h-10 w-full rounded-md border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex w-full items-center justify-center rounded-md bg-zinc-50 px-4 py-2 text-sm font-medium text-zinc-950 transition-colors hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 disabled:pointer-events-none disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Logging in...
            </>
          ) : (
            "Log In"
          )}
        </button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-zinc-800" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-zinc-950 px-2 text-zinc-500 font-mono">
            Or continue with
          </span>
        </div>
      </div>

      <Button
        variant="outline"
        type="button"
        className="w-full py-2 bg-black border-zinc-800 hover:bg-zinc-900 hover:text-white text-zinc-300 transition-all duration-300 rounded-sm font-mono"
        onClick={handleGoogleLogin}
      >
        Google
      </Button>

      <div className="mt-4 text-center text-sm text-zinc-400">
        Don&apos;t have an account?{" "}
        <Link
          href="/sign-up"
          className="font-medium text-zinc-50 underline underline-offset-4 hover:text-zinc-300"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
