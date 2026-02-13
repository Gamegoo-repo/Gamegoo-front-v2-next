"use client";

import { cn } from "@/shared/libs/cn";
import { getPositionIcon, getTierIcon } from "@/shared/model/getIcon";
import { useModalStore } from "@/shared/store";
import { Button } from "@/shared/ui/button";
import { DialogModal } from "@/shared/ui/dialog";

import {
  ChampionStatsResponseList,
  Comments,
  GameStyle,
  MainOrSubPosition,
  PreferredGameMode,
  Rank,
  RecentPreferredChampions,
  WantPosition,
  WinRate,
  createdAtFormat
} from "@/entities/board";

import { type BoardData, type GameMode, type Position, type Tier } from "@/features/board";
import { useEnterChatFromBoardMutation } from "@/features/chat";
import { usePostDetailQuery } from "@/features/post";

type BoardDetailModalProps = {
  boardId: string;
  boardData: BoardData;
};

export function BoardDetailModal({ boardId, boardData }: BoardDetailModalProps) {
  const { data: userInfo } = usePostDetailQuery(boardId, boardData);

  const open = useModalStore((s) => s.isBoardDetailModalOpen);
  const onOpenChange = useModalStore((s) => s.toggleBoardDetailModal);

  if (!boardData || !userInfo) return null;

  return (
    <DialogModal
      name={userInfo.gameName}
      open={open}
      onOpenChange={onOpenChange}
      imgNum={userInfo.profileImage}
      tag={userInfo.tag}
      description="상세 게시글"
      activeCopy
      routeBack
      items={[
        {
          id: "rank",
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
          content: (
            <PositionSection
              mainP={userInfo.mainP}
              subP={userInfo.subP}
              wantP={userInfo.wantP}
            />
          )
        },
        {
          id: "preferredGameMode",
          content: (
            <PreferredGameModeSection
              gameMode={userInfo.gameMode}
              championStatsResponseList={userInfo.championStatsResponseList}
            />
          )
        },
        {
          id: "winRate",
          content: <WinRateSection winRate={userInfo.winRate!} />
        },
        {
          id: "gameStyle",
          content: <GameStyleSection gameStyles={userInfo.gameStyles} />
        },
        {
          id: "comment",
          content: <CommentSection comment={userInfo.contents ?? ""} />
        },
        {
          id: "createdAt",
          content: <CreatedAtSection createdAt={userInfo.createdAt} />
        },
        {
          id: "talk",
          content: <TalkSection boardId={Number(boardId)} />
        }
      ]}
    />
  );
}

type RankSectionProps = {
  soloTier: Tier;
  soloRank: number;
  freeTier: Tier;
  freeRank: number;
};

function RankSection({ soloTier, soloRank, freeTier, freeRank }: RankSectionProps) {
  const SoloTierIcon = getTierIcon(soloTier);
  const FreeTierIcon = getTierIcon(freeTier);

  return (
    <section className="flex items-center gap-4 *:flex-1">
      <Rank
        Icon={SoloTierIcon}
        tier={soloTier}
        rank={soloRank}
        gameType="솔로랭크"
      />
      <Rank
        Icon={FreeTierIcon}
        tier={freeTier}
        rank={freeRank}
        gameType="자유랭크"
      />
    </section>
  );
}

type PositionSectionProps = {
  mainP: Position;
  subP: Position;
  wantP: Position[];
};

function PositionSection({ mainP, subP, wantP }: PositionSectionProps) {
  const MainPositionIcon = getPositionIcon(mainP);
  const SubPositionIcon = getPositionIcon(subP);
  const FirstWantPositionIcon = getPositionIcon(wantP[0]);
  const SecondWantPositionIcon = getPositionIcon(wantP[1]);

  return (
    <section className="space-y-2">
      <h3 className="semibold-14">포지션</h3>

      <div className="bold-12 flex gap-4 *:flex-1">
        <MainOrSubPosition
          MainPositionIcon={MainPositionIcon}
          SubPositionIcon={SubPositionIcon}
        />

        <WantPosition
          FirstWantPositionIcon={FirstWantPositionIcon}
          SecondWantPositionIcon={SecondWantPositionIcon}
        />
      </div>
    </section>
  );
}

type PreferredGameModeSectionProps = {
  gameMode: GameMode;
  championStatsResponseList: ChampionStatsResponseList;
};

function PreferredGameModeSection({
  gameMode,
  championStatsResponseList
}: PreferredGameModeSectionProps) {
  return (
    <section className="flex gap-4">
      <div className="w-1/2 space-y-2">
        <h3 className="semibold-14">선호 게임모드</h3>

        <PreferredGameMode gameMode={gameMode} />
      </div>

      <div className="w-1/2 space-y-2">
        <h3 className="semibold-14 flex">최근 선호 챔피언</h3>

        <RecentPreferredChampions championStatsResponseList={championStatsResponseList} />
      </div>
    </section>
  );
}

function WinRateSection({ winRate }: { winRate: number }) {
  return (
    <section className="space-y-2">
      <h3 className="semibold-14">
        <span>승률 </span>
        <span
          className={cn(
            winRate < 50 && "text-gray-700",
            winRate >= 50 && winRate < 70 && "text-violet-600",
            winRate >= 70 && "text-[#CB1FCF]"
          )}
        >
          {winRate}%
        </span>
      </h3>

      <WinRate winRate={winRate ?? 0} />
    </section>
  );
}

function GameStyleSection({ gameStyles }: { gameStyles: number[] }) {
  return (
    <section className="space-y-2">
      <h3 className="semibold-14">게임 스타일</h3>

      <GameStyle gameStyles={gameStyles} />
    </section>
  );
}

function CommentSection({ comment }: { comment: string }) {
  return (
    <section className="space-y-2">
      <h3 className="semibold-14">한마디</h3>

      <Comments comments={comment} />
    </section>
  );
}

function CreatedAtSection({ createdAt }: { createdAt: string }) {
  return (
    <p className="medium-11 -mt-4 pr-2 text-right text-gray-500">
      게시일: {createdAtFormat(createdAt)}
    </p>
  );
}

function TalkSection({ boardId }: { boardId: number }) {
  const enterChat = useEnterChatFromBoardMutation();

  const toggleBoardDetailModal = useModalStore((s) => s.toggleBoardDetailModal);

  return (
    <Button
      className="h-14 w-full rounded-xl bg-violet-600 text-white"
      onClick={() => {
        toggleBoardDetailModal();
        enterChat.mutate({ boardId });
      }}
    >
      말 걸어보기
    </Button>
  );
}
