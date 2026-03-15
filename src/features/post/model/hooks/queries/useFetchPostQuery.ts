import { useQuery } from "@tanstack/react-query";

import { openapiClient } from "@/shared/api/openapiClient";
import { ERROR_MESSAGES } from "@/shared/constants";

import { PostDetail } from "@/entities/post";
import { POST_QUERY_KEYS } from "@/entities/post";

export const useFetchPostQuery = (boardId: number) => {
  return useQuery<PostDetail>({
    queryKey: POST_QUERY_KEYS.detail(boardId),
    queryFn: async () => {
      const { data, error } = await openapiClient.GET("/api/v2/posts/list/{boardId}", {
        params: {
          path: {
            boardId
          }
        },
        cache: "no-store"
      });

      if (error) throw error;
      if (!data.data) throw new Error(ERROR_MESSAGES.QUERY("useFetchPostDetailQuery"));

      return data.data;
    },
    enabled: !!boardId
  });
};
