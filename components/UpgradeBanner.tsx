"use client";
import { useSubscriptionStore } from "@/store/store";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

type Props = {};

const UpgradeBanner = (props: Props) => {
  const subscription = useSubscriptionStore((state) => state.subscription);
  console.log("subscription", subscription);
  const isPro = subscription?.role === "pro";
  const router = useRouter();
  if (subscription === undefined || isPro) return null;
  return (
    <Button
      className="w-full rounded-none bg-gradient-to-r from-[#7775D6] to-[#e935c1] text-center text-white px-5 py-2
			hover:from-[#7775d6] hover:to-[#e935c1] hover:shadow-md hover:opacity-75 transition-all"
      onClick={() => router.push("/register")}
    >
      Updgrade to Pro to Unlock all features!
    </Button>
  );
};

export default UpgradeBanner;
