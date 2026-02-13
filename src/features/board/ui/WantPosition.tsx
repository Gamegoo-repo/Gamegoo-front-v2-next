"use client";

import { SelectPosition } from "@/entities/board";

export function WantPosition() {
  return (
    <div className="modal-content-box flex flex-col items-center justify-center gap-1">
      <h4 className="bold-12">내가 찾는 포지션</h4>

      <div className="flex gap-8">
        <SelectPosition
          position="wantMainPosition"
          label="주 포지션"
        />
        <SelectPosition
          position="wantSubPosition"
          label="부 포지션"
        />
      </div>
    </div>
  );
}
