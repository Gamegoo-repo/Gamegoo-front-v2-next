"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { DEV_AUTH_ENDPOINTS } from "../../../entities/auth/constants/dev.auth.endpoints";
import { useAuthStore } from "../../../features/auth";
import { clientSideOpenapiClient } from "../../../shared/api/clientSideOpenapiClient";

export default function TestLoginPage() {
  const { setAccessToken, setAuthStatus } = useAuthStore();
  const router = useRouter();
  const [memberId, setMemberId] = useState<number>(2);
  const [isLoading, setIsLoading] = useState(false);

  const handleTestLogin = async (id?: number) => {
    const targetId = id ?? memberId;
    setIsLoading(true);

    try {
      if (process.env.NODE_ENV !== "development") {
        alert("⚠️ 테스트 로그인은 개발 환경에서만 사용 가능합니다.");
        return;
      }

      // 테스트 토큰 가져오기
      const [url, options] = DEV_AUTH_ENDPOINTS.postDevAuth(targetId);
      const { data, error } = await clientSideOpenapiClient.GET(url, options);

      if (error || !data?.data) {
        console.error("Test login failed:", error);
        alert("테스트 로그인 실패");
        return;
      }

      const { accessToken, refreshToken } = data.data;

      if (!accessToken || !refreshToken) {
        alert("토큰을 받지 못했습니다.");
        return;
      }

      // 1. accessToken을 Zustand에 저장
      setAccessToken(accessToken);

      // 2. refreshToken을 HTTP-only 쿠키에 저장
      await fetch("/api/auth/store-refresh-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ refreshToken })
      });

      // 3. 사용자 정보 가져오기
      const userInfoResponse = await fetch("/api/auth/get-user-info");
      if (userInfoResponse.ok) {
        const userInfoData = await userInfoResponse.json();
        setAuthStatus("authenticated");
      }

      // 4. 홈으로 리다이렉트
      router.replace("/");
    } catch (error) {
      console.error("Login error:", error);
      alert("로그인 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 미리 설정된 테스트 계정들
  const testAccounts = [
    { id: 2, name: "테스트 사용자 2" },
    { id: 8, name: "테스트 사용자 8" },
    { id: 10, name: "테스트 사용자 10" }
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8">
        <div className="rounded-lg bg-white p-8 shadow-md">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-700">개발용 테스트 로그인</h2>
            <p className="mt-2 text-sm text-gray-500">개발 편의를 위한 로그인 페이지입니다.</p>
          </div>

          <div className="space-y-6">
            {/* 빠른 선택 버튼들 */}
            <div>
              <span className="mb-2 block text-sm font-medium text-gray-700">빠른 로그인</span>
              <div className="grid grid-cols-1 gap-2">
                {testAccounts.map((account) => (
                  <button
                    key={account.id}
                    className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm
font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-violet-500
focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                    type="button"
                    onClick={() => handleTestLogin(account.id)}
                    disabled={isLoading}
                  >
                    {account.name} (ID: {account.id})
                  </button>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">또는</span>
              </div>
            </div>

            <div>
              <label
                className="mb-2 block text-sm font-medium text-gray-700"
                htmlFor="memberId"
              >
                커스텀 Member ID
              </label>
              <div className="flex gap-2">
                <input
                  className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:ring-2
focus:ring-violet-500 focus:outline-none"
                  type="number"
                  value={memberId}
                  onChange={(e) => setMemberId(Number(e.target.value))}
                  placeholder="Member ID 입력"
                  min="1"
                />
                <button
                  className="rounded-md bg-violet-600 px-4 py-2 text-white transition-colors
hover:bg-violet-700 focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:outline-none
disabled:cursor-not-allowed disabled:opacity-50"
                  type="button"
                  onClick={() => handleTestLogin()}
                  disabled={isLoading || !memberId}
                >
                  {isLoading ? "로그인 중..." : "로그인"}
                </button>
              </div>
            </div>

            {/* 콘솔 사용법 안내 */}
            <div className="rounded-md bg-gray-100 p-4">
              <h3 className="mb-2 text-sm font-medium text-gray-700">💡 콘솔에서 직접 사용하기</h3>
              <code className="block overflow-x-auto rounded bg-gray-800 p-2 text-xs text-green-400">
                window.testLogin(2) {"// Member ID 2로 로그인"}
              </code>
            </div>

            {/* 경고 메시지 */}
            <div className="rounded-md border border-yellow-200 bg-yellow-50 p-4">
              <p className="text-sm text-yellow-800">
                ⚠️ 이 기능은 개발 환경에서만 사용 가능합니다. 프로덕션에서는 작동하지 않습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
