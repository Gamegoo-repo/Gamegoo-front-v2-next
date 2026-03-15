"use client";

import { cn } from "@/shared/libs/cn";
import { Button } from "@/shared/ui/button";

import { BOARD_TABS } from "@/entities/board";

import { useBoardStore } from "@/features/board";

export function BoardTabSection() {
  const boardTab = useBoardStore((s) => s.boardTab);
  const setBoardTab = useBoardStore((s) => s.setBoardTab);

  return (
    <nav className="flex justify-between gap-2 *:flex-1">
      {BOARD_TABS.map(({ id, label }) => {
        return (
          <Button
            key={id}
            className={cn(
              "bg-violet-200 text-black",
              boardTab === id ? "bg-violet-600 text-white" : "hover:bg-violet-300"
            )}
            role="tab"
            variant={boardTab === id ? "default" : "ghost"}
            onClick={() => setBoardTab(id)}
          >
            {label}
          </Button>
        );
      })}
    </nav>
  );
}
