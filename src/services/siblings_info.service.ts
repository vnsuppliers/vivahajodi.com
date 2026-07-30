import api from "./api";

const SIBLINGS_INFO_URL = "/siblings-info";

export const siblingsInfoService = {

  // GET BY USER ID
  getByUserId: async (user_id: string) => {

    const res = await api.get(
      `${SIBLINGS_INFO_URL}/${user_id}`
    );

    return res.data;
  },

  // CREATE
  create: async (
    user_id: string,
    payload: any
  ) => {

    const res = await api.post(
      `${SIBLINGS_INFO_URL}/create/${user_id}`,
      payload
    );

    return res.data;
  },

  // UPDATE
  update: async (
    encrypted_id: string,
    payload: any
  ) => {

    const res = await api.put(
      `${SIBLINGS_INFO_URL}/update/${encrypted_id}`,
      payload
    );

    return res.data;
  },

  // DELETE
  delete: async (
    encrypted_id: string
  ) => {

    const res = await api.delete(
      `${SIBLINGS_INFO_URL}/delete/${encrypted_id}`
    );

    return res.data;
  },

};