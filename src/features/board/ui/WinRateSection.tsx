import { cn } from "@/shared/libs/cn";
import { winRateColor } from "@/shared/model";
import { OuterBox } from "@/shared/ui/board-detail-modal";

import { WinRate } from "@/entities/board";

export function WinRateSection({ winRate }: { winRate: number }) {
  return (
    <OuterBox
      label={
        <>
          <span>승률 </span>
          <span className={cn(winRateColor(winRate, "text"))}>{winRate}%</span>
        </>
      }
    >
      <WinRate winRate={winRate ?? 0} />
    </OuterBox>
  );
}
