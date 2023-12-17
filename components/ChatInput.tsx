"use client";
import React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import {
  User,
  limitedMessagesRef,
  limitedSortedMessagesRef,
  messagesRef,
} from "@/lib/convertors/Message";
import { addDoc, getDoc, getDocs, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useSubscriptionStore } from "@/store/store";
import { toast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";

type Props = {
  chatId: string;
};

const formSchema = z.object({
  input: z.string().min(1).max(1000),
});

const ChatInput = ({ chatId }: Props) => {
  const router = useRouter();
  const subscription = useSubscriptionStore((store) => store.subscription);
  const { data: session } = useSession();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // if (values.input.length === 0) return;
    if (!session?.user) return;
    console.log(values);

    // TODO: Check if user is pro and limit them creating an new message
    // ...
    // ---
    const messages = (await getDocs(limitedMessagesRef(chatId))).docs.map(
      (doc) => doc.data()
    ).length;

    const isPro =
      subscription?.role === "pro" && subscription.status === "active";

    if (!isPro && messages >= 20) {
      toast({
        title: "Free plan limit exceeded",
        description:
          "You've exceeded the free plan limit of 20 messages per chat. Upgrade to PRO fro unlimited chat messages",
        variant: "destructive",
        action: (
          <ToastAction
            altText="Upgrade"
            onClick={() => router.push("/register")}
          >
            Upgrade to PRO
          </ToastAction>
        ),
      });
      return;
    }

    const userToStore: User = {
      id: session.user.id!,
      name: session.user.name!,
      email: session.user.email!,
      image: session.user.image!,
    };
    addDoc(messagesRef(chatId), {
      input: values.input,
      timestamp: serverTimestamp(),
      user: userToStore,
    });

    form.reset();
  }
  return (
    <div className="sticky bottom-0">
      {" "}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex space-x-2 p-2 rounded-t-xl mx-auto bg-white border dark:bg-slate-800"
        >
          <FormField
            control={form.control}
            name="input"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    className="border-none bg-transparent dark:placeholder:text-white/70"
                    placeholder="Enter message in ANY language..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="bg-violet-600 text-white hover:bg-violet-500"
          >
            Send
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ChatInput;
