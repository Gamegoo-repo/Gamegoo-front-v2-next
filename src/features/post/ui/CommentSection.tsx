import { OuterBox } from "@/shared/ui/board-detail-modal";

import { Comment } from "@/features/board";

export function CommentSection() {
  return (
    <OuterBox label="한마디">
      <Comment />
    </OuterBox>
  );
}
