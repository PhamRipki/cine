const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_READ_TOKEN = import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN;
const TMDB_BASE_URL = import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3';
export const TMDB_IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p';

console.log("Initializing TMDB with key:", TMDB_API_KEY ? "EXISTS" : "MISSING");

export const getImageUrl = (
  path: string | null | undefined,
  size: 'w200' | 'w300' | 'w500' | 'w780' | 'original' = 'w500'
) => {
  if (!path) return '';
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};

export const getApiUrl = (endpoint: string) => {
  const separator = endpoint.includes('?') ? '&' : '?';
  return `${TMDB_BASE_URL}${endpoint}${separator}api_key=${TMDB_API_KEY || ''}`;
};

export const getHeaders = (): HeadersInit => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (TMDB_READ_TOKEN) {
    headers['Authorization'] = `Bearer ${TMDB_READ_TOKEN}`;
  }
  return headers;
};

const handleResponse = async (response: Response, endpoint: string) => {
  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Unknown error');
    console.error(`TMDB API Error (${endpoint}):`, response.status, errorText);
    throw new Error(`TMDB API Error: ${response.status}`);
  }
  return response.json();
};

export const tmdbApi = {
  getImageUrl,
  getTrending: async (mediaType: 'movie' | 'tv' = 'movie', timeWindow: 'day' | 'week' = 'week', page: number = 1) => {
    const url = getApiUrl(`/trending/${mediaType}/${timeWindow}?page=${page}`);
    try {
      const response = await fetch(url, { headers: getHeaders() });
      return await handleResponse(response, 'getTrending');
    } catch (error) {
      console.error('Failed to fetch trending movies:', error);
      return { results: [] };
    }
  },

  getPopular: async (mediaType: 'movie' | 'tv' = 'movie', page: number = 1) => {
    const url = getApiUrl(`/${mediaType}/popular?page=${page}`);
    try {
      const response = await fetch(url, { headers: getHeaders() });
      return await handleResponse(response, 'getPopular');
    } catch (error) {
      console.error('Failed to fetch popular:', error);
      return { results: [] };
    }
  },

  getTopRated: async (mediaType: 'movie' | 'tv' = 'movie', page: number = 1) => {
    const url = getApiUrl(`/${mediaType}/top_rated?page=${page}`);
    try {
      const response = await fetch(url, { headers: getHeaders() });
      return await handleResponse(response, 'getTopRated');
    } catch (error) {
      console.error('Failed to fetch top rated:', error);
      return { results: [] };
    }
  },

  getUpcoming: async (page: number = 1) => {
    const url = getApiUrl(`/movie/upcoming?page=${page}`);
    try {
      const response = await fetch(url, { headers: getHeaders() });
      return await handleResponse(response, 'getUpcoming');
    } catch (error) {
      console.error('Failed to fetch upcoming:', error);
      return { results: [] };
    }
  },

  getNowPlaying: async (page: number = 1) => {
    const url = getApiUrl(`/movie/now_playing?page=${page}`);
    try {
      const response = await fetch(url, { headers: getHeaders() });
      return await handleResponse(response, 'getNowPlaying');
    } catch (error) {
      console.error('Failed to fetch now playing:', error);
      return { results: [] };
    }
  },

  getMovieDetails: async (movieId: number) => {
    const url = getApiUrl(`/movie/${movieId}?append_to_response=credits,videos,similar`);
    try {
      const response = await fetch(url, { headers: getHeaders() });
      return await handleResponse(response, 'getMovieDetails');
    } catch (error) {
      console.error('TMDB Error:', error);
      console.error('Failed to fetch movie details:', error);
      return null;
    }
  },

  searchMovies: async (query: string) => {
    const url = getApiUrl(`/search/movie?query=${encodeURIComponent(query)}`);
    try {
      const response = await fetch(url, { headers: getHeaders() });
      return await handleResponse(response, 'searchMovies');
    } catch (error) {
      console.error('Failed to search movies:', error);
      return { results: [] };
    }
  },

  discoverMovies: async (params: {
    with_genres?: string;
    'primary_release_date.gte'?: string;
    'primary_release_date.lte'?: string;
    'vote_average.gte'?: number;
    sort_by?: string;
  }) => {
    const queryParams = new URLSearchParams(params as Record<string, string>).toString();
    const url = getApiUrl(`/discover/movie?${queryParams}`);
    try {
      const response = await fetch(url, { headers: getHeaders() });
      return await handleResponse(response, 'discoverMovies');
    } catch (error) {
      console.error('Failed to discover movies:', error);
      return { results: [] };
    }
  },

  getMoviesByGenre: async (genreId: number, page: number = 1) => {
    const url = getApiUrl(`/discover/movie?with_genres=${genreId}&sort_by=popularity.desc&page=${page}`);
    try {
      const response = await fetch(url, { headers: getHeaders() });
      return await handleResponse(response, 'getMoviesByGenre');
    } catch (error) {
      console.error('Failed to fetch movies by genre:', error);
      return { results: [] };
    }
  },

  getGenres: async () => {
    const url = getApiUrl(`/genre/movie/list`);
    try {
      const response = await fetch(url, { headers: getHeaders() });
      return await handleResponse(response, 'getGenres');
    } catch (error) {
      console.error('Failed to fetch genres:', error);
      return { genres: [] };
    }
  },

  getMovieVideos: async (movieId: number) => {
    const url = getApiUrl(`/movie/${movieId}/videos`);
    try {
      const response = await fetch(url, { headers: getHeaders() });
      const data = await handleResponse(response, 'getMovieVideos');
      return data.results.filter((v: any) => v.site === 'YouTube' && v.type === 'Trailer');
    } catch (error) {
      console.error('Failed to fetch movie videos:', error);
      return [];
    }
  },

  getSimilarMovies: async (movieId: number) => {
    const url = getApiUrl(`/movie/${movieId}/similar`);
    try {
      const response = await fetch(url, { headers: getHeaders() });
      const data = await handleResponse(response, 'getSimilarMovies');
      return data.results;
    } catch (error) {
      console.error('Failed to fetch similar movies:', error);
      return [];
    }
  },
};
