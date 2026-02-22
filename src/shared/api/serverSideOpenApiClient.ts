import { cookies } from "next/headers";
import createClient, { Middleware } from "openapi-fetch";

import type { paths } from "./schema";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!API_BASE_URL) throw new Error("NEXT_PUBLIC_API_BASE_URL is missing");

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/"
};

const client = createClient<paths>({ baseUrl: API_BASE_URL });

const refreshTokens = async () => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) return null;

  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/refresh`, {
    method: "POST"
  });

  if (!res.ok) {
    // 원인 확인용 로그 (status/body)
    const body = await res.text().catch(() => "");
    console.error("[refresh] failed:", res.status, body);
    return null; // throw 대신 null 반환으로 전체 요청 크래시 방지
  }

  if (!res.ok) throw new Error("refresh 실패");

  const data = await res.json();

  const newAccessToken = data.accessToken;
  const newRefreshToken = data.refreshToken;

  if (!newAccessToken || !newRefreshToken) return null;

  cookieStore.set("accessToken", newAccessToken, cookieOptions);
  cookieStore.set("refreshToken", newRefreshToken, cookieOptions);

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken
  };
};

const authMiddleware: Middleware = {
  async onRequest({ request }) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (accessToken) {
      request.headers.set("Authorization", `Bearer ${accessToken}`);
    }

    return request;
  }
};

const refreshMiddleware: Middleware = {
  async onResponse({ request, response }) {
    if (response.status !== 401) {
      return response;
    }

    if (request.headers.get("x-refresh-attempt")) {
      return response;
    }

    const refreshed = await refreshTokens();

    if (!refreshed) return response;

    request.headers.set("Authorization", `Bearer ${refreshed.accessToken}`);
    request.headers.set("x-refresh-attempt", "true");

    return fetch(request.clone());
  }
};

export const serverSideOpenapiClient = (() => {
  client.use(authMiddleware);
  client.use(refreshMiddleware);

  return client;
})();
