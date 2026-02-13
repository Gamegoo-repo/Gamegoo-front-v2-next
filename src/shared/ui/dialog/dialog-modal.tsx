"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { cn } from "@/shared/libs/cn";
import { toastMessage } from "@/shared/model";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/shared/ui/dialog";

import { ProfileIcon } from "@/entities/profile";

type DialogModalProps = {
  open: boolean;
  onOpenChange: () => void;
  description: string;
  imgNum: number;
  name: string;
  tag: string;
  items: {
    id: string;
    content: React.ReactNode;
  }[];
  activeCopy?: boolean;
  routeBack?: boolean;
  disableInteractOutside?: boolean;
};

export function DialogModal({
  open,
  onOpenChange,
  description,
  imgNum,
  name,
  tag,
  items,
  activeCopy,
  routeBack = false,
  disableInteractOutside
}: DialogModalProps) {
  const router = useRouter();

  useEffect(() => {
    if (!open && routeBack) {
      onOpenChange();
      router.back();
    }
  }, [open, router, routeBack, onOpenChange]);

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent
        className="max-h-[95dvh] overflow-auto rounded-2xl bg-gray-200"
        showCloseButton={false}
        onInteractOutside={(e) => {
          if (disableInteractOutside) e.preventDefault();
        }}
      >
        <DialogHeader>
          <div className="flex justify-between px-2">
            <header className="flex items-center gap-2">
              <ProfileIcon
                size={64}
                padding={8}
                imgNum={imgNum}
              />

              <h2>
                <Button
                  className={cn(
                    "flex flex-col items-start gap-0 rounded-xl hover:bg-gray-300",
                    !activeCopy && "cursor-default hover:bg-transparent"
                  )}
                  variant="ghost"
                  onClick={() => {
                    if (!activeCopy) return;

                    navigator.clipboard.writeText(`${name}#${tag}`);
                    toastMessage.success("소환사명이 복사되었습니다.");
                  }}
                  tabIndex={activeCopy ? 0 : -1}
                >
                  <span className="text-xl font-bold">{name}</span>
                  <span className="text-gray-500">#{tag}</span>
                </Button>
              </h2>
              <Button>프로필 보기</Button>
            </header>

            <DialogClose asChild>
              <Button
                className="hover:bg-gray-300"
                variant="ghost"
                size="icon"
              >
                <X />
              </Button>
            </DialogClose>
          </div>

          <DialogTitle className="sr-only">{description}</DialogTitle>
          <DialogDescription className="sr-only">{description}</DialogDescription>
        </DialogHeader>

        <ul className="space-y-6 px-2">
          {items.map(({ id, content }) => {
            return <li key={id}>{content}</li>;
          })}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
