export interface RelativesInfo {
  relatives_info_id: string;

  relative_name: string;

  relation: string;

  occupation: string;

  location: string;

  contact_number: string;

  email: string;

  notes: string;

  status: number;
}

export const initialRelativesInfo: RelativesInfo = {
  relatives_info_id: "",

  relative_name: "",

  relation: "",

  occupation: "",

  location: "",

  contact_number: "",

  email: "",

  notes: "",

  status: 1,
};