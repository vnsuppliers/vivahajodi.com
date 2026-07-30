import api from "./api";

const PHYSICAL_ATTRIBUTES_INFO_URL = "/physical-attributes";

export const physicalAttributesService = {
  getPhysicalAttributes: async (user_id: string) => {
    const res = await api.get(
      `${PHYSICAL_ATTRIBUTES_INFO_URL}/${encodeURIComponent(String(user_id))}`
    );
    return res.data;
  },

  updateCreate: async (userId: string | number, payload: any) => {
    const res = await api.post(
      `${PHYSICAL_ATTRIBUTES_INFO_URL}/update-create/${encodeURIComponent(String(userId))}`,
      payload
    );
    return res.data;
  },
};