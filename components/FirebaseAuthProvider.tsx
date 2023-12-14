"use client";
import { auth } from "@/firebase";
import { signInWithCustomToken } from "firebase/auth";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

const syncFirebaseAuth = async (session: Session) => {
  if (session && session.firebaseToken) {
    // So in case user logs in firebase token is set and we log in with custom token on firebase
    try {
      await signInWithCustomToken(auth, session.firebaseToken);
    } catch (error) {
      console.error(error);
    }
  } else {
    // In case user logs out we sign out from firebase as well
    auth.signOut();
  }
};

const FirebaseAuthProvider = ({ children }: Props) => {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) return;

    syncFirebaseAuth(session);
  }, [session]);

  return <>{children}</>;
};

export default FirebaseAuthProvider;
