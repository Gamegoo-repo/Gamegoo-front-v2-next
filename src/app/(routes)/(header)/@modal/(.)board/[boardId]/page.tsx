import { BoardDetailModal } from "@/widgets/board";

// FIX: generateMetadata 사용
// export async function generateMetadata({ params }: { params: Promise<{ boardId: string }> }) {
//   const { boardId } = await params;
// }

export default async function page({ params }: { params: Promise<{ boardId: string }> }) {
  const { boardId } = await params;

  return <BoardDetailModal boardId={Number(boardId)} />;
}
