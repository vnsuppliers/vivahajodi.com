export interface ReligiousInfo {
  religion_id: number | null;
  caste: string;
  sub_caste: string;
  mother_tongue_id: number | null;
}

export interface ReligiousInfoUpdatePayload {
  religion_id: number | null;
  caste: string;
  sub_caste: string;
  mother_tongue_id: number | null;

}