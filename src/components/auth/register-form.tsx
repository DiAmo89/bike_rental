"use client";

import { X, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { registerUser } from "@/app/api/auth/register/action";
import { registerSchema } from "@/lib/schemas/auth-schema";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const { status } = useSession();
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
    <div className="relative mx-auto w-full max-w-xl rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm text-zinc-900">
      <div className="absolute top-4 right-4">
        <Link href="/">
          <Button
            variant="ghost"
            type="button"
            size="icon"
            className="group hover:bg-zinc-100 h-8 w-8 rounded-full"
          >
            <X className="h-4 w-4 text-zinc-400 transition-all duration-500 group-hover:rotate-180 group-hover:text-zinc-900" />
          </Button>
        </Link>
      </div>

      <div className="flex flex-col space-y-1.5 pb-8">
        <h3 className="text-2xl font-bold tracking-tight text-zinc-900">
          Create an account
        </h3>
        <p className="text-sm text-zinc-500">
          Enter your details below to register for BlablaBike
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-xl bg-red-50 p-4 text-sm text-red-600 border border-red-100 text-center font-medium italic">
          ⚠️ {error}
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        <div className="space-y-1.5">
          <label
            htmlFor="name"
            className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1"
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
            className="flex w-full rounded-lg border border-zinc-300 bg-zinc-50/50 px-3 py-3 text-sm transition-all outline-none placeholder:text-zinc-400 focus:ring-2 focus:ring-[#e6ff2a] focus:border-zinc-300 disabled:opacity-50"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="email"
            className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1"
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
            className="flex w-full rounded-lg border border-zinc-300 bg-zinc-50/50 px-3 py-3 text-sm transition-all outline-none placeholder:text-zinc-400 focus:ring-2 focus:ring-[#e6ff2a] focus:border-zinc-300"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="password"
            className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            required
            placeholder="••••••••"
            className="flex w-full rounded-lg border border-zinc-300 bg-zinc-50/50 px-3 py-3 text-sm transition-all outline-none placeholder:text-zinc-400 focus:ring-2 focus:ring-[#e6ff2a] focus:border-zinc-300"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex w-full items-center justify-center rounded-xl bg-black px-4 py-4 text-sm font-bold text-white transition-all hover:bg-zinc-800 disabled:opacity-50 shadow-lg shadow-zinc-200"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : (
            "Sign Up"
          )}
        </button>
      </form>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-zinc-100" />
        </div>
        <div className="relative flex justify-center text-[10px] uppercase tracking-tighter">
          <span className="bg-white px-4 text-zinc-400 font-bold">
            Or continue with
          </span>
        </div>
      </div>

      <Button
        variant="outline"
        type="button"
        className="w-full py-6 bg-white border-zinc-200 hover:bg-zinc-50 text-zinc-900 transition-all duration-300 rounded-xl font-bold shadow-sm"
        onClick={handleGoogleLogin}
        disabled={isLoading}
      >
        <span className="flex items-center gap-2">
          {/* Можна додати іконку Google тут */}
          Google
        </span>
      </Button>

      <div className="mt-8 text-center text-sm text-zinc-500">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-bold text-zinc-900 underline underline-offset-4 hover:text-black"
        >
          Log in
        </Link>
      </div>
    </div>
  );
}
