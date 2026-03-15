import { FC, SVGProps } from "react";

import { InnerBox } from "@/shared/ui/board-detail-modal";

type WantPositionProps = {
  FirstWantPositionIcon: FC<SVGProps<SVGElement>>;
  SecondWantPositionIcon: FC<SVGProps<SVGElement>>;
};

export function WantPosition({ FirstWantPositionIcon, SecondWantPositionIcon }: WantPositionProps) {
  return (
    <InnerBox className="flex flex-col">
      <h4>내가 찾는 포지션</h4>

      <div className="flex gap-2 *:size-10">
        <FirstWantPositionIcon />
        {SecondWantPositionIcon && <SecondWantPositionIcon />}
      </div>
    </InnerBox>
  );
}
