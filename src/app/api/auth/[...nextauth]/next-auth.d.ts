import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            name?: string;
            email?: string;
            image?: string;
            role?: string;  // Añadimos el campo role
        };
    }

    interface User {
        role?: string;  // Añadimos el campo role
    }
}