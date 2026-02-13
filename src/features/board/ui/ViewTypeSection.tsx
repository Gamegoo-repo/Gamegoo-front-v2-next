"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { cn } from "@/shared/libs/cn";
import { Button } from "@/shared/ui/button";

import { BOARD_DETAIL_MODAL_VIEW_TYPE } from "@/entities/board";

export function ViewTypeSection() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <nav className="flex justify-between gap-2 *:flex-1">
      {BOARD_DETAIL_MODAL_VIEW_TYPE.map(({ id, label }) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("viewType", id);

        const postDetailPageLink = `${pathname}?${params.toString()}`;

        return (
          <Button
            key={id}
            className={cn(
              "bg-violet-200 text-black",
              searchParams.get("viewType") === id
                ? "bg-violet-600 text-white"
                : "hover:bg-violet-300"
            )}
            role="tab"
            variant={searchParams.get("viewType") === id ? "default" : "ghost"}
            asChild
          >
            <Link
              href={postDetailPageLink}
              replace
              prefetch
            >
              {label}
            </Link>
          </Button>
        );
      })}
    </nav>
  );
}
