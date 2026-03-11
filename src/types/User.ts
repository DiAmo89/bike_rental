export interface User {
    id: number;
    email: string;
    password: string;
    full_name: string;
    role: "CUSTOMER" | "ADMIN";
    avatar: string;
    telephone: string;
    created_at?: string;
    updated_at?: string;
    }