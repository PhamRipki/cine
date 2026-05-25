export interface CastMember {
  id: number;
  name: string;
  character: string;
  avatar: string;
}

export interface Movie {
  id: number;
  title: string;
  year: number;
  poster: string;
  backdrop: string;
  genre: string[];
  rating: number;
  criticScore: number;
  runtime: number;
  pgRating: string;
  synopsis: string;
  director: string;
  writers: string[];
  cast: CastMember[];
  releaseDate: string;
  country: string;
  language: string;
  budget: string;
  boxOffice: string;
  category: 'trending' | 'anticipated' | 'boxoffice';
}

export type TabType = 'trending' | 'anticipated' | 'boxoffice';

export interface FilterState {
  genres: string[];
  yearMin: number;
  yearMax: number;
  minRating: number;
}
