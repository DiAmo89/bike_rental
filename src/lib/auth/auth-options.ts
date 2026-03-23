import { users } from "@/db/tables/users";
import { db } from "@/db/db";
import { Session, NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";

import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        const user = await db.query.users.findFirst({
          where: (u, { eq }) => eq(u.email, credentials.email),
        });

        if (!user || !user.password) {
          throw new Error("No user found with this email");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
          avatar: user.avatar,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, account }) {
      // Când userul se loghează (orice provider), actualizăm token-ul
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.fullName = user.fullName;
        token.avatar = user.avatar;
        if (account?.provider === "google") {
          token.googleId = user.id;
        }
      }

      // Pentru Google Auth, dacă token-ul nu are id, căutăm în DB
      if (account?.provider === "google" && !token.id && token.email) {
        const dbUser = await db.query.users.findFirst({
          where: (u, { eq }) => eq(u.email, token.email!),
        });
        if (dbUser) {
          token.id = dbUser.id;
          token.role = dbUser.role;
          token.fullName = dbUser.fullName;
          token.avatar = dbUser.avatar;
        }
      }
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.googleId = token.googleId;
        session.user.role = token.role;
        session.user.id = token.id;
        session.user.fullName = token.fullName;
        session.user.avatar = token.avatar;
      }
      return session;
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async signIn({ user, account }: { user: any; account: any }) {
      if (!user.email) return false;

      if (account?.provider === "google") {
        const existing = await db.query.users.findFirst({
          where: (u, { eq }) => eq(u.email, user.email!),
        });

        if (!existing) {
          const [newUser] = await db
            .insert(users)
            .values({
              email: user.email,
              fullName: user.name ?? "User",
              avatar: user.image ?? null,
              role: "CUSTOMER",
            })
            .returning();

          // Setăm datele în token imediat după creare
          user.id = newUser.id;
          user.role = newUser.role;
          user.fullName = newUser.fullName;
          user.avatar = newUser.avatar;
        } else {
          // Userul există deja, luăm datele din DB
          user.id = existing.id;
          user.role = existing.role;
          user.fullName = existing.fullName;
          user.avatar = existing.avatar;
        }
      }

      return true;
    },
  },
};
