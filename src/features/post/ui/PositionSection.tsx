import { UseFormReturn } from "react-hook-form";

import { OuterBox } from "@/shared/ui/board-detail-modal";

import { MainAndSubPosition, PostForm, WantPosition } from "@/features/board";

// eslint-disable-next-line
type Methods = UseFormReturn<PostForm, any, PostForm>;

export function PositionSection({ methods }: { methods: Methods }) {
  return (
    <OuterBox label="포지션">
      <MainAndSubPosition />
      <input
        type="hidden"
        {...methods.register("mainPosition", {
          required: true
        })}
      />

      <WantPosition />
      <input
        type="hidden"
        {...methods.register("wantMainPosition", {
          validate: (_, formValues) =>
            formValues.wantMainPosition || formValues.wantSubPosition
              ? true
              : "원하는 포지션을 하나 이상 선택해주세요"
        })}
      />
    </OuterBox>
  );
}
