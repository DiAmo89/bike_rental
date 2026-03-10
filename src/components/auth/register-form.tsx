"use client";

export default function RegisterForm() {
  return (
    <div className="mx-auto w-full max-w-xl rounded-xl border border-zinc-800 bg-zinc-950 p-6 shadow-xl text-zinc-50">
      <div className="flex flex-col space-y-1.5 pb-6">
        <h3 className="text-2xl font-semibold tracking-tight text-zinc-50">
          Create an account
        </h3>
        <p className="text-sm text-zinc-400">
          Enter your details below to register for BlablaBike
        </p>
      </div>

      <form className="space-y-4">
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
            type="text"
            placeholder="John Doe"
            required
            className="flex h-10 w-full rounded-md border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm transition-colors placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 disabled:cursor-not-allowed disabled:opacity-50"
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
            type="email"
            placeholder="name@example.com"
            required
            className="flex h-10 w-full rounded-md border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm transition-colors placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="password"
            className="text-sm font-medium leading-none text-zinc-50"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="••••••••"
            className="flex h-10 w-full rounded-md border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
          />
        </div>

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-md bg-zinc-50 px-4 py-2 text-sm font-medium text-zinc-950 transition-colors hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 disabled:pointer-events-none disabled:opacity-50"
        >
          Sign Up
        </button>
      </form>

      <div className="mt-4 text-center text-sm text-zinc-400">
        Already have an account?{" "}
        <a
          href="/login"
          className="font-medium text-zinc-50 underline underline-offset-4 hover:text-zinc-300"
        >
          Log in
        </a>
      </div>
    </div>
  );
}
