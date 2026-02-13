"use client";

import { ArrowLeftRight } from "lucide-react";
import { useFormContext } from "react-hook-form";

import { Button } from "@/shared/ui/button";

import { SelectPosition } from "@/entities/board";

import { PostForm } from "@/features/board";

export function MainAndSubPosition() {
  const { getValues, setValue } = useFormContext<PostForm>();

  return (
    <div className="modal-content-box flex items-center justify-center gap-4">
      <div className="flex flex-col items-center gap-1">
        <h4 className="bold-12">주 포지션</h4>

        <SelectPosition
          label="주 포지션"
          position="mainPosition"
        />
      </div>

      <Button
        className="size-6"
        variant="ghost"
        onClick={() => {
          const currentMain = getValues("mainPosition");
          const currentSub = getValues("subPosition");

          if (currentMain || currentSub) {
            setValue("mainPosition", currentSub, {
              shouldDirty: true,
              shouldValidate: true
            });
            setValue("subPosition", currentMain, {
              shouldDirty: true,
              shouldValidate: true
            });
          }
        }}
      >
        <ArrowLeftRight className="size-5 stroke-[1.5]" />
      </Button>

      <div className="flex flex-col items-center gap-1">
        <h4 className="bold-12">부 포지션</h4>

        <SelectPosition
          label="부 포지션"
          position="subPosition"
        />
      </div>
    </div>
  );
}
