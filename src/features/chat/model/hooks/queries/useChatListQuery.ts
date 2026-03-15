"use client";

import { useQuery } from "@tanstack/react-query";

import { clientSideOpenapiClient } from "@/shared/api/clientSideOpenapiClient";

import { CHAT_LIST_QUERY_KEYS, ChatList } from "@/entities/chat";

import { useAuthStore } from "@/features/auth";

export const useChatListQuery = () => {
  const authStatus = useAuthStore((s) => s.authStatus);

  return useQuery<ChatList>({
    queryKey: CHAT_LIST_QUERY_KEYS.all,
    queryFn: async () => {
      const { data, error } = await clientSideOpenapiClient.GET("/api/v2/chatroom");

      if (error) throw error;
      if (!data.data) throw new Error("Chatroom 데이터가 존재하지 않습니다.");

      return data.data?.chatroomResponseList;
    },
    enabled: authStatus === "authenticated"
  });
};
