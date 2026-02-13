import { useMutation, useQueryClient } from "@tanstack/react-query";

import { clientSideOpenapiClient } from "@/shared/api/clientSideOpenapiClient";
import { toastMessage } from "@/shared/model";

import { OTHER_PROFILE_QUERY_KEYS } from "@/entities/profile";

export const useFriendRequestMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ memberId, type }: { memberId: number; type: "request" | "cancel" }) => {
      if (type === "request") {
        const { data, error } = await clientSideOpenapiClient.POST(
          "/api/v2/friend/request/{memberId}",
          {
            params: {
              path: {
                memberId
              }
            }
          }
        );

        if (error) throw error;
        if (!data.data) throw new Error("친구 요청을 보내는 데 실패했습니다.");

        return data.data;
      }

      if (type === "cancel") {
        const { data, error } = await clientSideOpenapiClient.DELETE(
          "/api/v2/friend/request/{memberId}",
          {
            params: {
              path: {
                memberId
              }
            }
          }
        );

        if (error) throw error;
        if (!data.data) throw new Error("친구 요청을 취소하는 데 실패했습니다.");

        return data.data;
      }
    },

    onSuccess: (_, variables) => {
      if (variables.type === "request") toastMessage.success("친구 요청을 보냈습니다.");
      if (variables.type === "cancel") toastMessage.success("친구 요청을 취소했습니다.");

      queryClient.invalidateQueries({
        queryKey: OTHER_PROFILE_QUERY_KEYS.memberId(variables.memberId)
      });
    },

    onError: (_, variables) => {
      if (variables.type === "request") toastMessage.error("친구 요청을 보내는 데 실패했습니다.");
      if (variables.type === "cancel") toastMessage.error("친구 요청을 취소하는 데 실패했습니다.");
    }
  });
};
