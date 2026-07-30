import { MasterOption } from "./master.interface";

export type RegisterErrors = Partial<Record<keyof RegisterForm, string>>;

export interface BasicInfo {
  gender_id?: number;
  date_of_birth?: string;
  about?: string;
  profile_image?: string;
}

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  is_verified: number;
  is_premium: number;
  is_online: number;
  avatar?: string;
  basic_info?: BasicInfo;
  account_status: string;
}

export interface RegisterForm {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  gender_id: string;
  religion_id: string;
  country_id: string;
  state_id: string;
  city_id: string;
  about: string;
  success?: boolean;
  date_of_birth: string;
}


export interface MasterState {
  countries: MasterOption[];
  states: MasterOption[];
  cities: MasterOption[];
  religions: MasterOption[];
  genders: MasterOption[];
  success?: boolean;
}

export interface SearchState {
  country: string;
  state: string;
  city: string;
  success?: boolean;
}

export interface AuthResponse {
  message: string;
  access_token: string; // Matches NestJS
  user: User;
  success?: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
  success?: boolean;
}

