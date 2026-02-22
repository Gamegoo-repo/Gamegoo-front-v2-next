"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { clientSideOpenapiClient } from "@/shared/api/clientSideOpenapiClient";
import { ERROR_MESSAGES } from "@/shared/constants";

import { PostDetail } from "@/entities/post";
import { POST_QUERY_KEYS } from "@/entities/post";

export const useFetchPostDetailSuspenseQuery = (boardId: number) => {
  return useSuspenseQuery<PostDetail>({
    queryKey: POST_QUERY_KEYS.detail(boardId),
    queryFn: async () => {
      const { data, error } = await clientSideOpenapiClient.GET("/api/v2/posts/list/{boardId}", {
        params: {
          path: {
            boardId: Number(boardId)
          }
        }
      });

      if (error) throw error;
      if (!data.data) throw new Error(ERROR_MESSAGES.QUERY("useFetchPostDetailSuspenseQuery"));

      return data.data;
    }
  });
};
