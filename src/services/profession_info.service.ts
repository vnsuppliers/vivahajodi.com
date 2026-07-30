import api from "./api";

const BASE_URL = "/profession_info";

export const professionInfoService = {
  // ================= GET BY USER =================
  getByUserId: async (userId: string | number) => {
    const res = await api.get(`${BASE_URL}/get/${userId}`);

    return res.data || [];
  },

  // ================= CREATE =================
  create: async (userId: string | number, payload: any) => {
    const res = await api.post(`${BASE_URL}/create/${userId}`, payload);

    return res.data;
  },

  // ================= UPDATE =================
  update: async (professionInfoId: string | number, payload: any) => {
    const res = await api.put(
      `${BASE_URL}/update/${professionInfoId}`,
      payload,
    );

    return res.data;
  },

  // ================= DELETE =================
  delete: async (professionInfoId: string | number) => {
    const res = await api.delete(`${BASE_URL}/delete/${professionInfoId}`);

    return res.data;
  },
};
