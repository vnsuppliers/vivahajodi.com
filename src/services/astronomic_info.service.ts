import api from "./api";

const ASTRONOMIC_INFO_URL = "/astro-info";

export const astronomicInfoService = {
  getAstroInfo: async (user_id: string) => {
    const res = await api.get(`${ASTRONOMIC_INFO_URL}/${user_id}`);

    return res.data;
  },

  updateCreateAstroInfo: async (user_id: string, data: any) => {
    const res = await api.post(
      `${ASTRONOMIC_INFO_URL}/update-create/${user_id}`,
      data,
    );

    return res.data;
  },
};
