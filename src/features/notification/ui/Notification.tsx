import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { NotificationIcon } from "@/shared/assets/NotificationIcon";
import { useTriggerSocketEvent } from "@/shared/hooks/socket/useTriggerSocketEvent";

import { NOTIFICATION_QUERYKEYS } from "@/entities/notification/constants/notification.querykeys";

import { useFetchUnreadNotificationCount } from "../model/hooks/queries/useFetchUnreadNotificationCount";

const Notification = () => {
  const queryClient = useQueryClient();

  //   const handleNewNotification = useCallback(() => {
  //     queryClient.setQueryData(
  //       [NOTIFICATION_QUERYKEYS.NotificationUnreadCount],
  //       (prev: number) => (prev ?? 0) + 1
  //     );
  //   }, [queryClient]);
  //   useTriggerSocketEvent("new-notification", handleNewNotification);
  useTriggerSocketEvent("new-notification", (data) => {
    console.log("🔥 new-notification received", data);

    queryClient.setQueryData(
      [NOTIFICATION_QUERYKEYS.NotificationUnreadCount],
      (prev: number) => (prev ?? 0) + 1
    );
  });
  const { data: readCount, isPending, isError } = useFetchUnreadNotificationCount();

  if (isPending) return <div>로딩중...</div>;
  if (isError) return <div>에러</div>;

  const notificationStatus = readCount > 0 ? "unread" : "default";

  return <NotificationIcon status={notificationStatus} />;
};
export default Notification;
