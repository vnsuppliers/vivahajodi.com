import api from "./api";

const PROFILE_SETTINGS_URL = '/profile-settings';

export const ProfileSettingsService = {
  getProfile: async () => {
    const response = await api.get(`${PROFILE_SETTINGS_URL}/me`);
    return response.data;
  },

  updateProfile: async (formData: FormData) => {
    // Do NOT set Content-Type manually — axios/fetch sets it with the boundary automatically
    const response = await api.put(`${PROFILE_SETTINGS_URL}/update`, formData);
    return response.data;
  },
};
