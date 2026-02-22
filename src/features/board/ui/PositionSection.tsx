import { getPositionIcon } from "@/shared/model";
import { OuterBox } from "@/shared/ui/board-detail-modal";

import { MainOrSubPosition, WantPosition } from "@/entities/board";
import { Position } from "@/entities/post";

type PositionSectionProps = {
  mainP: Position;
  subP: Position;
  wantP: Position[];
};

export function PositionSection({ mainP, subP, wantP }: PositionSectionProps) {
  const MainPositionIcon = getPositionIcon(mainP);
  const SubPositionIcon = getPositionIcon(subP);
  const FirstWantPositionIcon = getPositionIcon(wantP[0]);
  const SecondWantPositionIcon = getPositionIcon(wantP[1]);

  return (
    <OuterBox
      className="bold-12"
      label="포지션"
    >
      <MainOrSubPosition
        MainPositionIcon={MainPositionIcon}
        SubPositionIcon={SubPositionIcon}
      />

      <WantPosition
        FirstWantPositionIcon={FirstWantPositionIcon}
        SecondWantPositionIcon={SecondWantPositionIcon}
      />
    </OuterBox>
  );
}
