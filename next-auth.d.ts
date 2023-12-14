import NextAuth, { DefaultSession } from "next-auth";


// Updating session type in next auth to add id to user
declare module "next-auth" {
	interface Session {
		firebaseToken?: string;
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}
