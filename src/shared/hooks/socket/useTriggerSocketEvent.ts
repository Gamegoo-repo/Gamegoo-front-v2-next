import { useEffect, useState } from "react";

import { useSocketContext } from "@/shared/libs/socket/SocketContext";

export function useTriggerSocketEvent<T>(eventName: string, callback?: (data: T) => void) {
  const { socket } = useSocketContext();
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    if (!socket) return;

    const handler = (incomingData: T) => {
      setData(incomingData);
      callback?.(incomingData);
    };

    socket.on(eventName, handler);

    return () => {
      socket.off(eventName, handler);
    };
  }, [socket, eventName, callback]);

  return data;
}
