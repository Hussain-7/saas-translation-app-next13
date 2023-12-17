"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import useAdminId from "@/hooks/useAdminId";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Props = {
  chatId: string;
};

const DeleteChatButton = ({ chatId }: Props) => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const adminId = useAdminId({
    chatId,
  });
  const handleDelete = async () => {
    toast({
      title: "Deleting chat",
      description: "Please wait while we delete the chat...",
    });
    console.log("Deleting chat", chatId);
    await fetch("/api/chat/delete", {
      method: "DELETE",
      body: JSON.stringify({ chatId }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log("res", res);
        toast({
          title: "Success",
          description: "Chat deleted successfully!",
          className: "bg-green-600 text-white",
          duration: 3000,
        });
        router.replace("/chat");
      })
      .finally(() => {
        setOpen(false);
      });
  };

  return (
    session?.user?.id === adminId && (
      <Dialog open={open} onOpenChange={setOpen} defaultOpen={open}>
        <DialogTrigger asChild>
          <Button variant="destructive">Clear Chat</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This will delete the chat for all users.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 space-x-2">
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
            <Button variant={"outline"} onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  );
};

export default DeleteChatButton;
