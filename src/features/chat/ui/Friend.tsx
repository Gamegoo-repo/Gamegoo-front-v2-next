import { formatTime } from "@/shared/libs/date/formatTime";

import { ViewType } from "@/entities/chat";
import { ProfileIcon } from "@/entities/profile";

import { useStartChatMutation } from "@/features/chat";
import { useFriendStore } from "@/features/profile";

type FriendProps = {
  memberId: number;
  imgNum: number;
  name: string;
  label: string;
  tag?: string;
  lastMsgAt?: string;
  type: ViewType;
  unReadMessageCount: number;
};

export function Friend({
  memberId,
  imgNum,
  name,
  label,
  lastMsgAt,
  type,
  unReadMessageCount
}: FriendProps) {
  const startChat = useStartChatMutation();
  const onlineFriendsIds = useFriendStore((s) => s.onlineFriendsIds);

  return (
    <li
      className="a11y-focus-visible flex cursor-pointer items-center justify-between rounded-lg p-2
outline-none hover:bg-gray-200"
      onClick={() => startChat.mutate({ memberId })}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === "Enter") startChat.mutate({ memberId });
      }}
    >
      <div className="flex w-full gap-2">
        <ProfileIcon imgNum={imgNum} />
        <div className="flex-1">
          <div className="flex justify-between">
            <div className="flex items-center gap-1 font-semibold">
              <span>{name}</span>
              {onlineFriendsIds.includes(memberId) && (
                <span className="inline-flex size-2 rounded-full bg-green-500" />
              )}
            </div>
            <span className="text-xs">{type === "채팅방" ? formatTime(lastMsgAt!) : ""}</span>
          </div>

          <p className="flex flex-1 items-center justify-between text-sm text-gray-500">
            <span>{label}</span>
            {unReadMessageCount > 0 && (
              <span
                className="flex size-5 items-center justify-center rounded-full bg-violet-600
text-sm text-white"
              >
                {unReadMessageCount}
              </span>
            )}
          </p>
        </div>
      </div>
    </li>
  );
}
