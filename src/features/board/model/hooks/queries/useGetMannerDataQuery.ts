import { useQuery } from "@tanstack/react-query";

import { clientSideOpenapiClient } from "@/shared/api/clientSideOpenapiClient";

import { GET_MANNER_LEVEL } from "@/entities/board";

import { BoardData, MannerData } from "@/features/board";
import { usePostDetailQuery } from "@/features/post";

export const useGetMannerDataQuery = (boardId: string, boardData: BoardData) => {
  const { data: userInfo } = usePostDetailQuery(boardId, boardData);

  return useQuery<MannerData>({
    queryKey: GET_MANNER_LEVEL.memberId(userInfo!.memberId!),
    queryFn: async () => {
      const { data: mannerLevel, error: mannerLevelError } = await clientSideOpenapiClient.GET(
        "/api/v2/manner/level/{memberId}",
        {
          params: {
            path: {
              memberId: userInfo!.memberId!
            }
          }
        }
      );

      if (mannerLevelError) throw mannerLevelError;
      if (!mannerLevel.data) throw new Error("매너 레벨 API 에러");

      const { data: mannerKeywords, error: mannerKeywordsError } =
        await clientSideOpenapiClient.GET("/api/v2/manner/keyword/{memberId}", {
          params: {
            path: {
              memberId: userInfo!.memberId!
            }
          }
        });

      if (mannerKeywordsError) throw mannerKeywordsError;
      if (!mannerKeywords.data) throw new Error("매너 키워드 API 에러");

      return {
        mannerLevel: mannerLevel.data.mannerLevel,
        mannerRank: mannerLevel.data.mannerRank,
        mannerRatingCount: mannerLevel.data.mannerRatingCount,
        mannerKeywords: mannerKeywords.data.mannerKeywords
      };
    },
    enabled: !!userInfo?.memberId
  });
};
