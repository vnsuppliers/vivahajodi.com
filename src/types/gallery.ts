export interface GalleryItem {
  id: number;
  user_id: number;
  gallery_images: string[];
  image_url: string | null;
  status: number;
  created_at: string;
  updated_at: string;
}

export interface CreateGalleryPayload {
  image_url?: string;
  files?: File[];
}

export interface EditGalleryPayload {
  id: number;
  image_url: string | null;
  gallery_images: string[];
}