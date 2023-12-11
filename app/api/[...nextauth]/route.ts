import { authOptions } from "@/auth";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// Adding Next Auth
// 1. Add this file
// 2. Add authOption in auth.ts file
// 3. Add middleware in middleware.ts file which protects routes
// 4. Add sessionProvider
