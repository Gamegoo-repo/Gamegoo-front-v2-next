import { openapiClient } from "@/shared/api/openapiClient";
import { ERROR_MESSAGES } from "@/shared/constants";
import { CACHE_KEYS } from "@/shared/constants/keys/cacheKeys";

export const postApi = {
  fetchPostDetail: async (boardId: number) => {
    const { data, error } = await openapiClient.GET("/api/v2/posts/list/{boardId}", {
      params: {
        path: {
          boardId
        }
      },
      cache: "force-cache",
      next: {
        tags: [CACHE_KEYS.board.detail(boardId)]
      }
    });

    if (error) throw error;
    if (!data.data) throw new Error(ERROR_MESSAGES.API("fetchBoardDetail"));

    return data.data;
  }
};
