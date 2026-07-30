import api from "./api";

const SHORTLIST_URL = "/shortlist";

export const ShortlistService = {
  add: async (userId: number) => {
    const res = await api.post(`${SHORTLIST_URL}/${userId}`);
    return res.data;
  },

  remove: async (userId: number) => {
    const res = await api.delete(`${SHORTLIST_URL}/${userId}`);
    return res.data;
  },

  getList: async () => {
    const res = await api.get(`${SHORTLIST_URL}`);
    return res.data;
  },

  check: async (userId: number) => {
    const res = await api.get(`${SHORTLIST_URL}/check/${userId}`);
    return res.data;
  },
};
