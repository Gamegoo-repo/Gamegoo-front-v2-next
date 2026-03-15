import { cn } from "@/shared/libs/cn";
import { winRateColor } from "@/shared/model";
import { InnerBox, OuterBox } from "@/shared/ui/board-detail-modal";

import { RecentData } from "@/entities/post";

export function RecentMatchesSection({ recentData }: { recentData: RecentData }) {
  return (
    <div className="flex gap-4">
      <OuterBox label="전적">
        <RecentMatch recentData={recentData} />
      </OuterBox>

      <OuterBox
        sectionClassName="min-w-2/5"
        label="평균 KDA"
      >
        <AvgKda recentData={recentData} />
      </OuterBox>

      <OuterBox label="평균 CS">
        <AvgCs recentData={recentData} />
      </OuterBox>
    </div>
  );
}

function RecentMatch({ recentData }: { recentData: RecentData }) {
  if (!recentData) return null;

  return (
    <InnerBox className="flex-col">
      <p className="text-xl font-bold">
        {recentData.recTotalWins}승 {recentData.recTotalLosses}패
      </p>

      <p
        className={cn(
          "font-semibold",
          winRateColor(Number(recentData.recWinRate.toFixed(1)), "text")
        )}
      >
        {recentData.recWinRate.toFixed(1)}%
      </p>
    </InnerBox>
  );
}

function AvgKda({ recentData }: { recentData: RecentData }) {
  if (!recentData) return null;

  return (
    <InnerBox className="flex-col">
      <p className="text-xl font-bold">
        <span>{recentData.recAvgKills.toFixed(1)}</span>
        <span className="font-light text-gray-500"> / </span>
        <span className="text-red-600">{recentData.recAvgDeaths.toFixed(1)}</span>
        <span className="font-light text-gray-500"> / </span>
        <span>{recentData.recAvgAssists.toFixed(1)}</span>
      </p>

      <p className="font-bold text-gray-500">{recentData.recAvgKDA.toFixed(1)}</p>
    </InnerBox>
  );
}

function AvgCs({ recentData }: { recentData: RecentData }) {
  if (!recentData) return null;

  return (
    <InnerBox className="flex-col">
      <p className="text-xl font-bold">
        <span>{recentData.recAvgCsPerMinute.toFixed(1)}</span>
      </p>

      <p className="font-bold text-gray-500">분당 {recentData.recTotalCs}</p>
    </InnerBox>
  );
}
