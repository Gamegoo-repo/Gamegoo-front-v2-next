import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { StartChat } from "@/entities/chat";

type ChatStatus = "ACTIVE" | "INACTIVE";
type System = {
  flag: number;
  boardId: number;
};

type ChatStore = {
  status: ChatStatus;
  uuid: string;
  data: StartChat | null;
  system: System | null;

  setStatus: (status: ChatStatus) => void;
  setUuid: (uuid: string) => void;
  setData: (data: StartChat) => void;
  setSystem: (system: System | null) => void;
};

export const useChatStore = create<ChatStore>()(
  devtools((set) => ({
    status: "INACTIVE",
    uuid: "",
    data: null,
    system: null,

    setStatus: (status) => set({ status }),
    setUuid: (uuid) => set({ uuid }),
    setData: (data) => set({ data }),
    setSystem: (system) => set({ system })
  }))
);
