import { Movie, TMDBMovieDetails, TMDBMovie } from '../types';
import { tmdbApi } from './tmdb';
import { TMDB_GENRES } from './constants';

export const mapTMDBToMovie = (tmdbMovie: TMDBMovie, category: 'trending' | 'anticipated' | 'boxoffice' = 'trending'): Partial<Movie> => {
  const genres = tmdbMovie.genre_ids?.map(id => TMDB_GENRES[id]).filter(Boolean) || [];
  
  const posterUrl = tmdbApi.getImageUrl(tmdbMovie.poster_path, 'w500');
  const backdropUrl = tmdbApi.getImageUrl(tmdbMovie.backdrop_path, 'original');
  const fallbackPoster = (tmdbMovie.poster_path ? posterUrl : (tmdbMovie.backdrop_path ? backdropUrl : '')) || '';

  const mapped = {
    id: tmdbMovie.id,
    title: tmdbMovie.title,
    year: tmdbMovie.release_date ? new Date(tmdbMovie.release_date).getFullYear() : 2024,
    poster: fallbackPoster,
    backdrop: backdropUrl,
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
    cast: tmdbMovie.genre_ids ? [] : [],
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
  
  const posterUrl = tmdbApi.getImageUrl(details.poster_path, 'w500');
  const backdropUrl = tmdbApi.getImageUrl(details.backdrop_path, 'original');
  const fallbackPoster = (details.poster_path ? posterUrl : (details.backdrop_path ? backdropUrl : '')) || '';

  return {
    id: details.id,
    title: details.title,
    year: details.release_date ? new Date(details.release_date).getFullYear() : 2024,
    poster: fallbackPoster,
    backdrop: backdropUrl,
    genre: details.genres?.map(g => g.name) || [],
    rating: Math.round(details.vote_average * 10) / 10,
    criticScore: Math.round(details.vote_average * 10),
    runtime: details.runtime || 0,
    pgRating: 'PG-13',
    synopsis: details.overview || '',
    director,
    writers: writers.slice(0, 3),
    cast: details.credits?.cast?.length ? details.credits.cast.slice(0, 10).map(c => ({
      id: c.id,
      name: c.name,
      character: c.character,
      avatar: tmdbApi.getImageUrl(c.profile_path, 'w200'),
      profile_path: c.profile_path || undefined,
    })) : [],
    releaseDate: details.release_date || '',
    country: details.production_countries?.[0]?.name || 'United States',
    language: details.spoken_languages?.[0]?.name || 'English',
    budget: details.budget ? `$${(details.budget / 1000000).toFixed(0)} million` : 'N/A',
    boxOffice: details.revenue ? `$${(details.revenue / 1000000).toFixed(0)} million` : 'N/A',
    category,
    // Add missing metadata for Technical Specs
    production: details.production_companies?.slice(0, 2).map(c => c.name).join(', ') || 'N/A',
    status: details.status || 'N/A',
    imdbId: details.imdb_id || undefined,
    homepage: details.homepage || undefined,
    trailerId: details.videos?.results?.find(v => v.site === 'YouTube' && v.type === 'Trailer')?.key,
  };
};
