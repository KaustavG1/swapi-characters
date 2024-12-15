import { Character } from "./Character";

export interface PeopleData {
  message: string;
  next: string | null;
  previous: string | null;
  results: Character[];
  total_pages: number;
  total_records: number;
}
