import Image from "next/image";

import { cn } from "@/shared/libs/cn";
import { winRateColor } from "@/shared/model";
import { OuterBox } from "@/shared/ui/board-detail-modal";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";

import { ChampionStatsResponseList } from "@/entities/post";

export function DetailedRecentPreferredChampionsSection({
  championStatsResponseList
}: {
  championStatsResponseList: ChampionStatsResponseList;
}) {
  return (
    <OuterBox label="최근 선호 챔피언">
      <div className="rounded-xl border border-gray-300 bg-white **:text-center">
        <Table>
          <TableHeader>
            <TableRow className="border-0! *:font-bold">
              <TableHead className="w-[58px]" />
              <TableHead>챔피언</TableHead>
              <TableHead>승률</TableHead>
              <TableHead>평균 KDA</TableHead>
              <TableHead>CS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {championStatsResponseList.map((v) => {
              return (
                <TableRow
                  key={v.championId}
                  className="border-0 font-semibold odd:bg-gray-200"
                >
                  <TableCell className="flex justify-center rounded-l-xl">
                    <Image
                      src={`/champions/${v.championName.replaceAll(" ", "")}.png`}
                      width={42}
                      height={42}
                      alt={v.championName}
                    />
                  </TableCell>

                  <TableCell>{v.championName}</TableCell>

                  <TableCell>
                    <p>
                      {v.wins}승 {v.games - v.wins}패
                    </p>
                    <p className={cn(winRateColor(v.winRate, "text"))}>{v.winRate.toFixed(1)}%</p>
                  </TableCell>

                  <TableCell>
                    <p>
                      <span>{v.kills.toFixed(1)}</span>
                      <span className="font-light text-gray-500"> / </span>
                      <span className="text-red-600">{v.deaths.toFixed(1)}</span>
                      <span className="font-light text-gray-500"> / </span>
                      <span>{v.assists.toFixed(1)}</span>
                    </p>
                    <p>{((v.kills + v.assists) / v.deaths).toFixed(2)}</p>
                  </TableCell>

                  <TableCell>{v.averageCs.toFixed(1)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </OuterBox>
  );
}
