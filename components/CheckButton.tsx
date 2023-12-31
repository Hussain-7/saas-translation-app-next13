"use client";
import { db } from "@/firebase";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { useSubscriptionStore } from "@/store/store";
import ManageAccountButton from "./ManageAccountButton";

const CheckoutButton = () => {
  const { data: session } = useSession();
  const subscription = useSubscriptionStore((state) => state.subscription);
  const isLoadingSubscription = subscription === undefined;
  const isSubscribed =
    subscription?.status === "active" && subscription?.role === "pro";
  const [loading, setLoading] = useState(false);
  const createCheckoutSession = async () => {
    if (!session) return;
    setLoading(true);
    // push a document into firestore db
    const docRef = await addDoc(
      collection(db, "customers", session.user.id, "checkout_sessions"),
      {
        price: "price_1ONhAIF74vorh76ZWBTfkFd8",
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      }
    );
    // .... stripe extension on firebase will create checkout session
    return onSnapshot(docRef, (snap) => {
      // Wait for the checkoutSession to get attached by the extension
      const data = snap.data();
      const url = data?.url;
      const error = data?.error;
      if (error) {
        alert(`An error occured: ${error.message}`);
        setLoading(false);
      }
      if (url) {
        window.location.assign(url);
        setLoading(false);
      }
    });

    // redirect user to checkout page
  };
  return (
    <div className="flex flex-col space-y-2">
      {" "}
      {isSubscribed && (
        <>
          <hr className="mt-5" />
          <p className="pt-5 text-center text-xs text-indigo-600">
            You are subscribed to PRO
          </p>
        </>
      )}
      <div className="mt-8 block rounded-md text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer disabled:opacity-80 disabled:bg-indigo-600/50 bg-indigo-600 px-3.5 py-2 text-center hover:bg-indigo-500 focus-visible:outline focus-visible:outline-indigo-600 disabled:text-white disabled:cursor-default">
        {isSubscribed ? (
          <ManageAccountButton />
        ) : isLoadingSubscription || loading ? (
          <LoadingSpinner />
        ) : (
          <button onClick={() => createCheckoutSession()}>Sign Up</button>
        )}
      </div>
    </div>
  );
};

export default CheckoutButton;
