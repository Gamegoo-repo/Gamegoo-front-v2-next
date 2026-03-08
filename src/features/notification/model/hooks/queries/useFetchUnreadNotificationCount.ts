import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { notificationApi } from "@/entities/notification/api/notification.api";
import { NOTIFICATION_QUERYKEYS } from "@/entities/notification/constants/notification.querykeys";

export const useFetchUnreadNotificationCount = () => {
  return useQuery({
    queryKey: [NOTIFICATION_QUERYKEYS.NotificationUnreadCount],
    queryFn: () => notificationApi.notificationUnreadCount(),
    placeholderData: keepPreviousData
  });
};
