import { Mic as MicIcon, MicOff } from "lucide-react";

import { InnerBox } from "@/shared/ui/board-detail-modal";

export function Mic({ mic }: { mic: boolean }) {
  return (
    <InnerBox className="[&>svg]:text-violet-600">
      {mic ? <MicIcon /> : <MicOff />}
      <span className="medium-16 shrink-0">{mic ? "사용함" : "사용하지 않음"}</span>
    </InnerBox>
  );
}
