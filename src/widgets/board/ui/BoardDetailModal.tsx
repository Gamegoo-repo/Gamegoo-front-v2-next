"use client";

import { useModalStore } from "@/shared/store";
import { DialogModal } from "@/shared/ui/dialog";

import {
  BoardTabSection,
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
  WinRateSection,
  useFetchMannerDataQuery
} from "@/features/board";
import { useFetchPostDetailSuspenseQuery } from "@/features/post";
import { useFetchMyProfileQuery, useFetchOtherProfileQuery } from "@/features/profile";

type BoardDetailModalProps = {
  boardId: number;
  fromExternal?: boolean;
};

export function BoardDetailModal({ boardId, fromExternal }: BoardDetailModalProps) {
  const { data: boardData } = useFetchPostDetailSuspenseQuery(boardId);
  const { data: myProfile } = useFetchMyProfileQuery();
  const { data: otherProfile } = useFetchOtherProfileQuery(boardData.memberId!, myProfile?.id);
  const { data: mannerData } = useFetchMannerDataQuery(boardData.memberId!);

  return (
    <DialogModal
      name={boardData.gameName}
      open={true}
      myMemberId={myProfile?.id}
      imgNum={boardData.profileImage}
      blocked={otherProfile?.blocked}
      tag={boardData.tag}
      memberId={boardData.memberId}
      boardId={boardData.boardId}
      friendRequestMemberId={otherProfile?.friendRequestMemberId}
      description="상세 게시글"
      activeProfileDropdown
      routeBack
      fromExternal={fromExternal}
      nav={<BoardTabSection />}
      submit={
        <TalkSection
          boardData={boardData}
          myMemberId={myProfile?.id}
        />
      }
      items={[
        {
          id: "rank",
          boardTab: "in-game",
          content: (
            <RankSection
              soloTier={boardData.soloTier}
              soloRank={boardData.soloRank}
              freeTier={boardData.freeTier}
              freeRank={boardData.freeRank}
            />
          )
        },
        {
          id: "position",
          boardTab: "in-game",
          content: (
            <PositionSection
              mainP={boardData.mainP}
              subP={boardData.subP}
              wantP={boardData.wantP}
            />
          )
        },
        {
          id: "preferred",
          boardTab: "in-game",
          content: (
            <PreferredSection
              gameMode={boardData.gameMode}
              mic={boardData.mike === "AVAILABLE" ? true : false}
              championStatsResponseList={boardData.championStatsResponseList}
              memberRecentStats={boardData.memberRecentStats}
            />
          )
        },
        {
          id: "winRate",
          boardTab: "in-game",
          content: <WinRateSection winRate={boardData.winRate!} />
        },
        {
          id: "gameStyle",
          boardTab: "in-game",
          content: <GameStyleSection gameStyles={boardData.gameStyles} />
        },
        {
          id: "comment",
          boardTab: "in-game",
          content: <CommentSection comment={boardData.contents ?? ""} />
        },
        {
          id: "createdAt",
          boardTab: "in-game",
          content: <CreatedAtSection createdAt={boardData.createdAt} />
        },
        {
          id: "recentMatch",
          boardTab: "recent-match",
          content: <RecentMatchesSection recentData={boardData.memberRecentStats} />
        },
        {
          id: "detailedRecentPreferredChampions",
          boardTab: "recent-match",
          content: (
            <DetailedRecentPreferredChampionsSection
              championStatsResponseList={boardData.championStatsResponseList}
            />
          )
        },
        {
          id: "mannerLevel",
          boardTab: "manner",
          content: <MannerLevelSection mannerData={mannerData} />
        },
        {
          id: "mannerKeywords",
          boardTab: "manner",
          content: <MannerKeywords mannerData={mannerData} />
        }
      ]}
    />
  );
}
