import { Check } from "lucide-react";

import { cn } from "@/shared/libs/cn";
import { InnerBox, OuterBox } from "@/shared/ui/board-detail-modal";

import { MannerData } from "@/features/board";

export function MannerLevelSection({ mannerData }: { mannerData: MannerData }) {
  return (
    <OuterBox label="매너 레벨">
      <InnerBox className="relative flex items-start justify-between px-6!">
        <div className="absolute top-8 right-8 left-10 h-[3px] bg-gray-500">
          <div
            className={cn(
              "h-[3px]",
              mannerData.mannerLevel === 1 && "bg-violet-200",
              mannerData.mannerLevel === 2 && "bg-violet-300",
              mannerData.mannerLevel === 3 && "bg-violet-400",
              mannerData.mannerLevel === 4 && "bg-violet-500",
              mannerData.mannerLevel === 5 && "bg-violet-600"
            )}
            style={{ width: `${(mannerData.mannerLevel - 1) * 25}%` }}
          />
        </div>

        {Array.from({ length: 5 }).map((_, i) => {
          const activeMannerLevelStyle = mannerData.mannerLevel >= i + 1;

          return (
            <div
              key={i}
              className="relative z-10 flex flex-col items-center gap-1"
            >
              {activeMannerLevelStyle ? (
                <div className="flex w-12 justify-center bg-white">
                  <div
                    className={cn(
                      "flex size-8 items-center justify-center rounded-full border border-gray-300",
                      i + 1 === 1 && "bg-violet-200",
                      i + 1 === 2 && "bg-violet-300",
                      i + 1 === 3 && "bg-violet-400",
                      i + 1 === 4 && "bg-violet-500",
                      i + 1 === 5 && "bg-violet-600"
                    )}
                  >
                    <Check className="text-white" />
                  </div>
                </div>
              ) : (
                <div className="relative z-10 flex size-8 items-center justify-center bg-white">
                  <div className="size-4 rounded-full border-3 border-gray-500 bg-white" />
                </div>
              )}

              <div
                className={cn(
                  "text-center font-medium",
                  activeMannerLevelStyle ? "text-violet-500" : "text-gray-400"
                )}
              >
                <p>LV {i + 1}</p>
                {activeMannerLevelStyle &&
                  mannerData.mannerLevel === i + 1 &&
                  mannerData.mannerRank! > 0 && (
                    <p className="text-xs">상위 {mannerData.mannerRank}%</p>
                  )}
              </div>
            </div>
          );
        })}
      </InnerBox>
    </OuterBox>
  );
}
