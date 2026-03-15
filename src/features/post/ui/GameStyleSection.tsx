import { UseFormReturn } from "react-hook-form";

import { OuterBox } from "@/shared/ui/board-detail-modal";

import { PostForm } from "@/entities/board";

import { SelectGameStyle } from "@/features/board";

// eslint-disable-next-line
type Methods = UseFormReturn<PostForm, any, PostForm>;

export function GameStyleSection({ methods }: { methods: Methods }) {
  return (
    <OuterBox label="게임 스타일">
      <SelectGameStyle />
      <input
        type="hidden"
        {...methods.register("gameStyles", {
          validate: (value) => value.length > 0
        })}
      />
    </OuterBox>
  );
}
