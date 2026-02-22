import { SearchParams } from "@/entities/board";

import { BoardContainer, BoardDetailModal, HeaderContainer } from "@/widgets/board";

type PageProps = {
  searchParams: Promise<SearchParams>;
  params: Promise<{ boardId: string }>;
};

export default async function page({ searchParams, params }: PageProps) {
  const { boardId } = await params;
  const props = await searchParams;

  return (
    <>
      <HeaderContainer />
      <BoardContainer params={props} />

      <BoardDetailModal
        fromExternal
        boardId={Number(boardId)}
      />
    </>
  );
}
