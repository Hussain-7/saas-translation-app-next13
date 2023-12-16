import { getServerSessionCustom } from "@/auth";
import ChatInput from "@/components/ChatInput";
import React from "react";

type Props = {
  params: {
    chatId: string;
  };
  searchParams: {
    error: string;
  };
};

const ChatPage = async ({
  params: { chatId },
  searchParams: { error },
}: Props) => {
  const session = await getServerSessionCustom();
  return (
    <>
      {/* Admin Controls */}
      {/* Chatmembers */}
      {/* Chat messages */}
      {/* Chat input */}
      <ChatInput chatId={chatId} />
    </>
  );
};

export default ChatPage;
