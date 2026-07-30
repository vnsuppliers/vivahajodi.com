export interface EducationForm {
  education_id: string;
  specialisation_id: string;
  country_id: string;
  state_id: string;
  city_id: string;

  college_name: string;
  university_name: string;
  passing_year: string;
  education_address: string;

  education_info_status: string | number;

  status: number;

  is_highest_education: boolean;

  education_info_id?: string;
}