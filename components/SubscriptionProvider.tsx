import { subscriptionRef } from "@/lib/convertors/Subscription";
import { onSnapshot } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

const SubscriptionProvider = ({ children }: Props) => {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) return;
    return onSnapshot(subscriptionRef(session?.user.id), (snap) => {
      if (snap.empty) {
        console.log("User has no Subscription");
      } else {
        console.log("User has a Subscription");
      }
    });
  }, [session]);
  return <>{children}</>;
};

export default SubscriptionProvider;
