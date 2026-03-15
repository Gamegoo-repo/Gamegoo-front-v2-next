import { createdAtFormat } from "@/entities/board";

export function CreatedAtSection({ createdAt }: { createdAt: string }) {
  return (
    <p className="medium-11 -mt-4 pr-2 text-right text-gray-500">
      게시일: {createdAtFormat(createdAt)}
    </p>
  );
}
