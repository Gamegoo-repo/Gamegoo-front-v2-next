import { useQuery } from "@tanstack/react-query";

import { clientSideOpenapiClient } from "@/shared/api/clientSideOpenapiClient";
import { ERROR_MESSAGES } from "@/shared/constants";

import { OTHER_PROFILE_QUERY_KEYS } from "@/entities/profile";

import { OtherProfile } from "@/features/profile";

export const useFetchOtherProfileQuery = (memberId: number, id: number | undefined) => {
  return useQuery<OtherProfile>({
    queryKey: [...OTHER_PROFILE_QUERY_KEYS.detail(memberId)],
    queryFn: async () => {
      const { data, error } = await clientSideOpenapiClient.GET("/api/v2/profile/other", {
        params: {
          query: {
            id: memberId
          }
        }
      });

      if (error) throw error;
      if (!data.data) throw new Error(ERROR_MESSAGES.QUERY("useFetchOtherProfileQuery"));

      return data.data;
    },
    enabled: !!id
  });
};
