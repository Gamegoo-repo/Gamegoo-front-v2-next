"use client";

import Link from "next/link";

import { ProfileButton } from "../../profile";
import { useAuthStore } from "../model/store/auth.store";

export function LoginButton() {
  const { authStatus } = useAuthStore();

  if (authStatus === "idle") return null;

  return (
    <>{authStatus === "authenticated" ? <ProfileButton /> : <Link href="/login">로그인</Link>}</>
  );
}
