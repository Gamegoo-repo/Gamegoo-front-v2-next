"use client";

import { useQueryClient } from "@tanstack/react-query";

import { POST_QUERY_KEYS } from "@/entities/post";

import { Header } from "@/widgets/board";

export function HeaderContainer() {
  const queryClient = useQueryClient();

  const refetch = () => {
    queryClient.invalidateQueries({
      queryKey: POST_QUERY_KEYS.all
    });
  };

  return <Header refetch={refetch} />;
}
