import { getTierIcon } from "@/shared/model";
import { OuterBox } from "@/shared/ui/board-detail-modal";

import { Rank } from "@/entities/board";
import { Tier } from "@/entities/post";

type RankSectionProps = {
  soloTier: Tier;
  soloRank: number;
  freeTier: Tier;
  freeRank: number;
};

export function RankSection({ soloTier, soloRank, freeTier, freeRank }: RankSectionProps) {
  const SoloTierIcon = getTierIcon(soloTier);
  const FreeTierIcon = getTierIcon(freeTier);

  return (
    <div className="flex gap-4 *:flex-1">
      <OuterBox label="솔로랭크">
        <Rank
          Icon={SoloTierIcon}
          tier={soloTier}
          rank={soloRank}
        />
      </OuterBox>

      <OuterBox label="자유랭크">
        <Rank
          Icon={FreeTierIcon}
          tier={freeTier}
          rank={freeRank}
        />
      </OuterBox>
    </div>
  );
}
