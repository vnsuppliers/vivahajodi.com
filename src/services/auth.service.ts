import { RegisterForm } from "@/interfaces/auth.interface";
import api from "./api";

export const authService = {

  register: async (data: RegisterForm) => {
    const response = await api.post("/user/registration", data);
    return response.data;
  },

  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post("/auth/login", credentials);

    localStorage.setItem("matrimony_user_data", JSON.stringify(response.data));

    return response.data;
  },

  logout: () => {
    localStorage.removeItem("matrimony_user_data");
  },

  getMe: async () => {
    const response = await api.get("/auth/me");
    return response.data;
  },
};
