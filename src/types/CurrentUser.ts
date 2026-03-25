export interface CurrentUser {
  id: string;
  full_name: string;
  email: string;
  telephone: string;
  avatar: string | null;
  avatarKey: string | null;
  role: "CUSTOMER" | "ADMIN";
  created_at: Date;
}