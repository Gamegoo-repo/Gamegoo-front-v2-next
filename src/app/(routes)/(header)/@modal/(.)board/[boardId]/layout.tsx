import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

import { MANNER_QUERY_KEYS } from "@/entities/board";
import { POST_QUERY_KEYS } from "@/entities/post";
import { postApi } from "@/entities/post/index-server";
import { profileApiGuest } from "@/entities/profile";

type BoardIdaLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ boardId: string }>;
};

export default async function BoardIdLayout({ children, params }: BoardIdaLayoutProps) {
  const { boardId } = await params;

  const qc = new QueryClient();

  const boardData = await qc.fetchQuery({
    queryKey: POST_QUERY_KEYS.detail(Number(boardId)),
    queryFn: async () => await postApi.fetchPostDetail(Number(boardId))
  });

  await qc.prefetchQuery({
    queryKey: MANNER_QUERY_KEYS.detail(boardData.memberId!),
    queryFn: async () => await profileApiGuest.fetchMannerData(boardData.memberId!)
  });

  return <HydrationBoundary state={dehydrate(qc)}>{children}</HydrationBoundary>;
}
