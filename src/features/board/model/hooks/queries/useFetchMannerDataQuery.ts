import { useQuery } from "@tanstack/react-query";

import { clientSideOpenapiClient } from "@/shared/api/clientSideOpenapiClient";
import { ERROR_MESSAGES } from "@/shared/constants";

import { MANNER_QUERY_KEYS } from "@/entities/board";
import { MannerData } from "@/entities/post";

export const useFetchMannerDataQuery = (memberId: number) => {
  return useQuery<MannerData>({
    queryKey: MANNER_QUERY_KEYS.detail(memberId),
    queryFn: async () => {
      const { data: mannerLevel, error: mannerLevelError } = await clientSideOpenapiClient.GET(
        "/api/v2/manner/level/{memberId}",
        {
          params: {
            path: {
              memberId
            }
          }
        }
      );

      if (mannerLevelError) throw mannerLevelError;
      if (!mannerLevel.data)
        throw new Error(ERROR_MESSAGES.QUERY("useFetchMannerDataQuery - mannerLevel"));

      const { data: mannerKeywords, error: mannerKeywordsError } =
        await clientSideOpenapiClient.GET("/api/v2/manner/keyword/{memberId}", {
          params: {
            path: {
              memberId
            }
          }
        });

      if (mannerKeywordsError) throw mannerKeywordsError;
      if (!mannerKeywords.data)
        throw new Error(ERROR_MESSAGES.QUERY("useFetchMannerDataQuery - mannerKeywords"));

      return {
        mannerLevel: mannerLevel.data.mannerLevel,
        mannerRank: mannerLevel.data.mannerRank,
        mannerRatingCount: mannerLevel.data.mannerRatingCount,
        mannerKeywords: mannerKeywords.data.mannerKeywords
      };
    }
  });
};
