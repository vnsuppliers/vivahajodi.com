import api from "./api";

const PRIVACY_POLICY = "/privacy-policy";

export const privacrPolicyInfoService = {
  getPrivacyPolicyInfo: async () => {
    const res = await api.get(`${PRIVACY_POLICY}/get-active-privacy-policy`);
    return res.data;
  },
};
