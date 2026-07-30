import api from "./api";

const NOTIFICATIONS_URL = "/notifications";

export const NotificationService = {
  // Notifications
  getNotifications: async () => {
    const res = await api.get(NOTIFICATIONS_URL);
    return res.data;
  },

  markAllNotificationsAsRead: async () => {
    const res = await api.post(`${NOTIFICATIONS_URL}/read-all`);
    return res.data;
  },
};
