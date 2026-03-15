import { RequestPostLists } from "@/entities/post";

export const POST_END_POINTS = {
  postList: (params: RequestPostLists) => {
    return [
      "/api/v2/posts/list",
      {
        params: {
          query: {
            page: params.page,
            gameMode: params.gameMode,
            tier: params.tier,
            mainP: params.mainP,
            subP: params.subP,
            mike: params.mike
          }
        }
      }
    ] as const;
  }
} as const;
