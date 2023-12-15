"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";
import FirebaseAuthProvider from "./FirebaseAuthProvider";
import SubscriptionProvider from "./SubscriptionProvider";

type Props = {
  children: React.ReactNode;
};

const ClientProviders = ({ children }: Props) => {
  return (
    <SessionProvider>
      <FirebaseAuthProvider>
        <SubscriptionProvider>{children}</SubscriptionProvider>
      </FirebaseAuthProvider>
    </SessionProvider>
  );
};

export default ClientProviders;
