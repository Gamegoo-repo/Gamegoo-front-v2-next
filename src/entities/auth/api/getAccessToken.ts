"use server";

import { cookies } from "next/headers";

export const getAccessToken = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value ?? null;

  return {
    accessToken,
    authStatus: accessToken ? ("authenticated" as const) : ("unauthenticated" as const)
  };
};
