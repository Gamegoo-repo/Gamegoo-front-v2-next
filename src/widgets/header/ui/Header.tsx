"use client";

import { GamegooLogo } from "@/shared/ui/logo";

import { LoginButton, useAuthStore } from "@/features/auth";
import Notification from "@/features/notification/ui/Notification";

import { Nav } from "@/widgets/header";

export function Header() {
  const { authStatus } = useAuthStore();
  return (
    <header className="flex justify-between">
      <div className="flex gap-8">
        <GamegooLogo
          className="w-32"
          asLink
        />
        <Nav />
      </div>
      <div className="flex items-center gap-[36px]">
        {authStatus === "authenticated" && <Notification />}
        <LoginButton />
      </div>
    </header>
  );
}
