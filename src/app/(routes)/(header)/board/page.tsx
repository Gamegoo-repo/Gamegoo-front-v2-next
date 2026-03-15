import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

import { SearchParams, boardApi } from "@/entities/board";
import { POST_QUERY_KEYS } from "@/entities/post";

import { BoardContainer, HeaderContainer } from "@/widgets/board";

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function page({ searchParams }: PageProps) {
  const params = await searchParams;

  const qc = new QueryClient();

  await qc.prefetchQuery({
    queryKey: POST_QUERY_KEYS.all,
    queryFn: async () => await boardApi.fetchBoardList(params)
  });

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <HeaderContainer />
      <BoardContainer params={params} />
    </HydrationBoundary>
  );
}
