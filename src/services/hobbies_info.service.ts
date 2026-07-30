import api from "./api";

const HOBBIES_INFO_URL = "/hobbies-info";

export const hobbiesInfoService = {
  // ================= GET BY USER =================
  getByUserId: async (userId: string | number) => {
    const res = await api.get(`${HOBBIES_INFO_URL}/get/${userId}`);

    return res.data || [];
  },

  // ================= CREATE =================
  create: async (userId: string | number, payload: any) => {
    const res = await api.post(`${HOBBIES_INFO_URL}/create/${userId}`, payload);

    return res.data;
  },

  // ================= UPDATE =================
  update: async (hobbiesInfoId: string | number, payload: any) => {
    const res = await api.put(
      `${HOBBIES_INFO_URL}/update/${hobbiesInfoId}`,
      payload,
    );

    return res.data;
  },

  // ================= DELETE =================
  delete: async (hobbiesInfoId: string | number) => {
    const res = await api.delete(`${HOBBIES_INFO_URL}/delete/${hobbiesInfoId}`);

    return res.data;
  },
};
