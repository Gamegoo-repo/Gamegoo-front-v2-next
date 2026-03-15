"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { cn } from "@/shared/libs/cn";
import { winRateColor } from "@/shared/model";
import { InnerBox } from "@/shared/ui/board-detail-modal";

import { BoardDetailModalViewType, ChampionStatsResponseList } from "@/entities/post";

export function RecentPreferredChampions({
  championStatsResponseList
}: {
  championStatsResponseList: ChampionStatsResponseList;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams.toString());
  params.set("viewType", "recent-match" as BoardDetailModalViewType["id"]);

  const postDetailPageLink = `${pathname}?${params.toString()}`;

  return (
    <InnerBox className={cn("gap-2", championStatsResponseList.length !== 0 && "cursor-pointer")}>
      {championStatsResponseList.length !== 0 ? (
        championStatsResponseList.map(({ championName, winRate, championId }) => {
          return (
            <div
              key={championId}
              onClick={() => router.replace(postDetailPageLink)}
            >
              <Image
                src={`/champions/${championName.replaceAll(" ", "")}.png`}
                width={42}
                height={42}
                alt={championName}
              />
              <div
                className={cn(
                  `bold-12 relative left-1/2 z-10 -mt-2 w-[34px] -translate-x-1/2 rounded-full
bg-violet-600 text-center text-white`,
                  winRateColor(winRate, "bg")
                )}
              >
                {winRate.toFixed(0)}%
              </div>
            </div>
          );
        })
      ) : (
        <p className="medium-14 text-center">
          챔피언 정보가 <br /> 없습니다.
        </p>
      )}
    </InnerBox>
  );
}
