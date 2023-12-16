"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { MessageSquarePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useSubscriptionStore } from "@/store/store";
import { useToast } from "./ui/use-toast";
import LoadingSpinner from "./LoadingSpinner";
import { v4 as uuidv4 } from "uuid";
import { addChatRef } from "@/lib/convertors/ChatMembers";
import { serverTimestamp, setDoc } from "firebase/firestore";

type Props = {
  isLarge?: boolean;
};

const CreateChatButton = ({ isLarge }: Props) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const subscription = useSubscriptionStore((store) => store.subscription);

  const createNewChat = async () => {
    // all the logic here...
    console.log("createNewChat", session);
    if (!session || !session?.user.id) return;
    setLoading(true);
    toast({
      title: "Create new chat...",
      description: "Hold tight while we create your new chat!",
      duration: 3000,
    });
    // TODO: Check if user is pro and limit them creating an new chat
    // ...
    // ---
    const chatId = uuidv4();

    await setDoc(addChatRef(chatId, session.user.id), {
      userId: session.user.id!,
      email: session.user.email!,
      timestamp: serverTimestamp(),
      isAdmin: true,
      chatId: chatId,
      image: session.user.image || "",
    })
      .then(() => {
        toast({
          title: "Success",
          description: "Your chat has been created!",
          className: "bg-green-500",
          duration: 2000,
        });
        router.push(`/chat/${chatId}`);
      })
      .catch((err) => {
        console.log("Error creating chat", err);
        toast({
          title: "Error",
          description: "There was an error creating your chat!",
          variant: "destructive",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  if (isLarge) {
    return (
      <div>
        <Button variant={"default"} onClick={createNewChat}>
          {loading ? <LoadingSpinner /> : "Create a New Chat"}
        </Button>
      </div>
    );
  }
  return (
    <Button variant={"ghost"} onClick={createNewChat}>
      {loading ? <LoadingSpinner /> : <MessageSquarePlus />}
    </Button>
  );
};

export default CreateChatButton;
