import { NextRequest, NextResponse } from "next/server";

import { authCookies } from "@/shared/libs/cookies/cookies";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as { refreshToken?: string; accessToken?: string };
  const refreshToken = body?.refreshToken;
  const accessToken = body?.accessToken;

  if (!refreshToken) {
    return NextResponse.json({ message: "refreshToken not found" }, { status: 400 });
  }

  if (!accessToken) {
    return NextResponse.json({ message: "accessToken not found" }, { status: 400 });
  }

  const res = NextResponse.json({ ok: true });

  authCookies.setRefreshToken(res, refreshToken);
  authCookies.setAccessToken(res, accessToken);

  return res;
}
