import api from "./api";

const PRESENT_ADDRESS_INFO_URL = "/present-address";

export const presentAddressService = {
  getPresentAddress: async (user_id: string) => {
    const res = await api.get(`${PRESENT_ADDRESS_INFO_URL}/${user_id}`);

    return res.data;
  },

  updateCreatePresentAddress: async (user_id: string, data: any) => {
    const res = await api.post(
      `${PRESENT_ADDRESS_INFO_URL}/update-create/${user_id}`,
      data,
    );

    return res.data;
  },
};
