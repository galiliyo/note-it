"use client";

import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
interface props {
  children?: React.ReactNode;
  session?: Session;
}
const Provider = ({ children, session }: props) => {
  // console.log("session", session);
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
