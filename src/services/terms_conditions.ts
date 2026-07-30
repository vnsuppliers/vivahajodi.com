import api from "./api";

const TERMS_URL = "/terms-conditions";

export const termsConditionsInfoService = {
  getTermsConditionsInfo: async () => {
    const res = await api.get(`${TERMS_URL}/get-active-terms-conditions`);
    return res.data;
  },
};
