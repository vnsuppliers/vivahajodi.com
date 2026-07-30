import api from "./api";

const PAYMENT_URL = "/payments";

export const paymentService = {

  createOrder: async (plan_id: number) => {
    const res = await api.post(
      `${PAYMENT_URL}/create-order`,
      {
        plan_id,
      }
    );

    return res.data;
  },


  verifyPayment: async (data: {
    order_id: string;
    payment_id: string;
    signature: string;
  }) => {

    const res = await api.post(
      `${PAYMENT_URL}/verify-payment`,
      data
    );

    return res.data;
  },


  getMySubscription: async () => {

    const res = await api.get(
      `${PAYMENT_URL}/my-subscription`
    );

    return res.data;
  },

};