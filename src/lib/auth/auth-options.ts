import { users } from "@/db/tables/users"; // Переконайся, що шлях вірний
import { db } from "@/db/db";
import { Account, Profile, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({
      token,
      account,
      profile,
    }: {
      token: JWT;
      account?: Account | null;
      profile?: Profile | null;
    }) {
      if (account && profile) {
        token.googleId = profile.sub;

        const existing = await db.query.users.findFirst({
          where: (u, { eq }) => eq(u.email, profile.email!),
        });

        if (existing) {
          token.role = existing.role;
          token.id = existing.id;
          token.fullName = existing.fullName;
          token.avatar = existing.avatar;
        }
      }
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.googleId = token.googleId;
        session.user.role = token.role;
        session.user.id = token.id;
        session.user.fullName = token.fullName; // Тепер це з'явиться в useSession()
        session.user.avatar = token.avatar;
      }
      return session;
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async signIn({ user }: { user: User | any }) {
      if (!user.email) return false;

      const existing = await db.query.users.findFirst({
        where: (u, { eq }) => eq(u.email, user.email!),
      });

      if (!existing) {
        await db.insert(users).values({
          email: user.email,
          fullName: user.name ?? "User",
          avatar: user.image ?? null,
          role: "CUSTOMER",
        });
      }
      return true;
    },
  },
};
