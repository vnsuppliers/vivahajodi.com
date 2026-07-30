import api from "./api";

export const MessagesService = {
  getThreads: async () => {
    const { data } = await api.get("/send-messages");
    return data;
  },

  getChat: async (userId: number) => {
    const { data } = await api.get(`/send-messages/chat/${userId}`);
    return data;
  },

  getMessages: async (chatId: number) => {
    const { data } = await api.get(`/send-messages/messages/${chatId}`);
    return data;
  },

  getOrCreateChat: async (userId: number) => {
    const { data } = await api.get(`/send-messages/chat/${userId}`);
    return data;
  },

  sendMessage: async (data: { chatId: number; message: string }) => {
    const { data: res } = await api.post(`/send-messages/messages`, data);
    return res;
  },
};
