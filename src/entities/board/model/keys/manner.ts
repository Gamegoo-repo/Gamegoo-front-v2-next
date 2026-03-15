export const MANNER_QUERY_KEYS = {
  all: ["MannerLevel"] as const,
  detail: (memberId: number) => [...MANNER_QUERY_KEYS.all, memberId]
};
