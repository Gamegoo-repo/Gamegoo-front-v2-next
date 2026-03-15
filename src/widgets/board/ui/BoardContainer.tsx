"use client";

import { NoPost, SearchParams } from "@/entities/board";

import { BoardTable, Pagination } from "@/features/board";
import { useFetchBoardListQuery } from "@/features/post";
import { useFetchMyProfileQuery } from "@/features/profile";

export function BoardContainer({ params }: { params: SearchParams }) {
  const { data: myProfile } = useFetchMyProfileQuery();
  const { data: boardData } = useFetchBoardListQuery(params);

  const filteredBoardData = boardData.boards.filter(
    (board) =>
      (!params.mode || board.gameMode === params.mode) &&
      (params.position === "ANY" || !params.position || board.mainP === params.position) &&
      (!params.tier || board.tier === params.tier) &&
      (!params.voice || board.mike === params.voice)
  );

  return (
    <div className="flex flex-col items-center gap-10">
      <BoardTable
        myProfile={myProfile!}
        posts={filteredBoardData}
      />

      {boardData.boards.length === 0 ? (
        <NoPost />
      ) : (
        <Pagination
          totalPages={boardData.totalPages}
          currentPage={Number(params.page)}
        />
      )}
    </div>
  );
}
