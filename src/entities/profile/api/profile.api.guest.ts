import { openapiClient } from "@/shared/api/openapiClient";
import { CACHE_KEYS, ERROR_MESSAGES } from "@/shared/constants";

export const profileApiGuest = {
  fetchMannerData: async (memberId: number) => {
    const fetchMannerLevel = async () => {
      return openapiClient.GET("/api/v2/manner/level/{memberId}", {
        params: {
          path: {
            memberId
          }
        },
        cache: "force-cache",
        next: {
          tags: [CACHE_KEYS.manner.all, CACHE_KEYS.manner.detail(memberId)]
        }
      });
    };

    const fetchMannerKeywords = async () => {
      return openapiClient.GET("/api/v2/manner/keyword/{memberId}", {
        params: {
          path: {
            memberId
          }
        },
        cache: "force-cache",
        next: {
          tags: [CACHE_KEYS.manner.all, CACHE_KEYS.manner.detail(memberId)]
        }
      });
    };

    const [mannerLevel, mannerKeywords] = await Promise.all([
      fetchMannerLevel(),
      fetchMannerKeywords()
    ]);

    if (mannerLevel.error) throw mannerLevel.error;
    if (!mannerLevel.data.data)
      throw new Error(ERROR_MESSAGES.QUERY("fetchMannerData - mannerLevel"));

    if (mannerKeywords.error) throw mannerKeywords.error;
    if (!mannerKeywords.data.data)
      throw new Error(ERROR_MESSAGES.QUERY("fetchMannerData - mannerKeywords"));

    return {
      mannerLevel: mannerLevel.data.data.mannerLevel,
      mannerRank: mannerLevel.data.data.mannerRank,
      mannerRatingCount: mannerLevel.data.data.mannerRatingCount,
      mannerKeywords: mannerKeywords.data.data.mannerKeywords
    };
  }
};
