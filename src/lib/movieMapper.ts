import { Movie, TMDBMovieDetails, TMDBMovie } from '../types';
import { tmdbApi } from './tmdb';
import { TMDB_GENRES } from './constants';

export const mapTMDBToMovie = (tmdbMovie: TMDBMovie, category: 'trending' | 'anticipated' | 'boxoffice' = 'trending'): Partial<Movie> => {
  const genres = tmdbMovie.genre_ids?.map(id => TMDB_GENRES[id]).filter(Boolean) || [];
  
  const mapped = {
    id: tmdbMovie.id,
    title: tmdbMovie.title,
    year: tmdbMovie.release_date ? new Date(tmdbMovie.release_date).getFullYear() : 2024,
    poster: tmdbApi.getImageUrl(tmdbMovie.poster_path, 'w500'),
    backdrop: tmdbApi.getImageUrl(tmdbMovie.backdrop_path, 'original'),
    genre: genres,
    rating: Math.round(tmdbMovie.vote_average * 10) / 10,
    synopsis: tmdbMovie.overview || '',
    releaseDate: tmdbMovie.release_date || '',
    category,
    // Add default values for required fields
    criticScore: Math.round(tmdbMovie.vote_average * 10),
    runtime: 120, // Default runtime
    pgRating: 'PG-13',
    director: 'Unknown',
    writers: [],
    cast: [],
    country: 'United States',
    language: 'English',
    budget: 'N/A',
    boxOffice: 'N/A',
  };
  
  console.log('Mapped movie:', mapped.title, 'Category:', category);
  return mapped;
};

export const mapTMDBDetailsToMovie = (details: TMDBMovieDetails, category: 'trending' | 'anticipated' | 'boxoffice' = 'trending'): Movie => {
  const director = details.credits?.crew?.find(c => c.job === 'Director')?.name || 'Unknown';
  const writers = details.credits?.crew?.filter(c => c.job === 'Writer' || c.job === 'Screenplay').map(c => c.name) || [];
  
  return {
    id: details.id,
    title: details.title,
    year: details.release_date ? new Date(details.release_date).getFullYear() : 2024,
    poster: tmdbApi.getImageUrl(details.poster_path, 'w500'),
    backdrop: tmdbApi.getImageUrl(details.backdrop_path, 'original'),
    genre: details.genres?.map(g => g.name) || [],
    rating: Math.round(details.vote_average * 10) / 10,
    criticScore: Math.round(details.vote_average * 10),
    runtime: details.runtime || 0,
    pgRating: 'PG-13',
    synopsis: details.overview || '',
    director,
    writers: writers.slice(0, 3),
    cast: details.credits?.cast?.slice(0, 6).map(c => ({
      id: c.id,
      name: c.name,
      character: c.character,
      avatar: tmdbApi.getImageUrl(c.profile_path, 'w200'),
      profile_path: c.profile_path || undefined,
    })) || [],
    releaseDate: details.release_date || '',
    country: details.production_countries?.[0]?.name || 'United States',
    language: details.spoken_languages?.[0]?.name || 'English',
    budget: details.budget ? `$${(details.budget / 1000000).toFixed(0)} million` : 'N/A',
    boxOffice: details.revenue ? `$${(details.revenue / 1000000).toFixed(0)} million` : 'N/A',
    category,
  };
};
