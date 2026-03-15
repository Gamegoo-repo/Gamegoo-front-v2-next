import { Check } from "lucide-react";

import { InnerBox } from "@/shared/ui/board-detail-modal";

import { GameMode } from "@/entities/post";

export function PreferredGameMode({ gameMode }: { gameMode: GameMode }) {
  const preferredGameMode = (gameMode: string) => {
    switch (gameMode) {
      case "SOLO":
        return "솔로랭크";
      case "FREE":
        return "자유랭크";
      case "FAST":
        return "빠른 대전";
      case "ARAM":
        return "칼바람 나락";
    }
  };

  return (
    <InnerBox>
      <Check className="text-violet-600" />
      <span className="medium-16 shrink-0">{preferredGameMode(gameMode)}</span>
    </InnerBox>
  );
}
