import api from "./api";

const EDUCATION_INFO_URL = "/education-info";

export const educationalInfoService = {
  getEducationInfo: async (user_id: string) => {
    const res = await api.get(`${EDUCATION_INFO_URL}/${user_id}`);
    // Extracting .data here makes the component code cleaner
    return res.data;
  },

  createEducationInfo: async (user_id: string, data: any) => {
    const res = await api.post(`${EDUCATION_INFO_URL}/${user_id}`, data);
    return res.data;
  },

  updateEducationInfo: async (recordId: string, data: any) => {
    // We pass the specific record ID for the PUT request
    const res = await api.put(`${EDUCATION_INFO_URL}/${recordId}`, data);
    return res.data;
  },

  deleteEducationInfo: async (id: number) => {
    const res = await api.delete(`${EDUCATION_INFO_URL}/${id}`);
    return res.data;
  },
};