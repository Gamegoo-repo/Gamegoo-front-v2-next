import { clientSideOpenapiClient } from "@/shared/api/clientSideOpenapiClient";

import { MyProfile, PROFILE_ENDPOINTS } from "@/entities/profile";

export const profileClientApi = {
  fetchProfile: async (): Promise<MyProfile> => {
    const [url, options] = PROFILE_ENDPOINTS.fetchProfile();
    const { data, error } = await clientSideOpenapiClient.GET(url, options);

    if (error || !data.data) {
      throw new Error("프로필 조회 실패");
    }

    return data.data;
  }
};
