import { getServerSessionCustom } from "@/auth";
import React from "react";

type Props = {};

const ChatPage = async (props: Props) => {
  const session = await getServerSessionCustom();
  return (
    <>
      {/* Admin Controls */}
      {/* Chatmembers */}
      {/* Chat messages */}
      {/* Chat input */}
    </>
  );
};

export default ChatPage;
