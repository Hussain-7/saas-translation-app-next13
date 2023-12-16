import React from "react";

type Props = {
  chatId: string;
};

const ChatListRow = ({ chatId }: Props) => {
  return <div>ChatListRow : {chatId}</div>;
};

export default ChatListRow;
