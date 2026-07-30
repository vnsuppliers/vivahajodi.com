import api from "./api";

const ADD_TO_BOOKMARK_URL = "/add-to-bookmarks";

export const BookmarkService = {
  getList: async () => {
    const res = await api.get(`${ADD_TO_BOOKMARK_URL}`);
    return res.data;
  },

  add: async (receiver_id: number) => {
    const res = await api.post(`${ADD_TO_BOOKMARK_URL}/${receiver_id}`);
    return res.data;
  },

  remove: async (receiver_id: number) => {
    const res = await api.delete(`${ADD_TO_BOOKMARK_URL}/${receiver_id}`);
    return res.data;
  },
};
