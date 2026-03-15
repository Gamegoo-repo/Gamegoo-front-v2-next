import { InnerBox } from "@/shared/ui/board-detail-modal";

export function Comments({ comments }: { comments: string }) {
  return <InnerBox className="justify-start py-2">{comments}</InnerBox>;
}
