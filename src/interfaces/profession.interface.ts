export interface ProfessionInfo {
  id: number;
  profession_info_id: number;

  user_id: number;

  profession_id: number;
  designation_id?: number | null;

  country_id?: number | null;
  state_id?: number | null;
  city_id?: number | null;

  company_name?: string;
  experience?: string;
  income?: string;
  location?: string;
  description?: string;

  status: number;

  created_at?: string;
  updated_at?: string;
}