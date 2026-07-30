import { BasicInfoUpdatePayload } from "@/interfaces/basic-info.interface";
import api from "./api";

const BASIC_INFO_URL = "/basic-info";

export const basicInfoService = {
  getBasicInfo: async (user_id: string | number) => {
    // Keep your URL handling consistent for reading data
    const res = await api.get(`${BASIC_INFO_URL}/${user_id}`);
    return res.data;
  },

  updateBasicInfo: async (
    user_id: string | number,
    data: BasicInfoUpdatePayload,
  ) => {
    // 🛠️ Force the raw numeric ID string down the update channel
    const cleanId =
      typeof user_id === "string" && !isNaN(Number(user_id))
        ? Number(user_id)
        : user_id;

    const res = await api.post(
      `${BASIC_INFO_URL}/update-create/${cleanId}`,
      data,
    );
    return res.data;
  },
};
