import api from "./api";

const FAMILY_INFO_URL = "/family-info";

export const familyInfoService = {
  getFamilyInfo: async (user_id: string) => {
    const res = await api.get(`${FAMILY_INFO_URL}/${user_id}`);

    return res.data;
  },

  updateCreateFamilyInfo: async (user_id: string, data: any) => {
    const res = await api.post(
      `${FAMILY_INFO_URL}/update-create/${user_id}`,
      data,
    );

    return res.data;
  },
};
