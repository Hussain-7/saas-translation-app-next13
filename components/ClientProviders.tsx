"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const ClientProviders = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default ClientProviders;
