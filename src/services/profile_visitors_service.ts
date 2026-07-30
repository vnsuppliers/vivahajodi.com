import api from "./api";

const PROFILE_VISITORS_URL = "/profile-visitors";

export const ProfileVisitorsService = {
  // Pass encoded profileId from URL — decode it before sending
  addVisit: async (profileId: number) => {
    const res = await api.post(`${PROFILE_VISITORS_URL}/visit/${profileId}`);
    return res.data;
  },

  // No param needed — backend reads from JWT
  getVisitors: async () => {
    const res = await api.get(`${PROFILE_VISITORS_URL}/visitors`);
    return res.data;
  },

  // No param needed — backend reads from JWT
  getCount: async () => {
    const res = await api.get(`${PROFILE_VISITORS_URL}/count`);
    return res.data;
  },
};
