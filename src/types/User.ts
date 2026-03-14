export interface User {
    id: string;
    email: string;
    full_name: string;
    role: "CUSTOMER" | "ADMIN";
    avatar: string;
    telephone: string;
    created_at?: Date;
    updated_at?: Date;
    }