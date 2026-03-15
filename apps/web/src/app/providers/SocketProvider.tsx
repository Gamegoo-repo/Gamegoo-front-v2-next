"use client";

import { useJwtErrorHandler } from "../../entities/auth";
import { useFriendStatus } from "../../entities/profile";
import { useAuthStore } from "../../features/auth";
import { useSocket } from "../../shared/api/socket/useSocket";
import { SocketContext } from "../../shared/libs/socket/SocketContext";

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const accessToken = useAuthStore((s) => s.accessToken);

  const { socket, isConnected } = useSocket(accessToken!);
  useJwtErrorHandler(socket);
  useFriendStatus(socket);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>{children}</SocketContext.Provider>
  );
}
