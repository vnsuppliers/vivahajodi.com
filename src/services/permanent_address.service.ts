import api from "./api";

const PERMANENT_ADDRESS_INFO_URL = "/permanent-address";

export const permanentAddressService = {
  getPermanentAddress: async (user_id: string) => {
    const res = await api.get(`${PERMANENT_ADDRESS_INFO_URL}/${user_id}`);

    return res.data;
  },

  updateCreatePermanentAddress: async (user_id: string, data: any) => {
    const res = await api.post(
      `${PERMANENT_ADDRESS_INFO_URL}/update-create/${user_id}`,
      data,
    );

    return res.data;
  },
};
