import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Message, limitedSortedMessagesRef } from "@/lib/convertors/Message";

type Props = {
  chatId: string;
};

const ChatListRow = ({ chatId }: Props) => {
  const [messages, loading, error] = useCollectionData<Message>(
    limitedSortedMessagesRef(chatId)
  );
  return <div>ChatListRow : {chatId}</div>;
};

export default ChatListRow;
