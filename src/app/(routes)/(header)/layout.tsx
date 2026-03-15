import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { Suspense } from "react";

import { getAccessToken } from "@/entities/auth";
import { MY_PROFILE_QUERY_KEYS } from "@/entities/profile";
import { profileServerApi } from "@/entities/profile/index-server";

import { ChatWidget } from "@/widgets/chat";
import { Header } from "@/widgets/header";

import { InitAuthProvider } from "@/app/providers/InitAuthProvider";
import { SocketProvider } from "@/app/providers/SocketProvider";

export default async function ContentsLayout({
  children,
  modal
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const qc = new QueryClient();

  const { authStatus } = await getAccessToken();

  if (authStatus === "authenticated") {
    qc.prefetchQuery({
      queryKey: MY_PROFILE_QUERY_KEYS.all,
      queryFn: async () => await profileServerApi.fetchMyProfile()
    });
  }

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <Suspense>
        <InitAuthProvider>
          <SocketProvider>
            <div className="mx-auto my-20 max-w-7xl">
              <Header />
              <main>
                <div>{children}</div>
                <div>{modal}</div>
              </main>
            </div>

            <div className="fixed right-8 bottom-8 z-40">
              <ChatWidget />
            </div>
          </SocketProvider>
        </InitAuthProvider>
      </Suspense>
    </HydrationBoundary>
  );
}
