"use client";

import { useModalStore } from "@/shared/store";
import { DialogModal } from "@/shared/ui/dialog";

import {
  type BoardData,
  CommentSection,
  CreatedAtSection,
  DetailedRecentPreferredChampionsSection,
  GameStyleSection,
  MannerKeywords,
  MannerLevelSection,
  PositionSection,
  PreferredSection,
  RankSection,
  RecentMatchesSection,
  TalkSection,
  ViewTypeSection,
  WinRateSection
} from "@/features/board";
import { useGetMannerDataQuery } from "@/features/board/";
import { usePostDetailQuery } from "@/features/post";
import { useFetchProfileQuery, useGetOtherProfileQuery } from "@/features/profile";

type BoardDetailModalProps = {
  boardId: string;
  boardData: BoardData;
};

export function BoardDetailModal({ boardId, boardData }: BoardDetailModalProps) {
  const { data: userInfo } = usePostDetailQuery(boardId, boardData);
  const { data: mannerData } = useGetMannerDataQuery(boardId, boardData);
  const { data: userDetail } = useGetOtherProfileQuery(boardData!.memberId!);
  const { data: myProfile } = useFetchProfileQuery();

  const open = useModalStore((s) => s.isBoardDetailModalOpen);
  const onOpenChange = useModalStore((s) => s.toggleBoardDetailModal);

  if (!boardData || !userInfo || !mannerData || !userDetail) return null;

  return (
    <DialogModal
      name={userInfo.gameName}
      open={open}
      myMemberId={myProfile?.id}
      onOpenChange={onOpenChange}
      imgNum={userInfo.profileImage}
      blocked={userDetail?.blocked}
      tag={userInfo.tag}
      memberId={userInfo.memberId}
      boardId={userInfo.boardId}
      friendRequestMemberId={userDetail!.friendRequestMemberId}
      description="상세 게시글"
      activeProfileDropdown
      routeBack
      nav={<ViewTypeSection />}
      submit={<TalkSection boardId={userInfo.boardId} />}
      items={[
        {
          id: "rank",
          viewType: "in-game",
          content: (
            <RankSection
              soloTier={userInfo.soloTier}
              soloRank={userInfo.soloRank}
              freeTier={userInfo.freeTier}
              freeRank={userInfo.freeRank}
            />
          )
        },
        {
          id: "position",
          viewType: "in-game",
          content: (
            <PositionSection
              mainP={userInfo.mainP}
              subP={userInfo.subP}
              wantP={userInfo.wantP}
            />
          )
        },
        {
          id: "preferred",
          viewType: "in-game",
          content: (
            <PreferredSection
              gameMode={userInfo.gameMode}
              mic={userInfo.mike === "AVAILABLE" ? true : false}
              championStatsResponseList={userInfo.championStatsResponseList}
              memberRecentStats={userInfo.memberRecentStats}
            />
          )
        },
        {
          id: "winRate",
          viewType: "in-game",
          content: <WinRateSection winRate={userInfo.winRate!} />
        },
        {
          id: "gameStyle",
          viewType: "in-game",
          content: <GameStyleSection gameStyles={userInfo.gameStyles} />
        },
        {
          id: "comment",
          viewType: "in-game",
          content: <CommentSection comment={userInfo.contents ?? ""} />
        },
        {
          id: "createdAt",
          viewType: "in-game",
          content: <CreatedAtSection createdAt={userInfo.createdAt} />
        },
        {
          id: "recentMatch",
          viewType: "recent-match",
          content: <RecentMatchesSection recentData={userInfo.memberRecentStats} />
        },
        {
          id: "detailedRecentPreferredChampions",
          viewType: "recent-match",
          content: (
            <DetailedRecentPreferredChampionsSection
              championStatsResponseList={userInfo.championStatsResponseList}
            />
          )
        },
        {
          id: "mannerLevel",
          viewType: "manners",
          content: <MannerLevelSection mannerData={mannerData} />
        },
        {
          id: "mannerKeywords",
          viewType: "manners",
          content: <MannerKeywords mannerData={mannerData} />
        }
      ]}
    />
  );
}
