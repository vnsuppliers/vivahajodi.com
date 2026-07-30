import api from "./api";

const RELATIVES_INFO_URL = "/relatives-info";

export const relativesInfoService = {
  // ================= GET BY USER =================
  getByUserId: async (userId: string | number) => {
    const res = await api.get(`${RELATIVES_INFO_URL}/get/${userId}`);

    return res.data || [];
  },

  // ================= CREATE =================
  create: async (userId: string | number, payload: any) => {
    const res = await api.post(
      `${RELATIVES_INFO_URL}/create/${userId}`,
      payload,
    );

    return res.data;
  },

  // ================= UPDATE =================
  update: async (relativesInfoId: string | number, payload: any) => {
    const res = await api.put(
      `${RELATIVES_INFO_URL}/update/${relativesInfoId}`,
      payload,
    );

    return res.data;
  },

  // ================= DELETE =================
  delete: async (relativesInfoId: string | number) => {
    const res = await api.delete(
      `${RELATIVES_INFO_URL}/delete/${relativesInfoId}`,
    );

    return res.data;
  },
};
