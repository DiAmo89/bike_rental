// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string | null;
      fullName?: string | null;
      avatar?: string | null;
      role?: string | null;
      googleId?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role?: string | null;
    fullName?: string | null;
    avatar?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string | null;
    googleId?: string | null;
    role?: string | null;
    fullName?: string | null;
    avatar?: string | null;
  }
}
