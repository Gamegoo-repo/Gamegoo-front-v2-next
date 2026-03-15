"use client";

import { Plus, X } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

import { POSITION_ICONS } from "@/shared/constants";
import { cn } from "@/shared/libs/cn";
import { toastMessage } from "@/shared/model";
import { Button } from "@/shared/ui/button";
import {
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger
} from "@/shared/ui/popover";

import { PostForm } from "@/entities/board";

type SelectPositionProps = {
  label: string;
  position: "mainPosition" | "subPosition" | "wantMainPosition" | "wantSubPosition";
};

export function SelectPosition({ label, position }: SelectPositionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { setValue, getValues, watch } = useFormContext<PostForm>();
  const selectedPosition = watch(position);

  const PositionIcon = selectedPosition ? POSITION_ICONS[selectedPosition] : undefined;

  return (
    <Popover
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <PopoverTrigger asChild>
        {PositionIcon ? (
          <Button
            className="size-10"
            type="button"
            variant="ghost"
          >
            <PositionIcon className="w-10" />
          </Button>
        ) : (
          <div className="flex size-10 items-center justify-center">
            <Button
              className="flex items-center justify-center rounded-full border border-gray-300
bg-violet-100 px-4 py-1.5 hover:bg-violet-200"
              variant="ghost"
              type="button"
            >
              <Plus className="size-4" />
            </Button>
          </div>
        )}
      </PopoverTrigger>

      <PopoverContent
        className="w-sm rounded-2xl border-none bg-gray-800/85 p-8 text-white backdrop-blur-xs"
      >
        <PopoverArrow className="fill-gray-800/85" />

        <PopoverHeader className="space-y-[28px]">
          <PopoverTitle className="sr-only">{label}</PopoverTitle>

          <div className="flex items-center justify-between pl-2 text-gray-300">
            <p className="bold-20">{label} 선택</p>
            <Button
              className="hover:bg-gray-600"
              size="icon"
              variant="ghost"
              onClick={() => setIsOpen(false)}
            >
              <X className="size-5 cursor-pointer" />
            </Button>
          </div>

          <div className="flex gap-4">
            {Object.keys(POSITION_ICONS).map((v) => {
              const Icon = POSITION_ICONS[v as keyof typeof POSITION_ICONS];

              const isOtherSelected =
                (position === "mainPosition" && getValues("subPosition") === v) ||
                (position === "subPosition" && getValues("mainPosition") === v);

              return (
                <Button
                  key={v}
                  className={cn(
                    `group/button-container flex size-10 items-center justify-center
hover:bg-gray-600`,
                    selectedPosition === v &&
                      "bg-violet-600 hover:bg-violet-500 [&>svg]:text-gray-300",
                    isOtherSelected && "cursor-not-allowed opacity-20 hover:bg-transparent"
                  )}
                  variant="ghost"
                  type="button"
                  onClick={() => {
                    if (isOtherSelected) {
                      toastMessage.error("주 포지션과 부 포지션을 다르게 설정해 주세요.");
                      return;
                    }

                    // 선택된 포지션을 다시 선택하면 선택을 취소함
                    if (selectedPosition === v) {
                      setValue(position, undefined, { shouldDirty: true, shouldValidate: true });

                      setIsOpen(false);
                      return;
                    }

                    setValue(position, v as keyof typeof POSITION_ICONS, {
                      shouldDirty: true,
                      shouldValidate: true
                    });

                    setIsOpen(false);
                  }}
                >
                  <Icon className="size-7 text-gray-400" />
                </Button>
              );
            })}
          </div>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  );
}
