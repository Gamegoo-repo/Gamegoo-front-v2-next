import { OuterBox } from "@/shared/ui/board-detail-modal";

import { MicSwitch } from "@/features/board";

export function MicSection() {
  return (
    <OuterBox
      className="w-fit"
      label="마이크"
    >
      <MicSwitch />
    </OuterBox>
  );
}
