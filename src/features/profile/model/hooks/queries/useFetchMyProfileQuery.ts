import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { MY_PROFILE_QUERY_KEYS, MyProfile, profileClientApi } from "@/entities/profile";

import { useAuthStore } from "@/features/auth";

export const useFetchMyProfileQuery = () => {
  const authStatus = useAuthStore((s) => s.authStatus);

  return useQuery<MyProfile>({
    queryKey: MY_PROFILE_QUERY_KEYS.all,
    queryFn: () => profileClientApi.fetchProfile(),
    placeholderData: keepPreviousData,
    enabled: authStatus === "authenticated"
  });
};
