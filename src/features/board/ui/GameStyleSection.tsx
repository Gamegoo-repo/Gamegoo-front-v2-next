import { OuterBox } from "@/shared/ui/board-detail-modal";

import { GameStyle } from "@/entities/board";

export function GameStyleSection({ gameStyles }: { gameStyles: number[] }) {
  return (
    <OuterBox label="게임 스타일">
      <GameStyle gameStyles={gameStyles} />
    </OuterBox>
  );
}
