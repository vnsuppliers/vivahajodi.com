export interface EducationPayload {
  education_id: number | null;
  specialisation_id: number | null;
  country_id: number | null;
  state_id: number | null;
  city_id: number | null;
  college_name: string | null;
  university_name: string | null;
  passing_year: number | null;
  education_address: string | null;
  education_info_status: number | null;
  is_highest_education: number | null;
  status?: string;
}