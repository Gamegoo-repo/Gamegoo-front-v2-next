"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { revalidateCacheTag } from "@/shared/api";
import { clientSideOpenapiClient } from "@/shared/api/clientSideOpenapiClient";
import { CACHE_KEYS } from "@/shared/constants";
import { toastMessage } from "@/shared/model";

import { PostBody } from "@/entities/board";
import { POST_QUERY_KEYS } from "@/entities/post";

export const usePostMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ body }: { body: PostBody }) => {
      const { error } = await clientSideOpenapiClient.POST("/api/v2/posts", {
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
          toastMessage.success("게시글이 작성되었습니다.");
          router.replace("/board/?page=1");
        });
    },

    onError: () => {
      toastMessage.error("5분 후 다시 시도해 주세요.");
    }
  });
};
