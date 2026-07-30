import api from "./api";
import {
  GalleryItem,
  CreateGalleryPayload,
  EditGalleryPayload,
} from "../types/gallery";

const GALLERY_INFO_URL = "/profile-gallery";
const MEMBER_GALLERY_URL = "/member-gallery";

export const familyInfoService = {
  /**
   * Fetch all portfolio images assigned to a user (Admin/Owner perspective)
   * Displays all states including hidden items
   */
  galleryInfo: async (user_id: string | number): Promise<GalleryItem[]> => {
    const res = await api.get(`${GALLERY_INFO_URL}/${user_id}`);
    return Array.isArray(res.data) ? res.data : res.data?.data || [];
  },

  /**
   * Create a new gallery line or update an existing entry image block instance
   * Processes multipart/form-data structures safely
   */
  updateCreateGalleryInfo: async (
    user_id: string | number,
    formData: FormData,
  ): Promise<{ message: string; status: boolean }> => {
    const res = await api.post(
      `${GALLERY_INFO_URL}/update-create/${user_id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return res.data;
  },

  /**
   * Permanent structural drop execution layer for target row items
   */
  deleteGalleryInfo: async (
    user_id: string | number,
    id: number,
  ): Promise<{ message: string }> => {
    const res = await api.delete(`${GALLERY_INFO_URL}/${user_id}/${id}`);
    return res.data;
  },

  /**
   * Patch action configuration modifier switches image visibility status
   */
  updateGalleryStatus: async (
    user_id: string | number,
    id: number,
    status: number,
  ): Promise<{ message: string; status: boolean }> => {
    const res = await api.patch(`${GALLERY_INFO_URL}/status/${user_id}/${id}`, {
      status,
    });
    return res.data;
  },

  /**
   * Public View Mode Endpoint: Retrieves only approved assets (status == 1)
   * Connects directly to the member gallery view controller pipeline
   */
  getMemberGalleryImages: async (
    user_id: string | number,
  ): Promise<GalleryItem[]> => {
    const res = await api.get(
      `${MEMBER_GALLERY_URL}/get-member-gallery-images/${user_id}`,
    );
    return Array.isArray(res.data) ? res.data : res.data?.data || [];
  },
};

// Handle optional named export aliasing to prevent integration breaks elsewhere
export const galleryService = familyInfoService;
