import { OuterBox } from "@/shared/ui/board-detail-modal";

import { PreferredGameMode } from "@/features/board";

export function PreferredGameModeSection() {
  return (
    <OuterBox label="선호 게임 모드">
      <div className="w-1/2">
        <PreferredGameMode />
      </div>

      <div className="invisible w-1/2" />
    </OuterBox>
  );
}
