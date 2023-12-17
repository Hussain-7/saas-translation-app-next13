import React from "react";
import { Button } from "./ui/button";

type Props = {
  chatId: string;
};

const DeleteChatButton = ({ chatId }: Props) => {
  return <Button>Delete Chat</Button>;
};

export default DeleteChatButton;
