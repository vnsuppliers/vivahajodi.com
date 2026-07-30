import api from "./api";

const SUCCESS_STORY_URL = "/success-story";

export const successStoryService = {
  getSuccessStory: async (userId: string | number) => {
    // Ensure numeric conversion if it's passed as a string
    const res = await api.get(`${SUCCESS_STORY_URL}/${userId}`);
    return res.data;
  },

  createSuccessStory: async (userId: string | number, formData: FormData) => {
    const res = await api.post(
      `${SUCCESS_STORY_URL}/update-create/${userId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return res.data;
  },

};
