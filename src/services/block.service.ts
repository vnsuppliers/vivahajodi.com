import api from "./api";

const BLOCK_PROFILE_URL = "/block-profile";

export const BlockService = {
  getList: async () => {
    const res = await api.get(BLOCK_PROFILE_URL);
    return res.data;
  },

  block: async (blocked_user_id: number, payload: any) => {
    const res = await api.post(
      `${BLOCK_PROFILE_URL}/add/${blocked_user_id}`,
      payload,
    );

    return res.data;
  },

  unblock: async (blocked_user_id: number) => {
    const res = await api.delete(
      `${BLOCK_PROFILE_URL}/remove/${blocked_user_id}`,
    );

    return res.data;
  },
};
