"use client";

import { OuterBox } from "@/shared/ui/board-detail-modal";

import {
  ChampionStatsResponseList,
  MemberRecentStats,
  Mic,
  PreferredGameMode,
  RecentPreferredChampions
} from "@/entities/board";

import { GameMode } from "@/features/board";

type PreferredSectionProps = {
  gameMode: GameMode;
  mic: boolean;
  championStatsResponseList: ChampionStatsResponseList;
  memberRecentStats: MemberRecentStats;
};

export function PreferredSection({
  gameMode,
  mic,
  championStatsResponseList
}: PreferredSectionProps) {
  return (
    <div className="flex gap-4">
      <OuterBox
        sectionClassName="max-w-fit"
        label="선호 게임모드"
      >
        <PreferredGameMode gameMode={gameMode} />
      </OuterBox>

      <OuterBox
        sectionClassName="max-w-fit"
        label="마이크"
      >
        <Mic mic={mic} />
      </OuterBox>

      <OuterBox label="최근 선호 챔피언">
        <RecentPreferredChampions championStatsResponseList={championStatsResponseList} />
      </OuterBox>
    </div>
  );
}
