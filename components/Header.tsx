import React from "react";
import Logo from "./Logo";
import { DarkModeToggle } from "./DarkModeToggle";
import UserButton from "./UserButton";
import { getServerSession } from "next-auth";
import { getServerSessionCustom } from "@/auth";
import Link from "next/link";
import { MessagesSquareIcon } from "lucide-react";
import CreateChatButton from "./CreateChatButton";
import { useSubscriptionStore } from "@/store/store";
import UpgradeBanner from "./UpgradeBanner";
import LanguageSelect from "./LanguageSelect";

type Props = {};

const Header = async (props: Props) => {
  // Render landing & pricing page seperate route from normal one without auth and statically generate it
  const session = await getServerSessionCustom();
  console.log("session", session);
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900">
      <nav className="flex flex-col gap-2 sm:flex-row items-center p-5 pl-2 bg-white dark:bg-gray-900 max-w-7xl mx-auto">
        <Logo />
        <div className="flex-1 flex items-center justify-end space-x-4">
          {/* language select */}
          <LanguageSelect />
          {session ? (
            <>
              <Link href={"/chat"} prefetch={false}>
                <MessagesSquareIcon />
              </Link>
              <CreateChatButton />
            </>
          ) : (
            <Link href={"/pricing"}>Pricing</Link>
          )}
          <DarkModeToggle />
          <UserButton session={session} />
        </div>
      </nav>
      {/* upgrade banner */}
      <UpgradeBanner />
    </header>
  );
};

export default Header;
