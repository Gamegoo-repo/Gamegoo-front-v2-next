import { SearchParams } from "@/entities/board";

export const POST_QUERY_KEYS = {
  all: ["PostList"] as const,
  detail: (boardId: number) => [...POST_QUERY_KEYS.all, boardId],
  params: (params: SearchParams) => [...POST_QUERY_KEYS.all, params]
} as const;
