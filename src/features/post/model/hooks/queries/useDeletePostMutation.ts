import { useMutation, useQueryClient } from "@tanstack/react-query";

import { revalidateCacheTag } from "@/shared/api";
import { clientSideOpenapiClient } from "@/shared/api/clientSideOpenapiClient";
import { CACHE_KEYS } from "@/shared/constants";
import { toastMessage } from "@/shared/model";

import { POST_QUERY_KEYS } from "@/entities/post/constants/post.queryKeys";

export const useDeletePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (boardId: number) => {
      const { error } = await clientSideOpenapiClient.DELETE("/api/v2/posts/{boardId}", {
        params: { path: { boardId } },
        cache: "no-store"
      });

      if (error) {
        throw error;
      }
    },

    onSuccess: async () => {
      await revalidateCacheTag(CACHE_KEYS.board.all);

      queryClient.invalidateQueries({
        queryKey: POST_QUERY_KEYS.all
      });

      toastMessage.success("게시글이 삭제되었습니다.");
    }
  });
};
