"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";

import { revalidateCacheTag } from "@/shared/api";
import { clientSideOpenapiClient } from "@/shared/api/clientSideOpenapiClient";
import { CACHE_KEYS } from "@/shared/constants";
import { toastMessage } from "@/shared/model";

import { PostBody } from "@/entities/board";
import { POST_QUERY_KEYS } from "@/entities/post";

export const useEditPostMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const searchParams = useSearchParams();

  return useMutation({
    mutationFn: async ({ body, boardId }: { body: PostBody; boardId: number }) => {
      const { error } = await clientSideOpenapiClient.PUT("/api/v2/posts/{boardId}", {
        params: {
          path: {
            boardId: Number(boardId)
          }
        },
        body,
        cache: "no-store"
      });

      if (error) throw error;
    },

    onSuccess: () => {
      revalidateCacheTag(CACHE_KEYS.board.all);

      queryClient
        .invalidateQueries({
          queryKey: POST_QUERY_KEYS.all
        })
        .then(() => {
          router.replace(`/board/?page=${searchParams.get("page")}`);
          toastMessage.success("게시물이 수정되었습니다.");
        });
    }
  });
};
