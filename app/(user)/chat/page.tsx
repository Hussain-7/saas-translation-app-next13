import ChatList from "@/components/ChatList";
import ChatPersmissionError from "@/components/ChatPersmissionError";
import React from "react";
type Props = {
  params: {};
  searchParams: {
    error: string;
  };
};

const ChatsPage = ({ searchParams: { error } }: Props) => {
  return (
    <div>
      {error && (
        <div>
          <ChatPersmissionError />
        </div>
      )}
      <ChatList />
    </div>
  );
};

export default ChatsPage;
