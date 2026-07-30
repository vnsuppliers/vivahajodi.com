/**
 * Generic interface for all dropdown/master data
 * (Countries, States, Cities, Religions, Genders)
 */
export interface MasterOption {
  id: number;
  name: string;
}

/**
 * Standard API Wrapper if your backend returns 
 * data inside a 'data' property
 */
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status?: number;
}