import { getServerSessionCustom } from "@/auth";
import ChatInput from "@/components/ChatInput";
import ChatMessages from "@/components/ChatMessages";
import { sortedMessageRef } from "@/lib/convertors/Message";
import { getDocs } from "firebase/firestore";
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
  const initialMessages = (await getDocs(sortedMessageRef(chatId))).docs.map((doc) => doc.data());
  
  return (
    <>
      {/* Admin Controls */}
      {/* Chatmembers */}
      {/* Chat messages */}
      <div className="flex-1">
        <ChatMessages
          chatId={chatId}
          session={session}
          initialMessages={initialMessages}
        />
      </div>
      <ChatInput chatId={chatId} />
    </>
  );
};

export default ChatPage;
