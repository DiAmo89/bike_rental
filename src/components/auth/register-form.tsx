"use client";

import { X, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { signIn, useSession } from "next-auth/react"; // Додав useSession
import { useState, useEffect } from "react";
import { registerUser } from "@/app/api/auth/register/action";
import { registerSchema } from "@/lib/schemas/auth-schema";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const { status } = useSession(); // Отримуємо статус сесії
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/user-profile");
    }
  }, [status, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const validation = registerSchema.safeParse(formData);

    if (!validation.success) {
      const errors = validation.error.flatten().fieldErrors;
      const firstError = Object.values(errors)[0]?.[0];
      setError(firstError || "Invalid data");
      setIsLoading(false);
      return;
    }

    const result = await registerUser(formData);

    if (result.error) {
      setError(result.error);
      setIsLoading(false);
    } else {
      const signInResult = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (signInResult?.ok) {
        router.replace("/user-profile");
        router.refresh();
      } else {
        setError("Account created, but failed to log in automatically.");
        setIsLoading(false);
      }
    }
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    signIn("google", { callbackUrl: "/user-profile" });
  };

  if (status === "loading") return null;

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
          Create an account
        </h3>
        <p className="text-sm text-zinc-400">
          Enter your details below to register for BlablaBike
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-md bg-red-500/10 p-3 text-sm text-red-500 border border-red-500/20 text-center">
          {error}
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="text-sm font-medium leading-none text-zinc-50"
          >
            Full Name
          </label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            type="text"
            placeholder="John Doe"
            required
            className="flex h-10 w-full rounded-md border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm transition-colors placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 disabled:opacity-50"
          />
        </div>

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
            value={formData.email}
            onChange={handleChange}
            type="email"
            placeholder="name@example.com"
            required
            className="flex h-10 w-full rounded-md border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="password"
            title="Password"
            className="text-sm font-medium leading-none text-zinc-50"
          >
            Password
          </label>
          <input
            id="password"
            name="password" // ДОДАНО
            value={formData.password}
            onChange={handleChange}
            type="password"
            required
            placeholder="••••••••"
            className="flex h-10 w-full rounded-md border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex w-full items-center justify-center rounded-md bg-zinc-50 px-4 py-2 text-sm font-medium text-zinc-950 transition-colors hover:bg-zinc-200 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Sign Up"
          )}
        </button>
      </form>

      {/* Решта блоку з Google без змін */}
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
        disabled={isLoading}
      >
        Google
      </Button>

      <div className="mt-4 text-center text-sm text-zinc-400">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-zinc-50 underline underline-offset-4 hover:text-zinc-300"
        >
          Log in
        </Link>
      </div>
    </div>
  );
}
