import ChatList from "@/components/ChatList";
import React from "react";

type Props = {
  params: {};
  searchParams: {
    error: string;
  };
};

const ChatsPage = ({ params, searchParams: { error } }: Props) => {
  return (
    <div>
      {/* Chat permission Error */}
      {/* Chat List */}
      <ChatList />
    </div>
  );
};

export default ChatsPage;
