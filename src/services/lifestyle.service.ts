import api from "./api";

const LIFE_STYLE_INFO_URL = "/lifestyle-info";

export const lifeStyleInfoService = {
  getLifeStyleInfo: async (user_id: string) => {
    const res = await api.get(
      `${LIFE_STYLE_INFO_URL}/${encodeURIComponent(String(user_id))}`
    );
    return res.data;
  },

  updateCreate: async (userId: string | number, payload: any) => {
    const res = await api.post(
      `${LIFE_STYLE_INFO_URL}/update-create/${encodeURIComponent(String(userId))}`,
      payload
    );
    return res.data;
  },
};