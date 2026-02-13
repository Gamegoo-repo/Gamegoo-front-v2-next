export const GET_MANNER_LEVEL = {
  all: ["GetMannerLevel"] as const,
  memberId: (memberId: number) => [...GET_MANNER_LEVEL.all, memberId]
};
