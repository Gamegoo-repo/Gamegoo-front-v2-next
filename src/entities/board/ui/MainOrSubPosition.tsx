import { FC, SVGProps } from "react";

import { InnerBox } from "@/shared/ui/board-detail-modal";

type MainOrSubPositionProps = {
  MainPositionIcon: FC<SVGProps<SVGElement>>;
  SubPositionIcon: FC<SVGProps<SVGElement>>;
};

export function MainOrSubPosition({ MainPositionIcon, SubPositionIcon }: MainOrSubPositionProps) {
  return (
    <InnerBox className="gap-8 *:space-y-1">
      <div>
        <h4>주 포지션</h4>
        <MainPositionIcon className="size-10" />
      </div>

      <div>
        <h4>부 포지션</h4>
        <SubPositionIcon className="size-10" />
      </div>
    </InnerBox>
  );
}
