import { useQuery } from "@tanstack/react-query";

import { clientSideOpenapiClient } from "@/shared/api/clientSideOpenapiClient";

import { OTHER_PROFILE_QUERY_KEYS } from "@/entities/profile";

import { OtherProfile } from "@/features/profile";

export const useGetOtherProfileQuery = (memberId: number) => {
  return useQuery<OtherProfile>({
    queryKey: [...OTHER_PROFILE_QUERY_KEYS.memberId(memberId)],
    queryFn: async () => {
      const { data, error } = await clientSideOpenapiClient.GET("/api/v2/profile/other", {
        params: {
          query: {
            id: memberId
          }
        }
      });

      if (error) throw error;
      if (!data.data) throw new Error("유저 정보를 받아오는 데 실패했습니다.");

      return data.data;
    }
  });
};
