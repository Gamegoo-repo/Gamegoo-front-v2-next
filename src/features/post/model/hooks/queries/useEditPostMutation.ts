"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";

import { revalidateCacheTag } from "@/shared/api";
import { revalidatePathTag } from "@/shared/api/cache/revalidateCachePath";
import { clientSideOpenapiClient } from "@/shared/api/clientSideOpenapiClient";
import { CACHE_KEYS } from "@/shared/constants";
import { toastMessage } from "@/shared/model";

import { PostBody } from "@/entities/board";
import { POST_QUERY_KEYS, PostData, PostDetail } from "@/entities/post";

export const useEditPostMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const searchParams = useSearchParams();

  return useMutation({
    // 1. onMutate: 실제 API(통신)가 호출되기 직전에 실행됩니다. (Optimistic UI 세팅)
    onMutate: async ({ body, boardId }) => {
      // 진행 중인 모든 포스트 리스트나 디테일 쿼리 요청을 취소합니다. (Race condition 방지)
      await queryClient.cancelQueries({ queryKey: POST_QUERY_KEYS.all });
      await queryClient.cancelQueries({ queryKey: POST_QUERY_KEYS.detail(boardId) });

      // 이전 상태(혹시 에러 났을 때를 대비한 백업)
      const previousListData = queryClient.getQueryData<PostData>(POST_QUERY_KEYS.all);
      const previousDetailData = queryClient.getQueryData<PostDetail>(
        POST_QUERY_KEYS.detail(boardId)
      );

      // [낙관적 업데이트 - 디테일 데이터 수정]
      if (previousDetailData) {
        queryClient.setQueryData<PostDetail>(POST_QUERY_KEYS.detail(boardId), {
          ...previousDetailData,
          mainP: body.mainP,
          subP: body.subP,
          wantP: body.wantP,
          gameMode: body.gameMode,
          gameStyles: body.gameStyles ?? [],
          mike: body.mike!,
          contents: body.contents
        });
      }

      // [낙관적 업데이트 - 리스트 데이터 수정 (선택사항, 리스트에도 데이터가 보인다면 활용)]
      if (previousListData) {
        queryClient.setQueryData<PostData>(POST_QUERY_KEYS.all, {
          ...previousListData,
          boards: previousListData.boards.map((board) =>
            board.boardId === boardId
              ? { ...board, mainP: body.mainP /* 필요한 정보만 덮어쓰기 */ }
              : board
          )
        });
      }

      // context를 리턴하여 에러 시 롤백에 사용
      return { previousListData, previousDetailData, boardId };
    },

    // 2. mutationFn: 실제 API 통신 구역
    mutationFn: async ({ body, boardId }: { body: PostBody; boardId: number }) => {
      const { error } = await clientSideOpenapiClient.PUT("/api/v2/posts/{boardId}", {
        params: { path: { boardId } },
        body
      });

      if (error) throw error;
    },

    // 3. onError: API 요청이 실패한 경우, onMutate에서 백업한 데이터로 롤백합니다.
    onError: (error, _variables, context) => {
      if (context?.previousListData) {
        queryClient.setQueryData(POST_QUERY_KEYS.all, context.previousListData);
      }
      if (context?.previousDetailData) {
        queryClient.setQueryData(
          POST_QUERY_KEYS.detail(context.boardId),
          context.previousDetailData
        );
      }
      toastMessage.error("게시물 수정에 실패했습니다.");
    },

    // 4. onSuccess: 성공 시 서버 캐시 날리고 페이지 이동을 깔끔하게 처리
    onSuccess: async (_, variables) => {
      await revalidatePathTag(`/board/${variables.boardId}`);

      await queryClient.invalidateQueries({ queryKey: POST_QUERY_KEYS.all });
      await queryClient.invalidateQueries({ queryKey: POST_QUERY_KEYS.detail(variables.boardId) });

      router.refresh();

      // 수정 페이지 모달 닫고 리스트로 교체
      router.replace(`/board/?page=${searchParams.get("page")}`);
      toastMessage.success("게시물이 수정되었습니다.");
    },

    // 5. onSettled: 성공/실패 여부와 상관없이 마지막에 안전을 위해 실제 데이터를 한 번 더 당겨오게 합니다.
    onSettled: async (data, error, variables) => {
      await queryClient.invalidateQueries({ queryKey: POST_QUERY_KEYS.all });
      await queryClient.invalidateQueries({ queryKey: POST_QUERY_KEYS.detail(variables.boardId) });
    }
  });
};
