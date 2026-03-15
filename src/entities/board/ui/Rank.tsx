import { FC, SVGProps } from "react";

import { InnerBox } from "@/shared/ui/board-detail-modal";

type RankProps = {
  Icon: FC<SVGProps<SVGElement>>;
  tier: string;
  rank: number;
};

export function Rank({ Icon, tier, rank }: RankProps) {
  return (
    <InnerBox className="py-2">
      <Icon />
      <p className="bold-20">
        {tier} {tier !== "UNRANKED" && rank}
      </p>
    </InnerBox>
  );
}
