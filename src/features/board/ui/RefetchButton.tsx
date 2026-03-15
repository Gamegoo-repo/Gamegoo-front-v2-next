"use client";

import { RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";

import { revalidateCacheTag } from "@/shared/api";
import { CACHE_KEYS } from "@/shared/constants";
import { cn } from "@/shared/libs/cn";
import { toastMessage } from "@/shared/model";
import { Button } from "@/shared/ui/button";

export function RefetchButton({ refetch }: { refetch: () => void }) {
  const [rotate, setRotate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRotate(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [rotate]);

  return (
    <div className="flex size-12 items-center justify-center rounded-md">
      <Button
        variant="ghost"
        size="icon-lg"
        onClick={() => {
          revalidateCacheTag(CACHE_KEYS.board.all);

          refetch();

          toastMessage.success("게시글을 새로고침했습니다.");

          setRotate(true);
        }}
      >
        <RefreshCcw className={cn("size-8 text-violet-600", rotate && "spin-object")} />
      </Button>
    </div>
  );
}
