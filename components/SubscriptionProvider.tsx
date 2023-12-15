import { subscriptionRef } from "@/lib/convertors/Subscription";
import { useSubscriptionStore } from "@/store/store";
import { onSnapshot } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

const SubscriptionProvider = ({ children }: Props) => {
  const { data: session } = useSession();
  const setSubscription = useSubscriptionStore(
    (state) => state.setSubscription
  );
  useEffect(() => {
    if (!session) return;
    // since onSnapshot is a listener we return to subscribe to it. And in that listener we pass a subscriptionRef which is a function that returns a query
    // and once that query is executed we get a snapshot of the data
    return onSnapshot(
      subscriptionRef(session?.user.id),
      (snap) => {
        if (snap.empty) {
          console.log("User has no Subscription");
          setSubscription(null);
        } else {
          console.log("User has a Subscription");
          // Now if we access any thing in data we have complete type saftey due to convertor
          setSubscription(snap.docs[0].data());
        }
      },
      (err) => {
        console.log("Error getting subscription", err);
      }
    );
  }, [session, setSubscription]);
  return <>{children}</>;
};

export default SubscriptionProvider;
