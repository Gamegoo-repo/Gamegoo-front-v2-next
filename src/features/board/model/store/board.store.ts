import { create } from "zustand";

import { BoardTabs } from "@/entities/board/model/types/types";

type BoardStore = {
  boardTab: BoardTabs;

  setBoardTab: (boardTab: BoardTabs) => void;
};

export const useBoardStore = create<BoardStore>()((set) => ({
  boardTab: "in-game",

  setBoardTab: (boardTab) =>
    set(() => ({
      boardTab
    }))
}));
