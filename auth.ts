import { NextAuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { cert } from "firebase-admin/app";
import { adminAuth, adminDb } from "./firebase-admin";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIEN_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    jwt: async ({ user, token }) => {
      if (user) {
        // we need the userid for the account in the token as well
        token.uid = user.id;
      }

      return token;
    },
    session: async ({ session, token }) => {
      // Now we need to pull the userid out of the token and add it to the session
      if (session?.user) {
        if (token.sub) {
          session.user.id = token.sub;
          // So uptill now we log into google through next auth
          // and the user data is being logged in the firestore db
          // but we haven't authentication to google provider on firebase
          // so we need to do that as well so that on client side we can use that
          // to authenticate to firebase client side
          const firebaseToken = await adminAuth.createCustomToken(token.sub);
          // Now using this firebase token we can authenticate to firebase google provider on client side using hoc
          session.firebaseToken = firebaseToken;
        }
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  adapter: FirestoreAdapter(adminDb),
} satisfies NextAuthOptions;

export const getServerSessionCustom = async () =>
  await getServerSession(authOptions);
