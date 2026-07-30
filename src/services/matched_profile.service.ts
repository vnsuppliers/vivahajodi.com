// matched_profile.service.ts
import api from "./api";

export const MatchedProfileService = {
  getMatchedProfiles: async () => {
    const { data } = await api.get("/matched-profiles");
    return data;
  },
};
