import { NextAuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { cert } from "firebase-admin/app";
import { adminDb } from "./firebase-admin";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIEN_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  adapter: FirestoreAdapter(adminDb),
} satisfies NextAuthOptions;

export const getServerSessionCustom = async () =>
  await getServerSession(authOptions);
