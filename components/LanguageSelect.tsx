"use client";
import {
  LanguagesSupportedMap,
  useLanguageStore,
  useSubscriptionStore,
} from "@/store/store";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import LoadingSpinner from "./LoadingSpinner";
import Link from "next/link";

type Props = {};

const LanguageSelect = (props: Props) => {
  const { language, setLanguage, getLanguages, getNotSupportedLanguages } =
    useLanguageStore();
  const { subscription } = useSubscriptionStore();
  const isPro =
    subscription?.role === "pro" && subscription?.status === "active";
  const pathName = usePathname();
  const isChatPage = pathName.includes("/chat");
  console.log("language", language);

  return (
    isChatPage && (
      <Select>
        <SelectTrigger className="w-[150px] text-black dark:text-white">
          <SelectValue placeholder={LanguagesSupportedMap[language]} />
        </SelectTrigger>
        <SelectContent>
          {subscription === undefined ? (
            <LoadingSpinner />
          ) : (
            <>
              {getLanguages(isPro).map((lang, i) => (
                <SelectItem
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className="flex items-center"
                  value={lang}
                >
                  {" "}
                  {LanguagesSupportedMap[lang]}
                </SelectItem>
              ))}

              {getNotSupportedLanguages(isPro).map((lang, i) => (
                <Link href="/register" key={lang} prefetch={false}>
                  <SelectItem
                    key={i}
                    onClick={() => setLanguage(lang)}
                    className="bg-gray-300/50 text-gray-500 dark:text-white py-2 my-1"
                    disabled
                    value={lang}
                  >
                    {" "}
                    {LanguagesSupportedMap[lang]} (PRO)
                  </SelectItem>
                </Link>
              ))}
            </>
          )}
        </SelectContent>
      </Select>
    )
  );
};

export default LanguageSelect;
