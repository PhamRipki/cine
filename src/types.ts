export interface CastMember {
  id: number;
  name: string;
  character: string;
  avatar: string;
  profile_path?: string;
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
  // TMDB fields
  original_title?: string;
  overview?: string;
  poster_path?: string;
  backdrop_path?: string;
  release_date?: string;
  vote_average?: number;
  vote_count?: number;
  popularity?: number;
  genre_ids?: number[];
}

export type TabType = 'trending' | 'anticipated' | 'boxoffice';

export interface FilterState {
  genres: string[];
  yearMin: number;
  yearMax: number;
  minRating: number;
}

export interface TMDBMovie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  video: boolean;
}

export interface TMDBMovieDetails extends TMDBMovie {
  runtime: number;
  budget: number;
  revenue: number;
  genres: { id: number; name: string }[];
  production_countries: { iso_3166_1: string; name: string }[];
  spoken_languages: { iso_639_1: string; name: string }[];
  credits: {
    cast: {
      id: number;
      name: string;
      character: string;
      profile_path: string | null;
      order: number;
    }[];
    crew: {
      id: number;
      name: string;
      job: string;
      department: string;
    }[];
  };
}
