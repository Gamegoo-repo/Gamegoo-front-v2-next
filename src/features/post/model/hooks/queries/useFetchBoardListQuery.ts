import { useSuspenseQuery } from "@tanstack/react-query";

import { SearchParams, boardApi } from "@/entities/board";
import { POST_QUERY_KEYS, PostData } from "@/entities/post";

export const useFetchBoardListQuery = (params: SearchParams) => {
  return useSuspenseQuery<PostData>({
    queryKey: POST_QUERY_KEYS.all,
    queryFn: async () => await boardApi.fetchBoardList(params)
  });
};
