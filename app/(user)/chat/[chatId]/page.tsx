import { getServerSessionCustom } from "@/auth";
import AdminControls from "@/components/AdminControls";
import ChatInput from "@/components/ChatInput";
import ChatMembersBadges from "@/components/ChatMembersBadges";
import ChatMessages from "@/components/ChatMessages";
import { chatMembersRef } from "@/lib/convertors/ChatMembers";
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
  const initialMessages = (await getDocs(sortedMessageRef(chatId))).docs.map(
    (doc) => doc.data()
  );

  return (
    <>
      <AdminControls chatId={chatId} />
      <ChatMembersBadges chatId={chatId} />
      <div className="flex-1">
        {/* Time stamp is causing issue here need to fix it later on! */}
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
