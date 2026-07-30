export interface HobbiesInfo {
  hobbies: string;
  interests: string;
  favorite_music: string;
  favorite_movies: string;
  favorite_books: string;
  sports: string;
  activities: string;
  languages_known: string;
  entertainment_preferences: string;
  travel_interests: string;
  status: number;

  hobbies_info_id: string;
}

export const initialHobbiesInfo: HobbiesInfo = {
  hobbies_info_id: "",

  hobbies: "",

  interests: "",

  favorite_music: "",

  favorite_movies: "",

  favorite_books: "",

  sports: "",

  activities: "",

  languages_known: "",

  entertainment_preferences: "",

  travel_interests: "",

  status: 1,
};
