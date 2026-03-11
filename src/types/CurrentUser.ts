export interface CurrentUser {
  id: number;
  full_name: string;
  email: string;
  telephone: string;
  avatar: string | null;
  role: "CUSTOMER" | "ADMIN";
}