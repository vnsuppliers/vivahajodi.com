import api from "./api";

const MEMBERS_LIST_URL = "members-list";

export const profileService = {
  getprofiles: async (params?: any) => {
    
    const res = await api.get(`${MEMBERS_LIST_URL}/profiles`, {
      params,
    });

    // console.log("profiles", res.data);

    return res.data;
  },

  getProfileById: async (id: string) => {
    const res = await api.get(`${MEMBERS_LIST_URL}/${id}`);
    return res.data;
  },
};
