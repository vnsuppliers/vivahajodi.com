import api from "./api";

const RELIGIOUS_INFO_URL = "/religious-info";

export const religiousInfoService = {
  getReligiousInfo: async (user_id: string) => {
    const res = await api.get(`${RELIGIOUS_INFO_URL}/${user_id}`);
    return res.data;
  },

  updateReligiousInfo: async (user_id: string, data: any) => {
    const res = await api.post(
      `${RELIGIOUS_INFO_URL}/update-create/${user_id}`,
      data,
    );
    return res.data;
  },
};
