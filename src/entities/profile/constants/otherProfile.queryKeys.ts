export const OTHER_PROFILE_QUERY_KEYS = {
  all: ["OtherProfile"] as const,
  memberId: (memberId: number) => [...OTHER_PROFILE_QUERY_KEYS.all, memberId]
};
