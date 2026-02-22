"use client";

import { useQuery } from "@tanstack/react-query";

import { clientSideOpenapiClient } from "@/shared/api/clientSideOpenapiClient";
import { ERROR_MESSAGES } from "@/shared/constants";

import { PostDetail } from "@/entities/post";
import { POST_QUERY_KEYS } from "@/entities/post";

export const useFetchPostQuery = (boardId: number | undefined) => {
  return useQuery<PostDetail>({
    queryKey: boardId ? POST_QUERY_KEYS.detail(boardId) : [...POST_QUERY_KEYS.all, "post"],
    queryFn: async () => {
      const { data, error } = await clientSideOpenapiClient.GET("/api/v2/posts/list/{boardId}", {
        params: {
          path: {
            boardId: Number(boardId)
          }
        }
      });

      if (error) throw error;
      if (!data.data) throw new Error(ERROR_MESSAGES.QUERY("useFetchPostDetailQuery"));

      return data.data;
    },
    enabled: !!boardId
  });
};
