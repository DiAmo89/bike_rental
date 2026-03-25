"use server";

import { authOptions } from "@/lib/auth/auth-options";
import { getServerSession } from "next-auth";

export interface CurrentUserData {
  id: string | null;
  email: string | null;
  fullName: string | null;
  avatar: string | null;
  avatarKey: string | null;
  role: string | null;
  isAuthenticated: boolean;
}

export async function getCurrentUser(): Promise<CurrentUserData> {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return {
        id: null,
        email: null,
        fullName: null,
        avatar: null,
        avatarKey: null,
        role: null,
        isAuthenticated: false,
      };
    }

    return {
      id: session.user.id ?? null,
      email: session.user.email ?? null,
      fullName: session.user.fullName ?? null,
      avatar: session.user.avatar ?? null,
      avatarKey: session.user.avatarKey ?? null,
      role: session.user.role ?? null,
      isAuthenticated: true,
    };
  } catch (error) {
    console.error("Error fetching current user:", error);
    return {
      id: null,
      email: null,
      fullName: null,
      avatar: null,
      avatarKey: null,
      role: null,
      isAuthenticated: false,
    };
  }
}
