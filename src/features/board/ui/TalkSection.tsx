import { Button } from "@/shared/ui/button";

import { PostDetail } from "@/entities/post";

import { useEnterChatFromBoardMutation } from "@/features/chat";

type TalkSectionProps = {
  boardData: PostDetail;
  myMemberId: number | undefined;
};

export function TalkSection({ boardData, myMemberId }: TalkSectionProps) {
  const enterChat = useEnterChatFromBoardMutation();

  return (
    <>
      {boardData.memberId !== myMemberId && (
        <Button
          className="h-14 w-full"
          size="default-big"
          autoFocus
          onClick={() => enterChat.mutate({ boardId: boardData.boardId })}
        >
          말 걸어보기
        </Button>
      )}
    </>
  );
}
