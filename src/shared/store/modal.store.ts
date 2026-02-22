import { create } from "zustand";

type ModalStore = {
  isChatWidgetOpen: boolean;
  isPostModalOpen: boolean;
  isEditModalOpen: boolean;

  toggleChatWidget: () => void;
  togglePostModal: () => void;
  toggleEditModal: () => void;
};
export const useModalStore = create<ModalStore>()((set) => ({
  isChatWidgetOpen: false,
  isPostModalOpen: false,
  isEditModalOpen: false,

  toggleChatWidget: () =>
    set((state) => ({
      isChatWidgetOpen: !state.isChatWidgetOpen
    })),
  togglePostModal: () =>
    set((state) => ({
      isPostModalOpen: !state.isPostModalOpen
    })),
  toggleEditModal: () =>
    set((state) => ({
      isEditModalOpen: !state.isEditModalOpen
    }))
}));
