import { serverSideOpenapiClient } from "@/shared/api/serverSideOpenApiClient";
import { CACHE_KEYS, ERROR_MESSAGES } from "@/shared/constants";

import { getAccessToken } from "@/entities/auth";

export const profileServerApi = {
  fetchMyProfile: async () => {
    const accessToken = await getAccessToken();

    if (!accessToken) return;

    const { data, error, response } = await serverSideOpenapiClient.GET("/api/v2/profile", {
      cache: "force-cache",
      next: {
        tags: [CACHE_KEYS.myProfile.all]
      }
    });

    if (response.status === 401) return;

    if (error) throw error;
    if (!data.data) throw new Error(ERROR_MESSAGES.API("profileApi - fetchMyProfile"));

    return data.data;
  },
  fetchOtherProfile: async (memberId: number) => {
    const accessToken = await getAccessToken();

    if (!accessToken) return;

    const { data, error, response } = await serverSideOpenapiClient.GET("/api/v2/profile/other", {
      params: {
        query: {
          id: memberId
        }
      },
      cache: "force-cache",
      next: {
        tags: [CACHE_KEYS.otherProfile.all, CACHE_KEYS.otherProfile.detail(memberId)]
      }
    });

    if (response.status === 401) return;

    if (error) throw error;
    if (!data.data) throw new Error(ERROR_MESSAGES.API("fetchOtherProfile"));

    return data.data;
  }
};
