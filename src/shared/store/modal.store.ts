import { create } from "zustand";

type ModalStore = {
  isBoardDetailModalOpen: boolean;
  isPostModalOpen: boolean;
  isChatWidgetOpen: boolean;

  toggleBoardDetailModal: () => void;
  togglePostModal: () => void;
  toggleChatWidget: () => void;
};

export const useModalStore = create<ModalStore>()((set) => ({
  isBoardDetailModalOpen: true,
  isPostModalOpen: true,
  isChatWidgetOpen: false,

  toggleBoardDetailModal: () =>
    set((state) => ({
      isBoardDetailModalOpen: !state.isBoardDetailModalOpen
    })),
  togglePostModal: () =>
    set((state) => ({
      isPostModalOpen: !state.isPostModalOpen
    })),
  toggleChatWidget: () =>
    set((state) => ({
      isChatWidgetOpen: !state.isChatWidgetOpen
    }))
}));
