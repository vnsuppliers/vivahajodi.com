export interface BasicInfoProfile {
  user?: {
    id: number;
    first_name?: string;
    last_name?: string;
    email?: string;
    is_online?: number;
    is_verified?: number;
    is_premium?: number;
  };

  member?: {
    profile_image?: string;
  };


  gender_id?: number;
  date_of_birth?: string;
  marital_status_id?: number;
  about?: string;
  profile_image?: string;
  mother_tongue_id?: number;
}

export interface BasicInfoProps {
  userId: string;
  profile?: BasicInfoProfile;
  member?: {
    profile_image?: string;
  };
}

export interface BasicInfoUpdatePayload {
  first_name: string;
  last_name: string;
  gender_id: number;
  date_of_birth: string | null;
  marital_status?: string;
  about?: string;
}
