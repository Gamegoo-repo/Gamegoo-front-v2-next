import { openapiClient } from "@/shared/api/openapiClient";
import { CACHE_KEYS, ERROR_MESSAGES } from "@/shared/constants";
import { normalizeSearchParam } from "@/shared/libs/normalizeSearchParam";

import { SearchParams } from "@/entities/board";
import { PostData } from "@/entities/post";

export const boardApi = {
  fetchBoardList: async (params: SearchParams): Promise<PostData> => {
    const isServer = typeof window === "undefined";

    const { data, error } = await openapiClient.GET("/api/v2/posts/list", {
      params: {
        query: {
          page: normalizeSearchParam(params.page),
          gameMode: params.mode,
          mainP: params.position,
          mike: params.voice
        }
      },
      cache: isServer ? "force-cache" : "no-store",
      next: isServer ? { tags: [CACHE_KEYS.board.all] } : undefined
    });

    if (error) throw error;
    if (!data.data) throw new Error(ERROR_MESSAGES.API("boardApi"));

    return data.data;
  }
};
