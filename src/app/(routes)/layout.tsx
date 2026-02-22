import type { Metadata } from "next";
import localFont from "next/font/local";
import { Suspense } from "react";
import { Toaster } from "sonner";

import "@/shared/styles/globals.css";
import { TooltipProvider } from "@/shared/ui/tooltip";

import { LoginRequiredModal } from "@/features/auth";

import { ReactQueryProvider } from "@/app/providers/ReactQueryProvider";

export const metadata: Metadata = {
  title: "겜구 - 롤 실시간 듀오 매칭 | GAMEGOO",
  icons: {
    icon: "/icons/gamegoo-icon.png"
  }
};

const pretendard = localFont({
  src: "../../../public/fonts/PretendardVariable.woff2"
});

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryProvider>
      <TooltipProvider>
        <html lang="ko">
          <body className={`${pretendard.className} text-gray-800`}>
            <Suspense>{children}</Suspense>
          </body>
        </html>
        <div className="pointer-events-auto">
          <Toaster richColors={true} />
        </div>
        <LoginRequiredModal />
      </TooltipProvider>
    </ReactQueryProvider>
  );
}

/**
 * FIX: 버그 수정
 *
 * TODO: 추가 사항
 * - FSD eslint 추가
 */
