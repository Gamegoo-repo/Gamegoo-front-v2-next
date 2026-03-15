import { OuterBox } from "@/shared/ui/board-detail-modal";

import { Comments } from "@/entities/board";

export function CommentSection({ comment }: { comment: string }) {
  return (
    <OuterBox label="한마디">
      <Comments comments={comment} />
    </OuterBox>
  );
}
