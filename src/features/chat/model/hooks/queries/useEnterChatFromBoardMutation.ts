import { useMutation } from "@tanstack/react-query";

import { clientSideOpenapiClient } from "@/shared/api/clientSideOpenapiClient";
import { useModalStore } from "@/shared/store";

import { useChatStore } from "@/features/chat";

export const useEnterChatFromBoardMutation = () => {
  const setStatus = useChatStore((s) => s.setStatus);
  const setUuid = useChatStore((s) => s.setUuid);
  const setData = useChatStore((s) => s.setData);
  const setSystem = useChatStore((s) => s.setSystem);
  const isChatWidgetOpen = useModalStore((s) => s.isChatWidgetOpen);
  const toggleChatWidget = useModalStore((s) => s.toggleChatWidget);

  return useMutation({
    mutationFn: async ({ boardId }: { boardId: number }) => {
      const { data, error } = await clientSideOpenapiClient.GET(
        "/api/v2/chat/start/board/{boardId}",
        {
          params: {
            path: {
              boardId
            }
          }
        }
      );

      if (error) throw error;
      if (!data.data) throw new Error("채팅 입장 API에서 오류가 발생했습니다.");

      return data.data;
    },

    onSuccess: (data, variables) => {
      setUuid(data.uuid);
      setData(data);
      setSystem({
        flag: data.system?.flag ?? 1,
        boardId: data.system?.boardId ?? variables.boardId
      });
      setStatus("ACTIVE");

      if (!isChatWidgetOpen) toggleChatWidget();
    }
  });
};
