"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";
import FirebaseAuthProvider from "./FirebaseAuthProvider";

type Props = {
  children: React.ReactNode;
};

const ClientProviders = ({ children }: Props) => {
  return (
    <SessionProvider>
      <FirebaseAuthProvider>{children}</FirebaseAuthProvider>
    </SessionProvider>
  );
};

export default ClientProviders;
