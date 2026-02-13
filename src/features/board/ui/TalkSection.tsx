import { useModalStore } from "@/shared/store";
import { Button } from "@/shared/ui/button";

import { useEnterChatFromBoardMutation } from "@/features/chat";

export function TalkSection({ boardId }: { boardId: number }) {
  const enterChat = useEnterChatFromBoardMutation();

  const toggleBoardDetailModal = useModalStore((s) => s.toggleBoardDetailModal);

  return (
    <Button
      className="h-14 w-full"
      size="default-big"
      autoFocus
      onClick={() => {
        toggleBoardDetailModal();
        enterChat.mutate({ boardId });
      }}
    >
      말 걸어보기
    </Button>
  );
}
