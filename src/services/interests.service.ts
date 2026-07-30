import api from "./api";

const INTEREST_SERVICE_URL = "/interests";

export const InterestsService = {
  getSent: async () => {
    const { data } = await api.get(INTEREST_SERVICE_URL);
    return data;
  },

  getReceived: async () => {
    const { data } = await api.get(`${INTEREST_SERVICE_URL}/received`);
    return data;
  },

  addToInterests: async (userId: number) => {
    const { data } = await api.post(`${INTEREST_SERVICE_URL}/add/${userId}`);
    return data;
  },

  removeInterest: async (userId: number) => {
    const { data } = await api.delete(
      `${INTEREST_SERVICE_URL}/remove/${userId}`,
    );
    return data;
  },

  accept: async (interestId: number) => {
    const { data } = await api.post(
      `${INTEREST_SERVICE_URL}/accept/${interestId}`,
    );
    return data;
  },

  reject: async (interestId: number, reason: string) => {
    const { data } = await api.post(
      `${INTEREST_SERVICE_URL}/reject/${interestId}`,
      { reason },
    );
    return data;
  },

  getRejected: async (type: "all" | "me" | "other") => {
    // console.log("API TYPE:", type);

    const { data } = await api.get(`${INTEREST_SERVICE_URL}/rejected?type=${type}`);

    return data;
  },

  getAccepted: async (type: "all" | "me" | "other") => {
    const { data } = await api.get(`${INTEREST_SERVICE_URL}/accepted?type=${type}`);
    return data;
  },
};
