"use client";

import { useEffect, useMemo, useState } from "react";
import { Socket, io } from "socket.io-client";

import { SOCKET_EVENTS } from "@/shared/constants/socketEvents";

type Err = {
  event: string;
  data: string;
  timestamp: string;
};

export const useSocket = (accessToken: string) => {
  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);

  const HANDLERS = useMemo(
    () => ({
      [SOCKET_EVENTS.CONNECT]: () => setIsConnected(true),
      [SOCKET_EVENTS.DISCONNECT]: () => setIsConnected(false),
      [SOCKET_EVENTS.ERROR]: (error: Err) => console.error(error)
    }),
    []
  );

  // accessToken이 변경되면 내부 코드 재실행
  // cleanup 단계에서 socket events를 비활성화하고, socket instance를 종료하며, socket ref를 null로 변경함
  // 따라서 accessToken이 변경되었을 때 새로운 socket instance를 생성할 수 있음
  useEffect(() => {
    if (!accessToken) {
      setSocket(null);
      return;
    }

    const newSocket = io("https://socket.gamegoo.co.kr", {
      auth: { token: accessToken }
    });

    setSocket(newSocket);

    Object.entries(HANDLERS).forEach(([event, handler]) => {
      newSocket.on(event, handler);
    });

    return () => {
      Object.entries(HANDLERS).forEach(([event, handler]) => {
        newSocket.off(event, handler);
      });

      newSocket.disconnect();
      setSocket(null);
    };
  }, [accessToken, HANDLERS]);

  return {
    socket,
    isConnected
  };
};
