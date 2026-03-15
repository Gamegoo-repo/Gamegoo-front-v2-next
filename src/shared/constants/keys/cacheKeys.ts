export const CACHE_KEYS = {
  board: {
    all: "board-list",
    detail: (boardId: number) => `${CACHE_KEYS.board.all}-${boardId}`
  },
  manner: {
    all: "manner",
    detail: (memberId: number) => `${CACHE_KEYS.manner.all}-${memberId}`
  },
  myProfile: {
    all: "my-profile"
  },
  otherProfile: {
    all: "other-profile",
    detail: (memberId: number) => `${CACHE_KEYS.otherProfile.all}-${memberId}`
  }
};
