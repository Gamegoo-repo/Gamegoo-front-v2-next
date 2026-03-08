import { clientSideOpenapiClient } from "@/shared/api/clientSideOpenapiClient";

import { NOTIFICATION_END_POINTS } from "../constants/notification.endpoints";

export const notificationApi = {
  notificationUnreadCount: async () => {
    const url = NOTIFICATION_END_POINTS.notificationUnreadCount;
    const { data, error } = await clientSideOpenapiClient.GET(url, {});
    if (error || data.data === undefined || data.data === null) {
      throw new Error("안읽은 알림 갯수 조회 실패");
    }

    return data.data;
  }
};
