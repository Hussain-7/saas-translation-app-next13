import { getServerSessionCustom } from "@/auth";
import { chatMembersCollectionGroupRef } from "@/lib/convertors/ChatMembers";
import { getDocs } from "firebase/firestore";
import React from "react";
import ChatListRows from "./ChatListRows";

type Props = {};

const ChatList = async (props: Props) => {
  const session = await getServerSessionCustom();
  const chatsSnapshot = await getDocs(
    chatMembersCollectionGroupRef(session?.user.id!)
  );
  const initialChats = chatsSnapshot.docs.map((doc) => ({
    ...doc.data(),
    // Setting time stamp to null since we cannot pass Object with tojson method to client components from server components
    timestamp: null,
  }));
  return <ChatListRows initialChats={initialChats} />;
};

export default ChatList;
