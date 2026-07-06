const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const TMDB_IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

if (!TMDB_API_KEY || !TMDB_BASE_URL) {
  throw new Error('Missing TMDB environment variables');
}

const headers = {
  'Authorization': `Bearer ${TMDB_API_KEY}`,
  'Content-Type': 'application/json',
};

export const tmdbApi = {
  getTrending: async (mediaType: 'movie' | 'tv' = 'movie', timeWindow: 'day' | 'week' = 'week', page: number = 1) => {
    const url = `${TMDB_BASE_URL}/trending/${mediaType}/${timeWindow}?page=${page}`;
    console.log('🔗 Fetching:', url);
    
    const response = await fetch(url, { headers });
    console.log('📡 Response status:', response.status, response.statusText);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API Error:', errorText);
      throw new Error(`TMDB API Error: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    console.log('✅ Data received:', data.results?.length, 'movies');
    return data;
  },

  getPopular: async (mediaType: 'movie' | 'tv' = 'movie', page: number = 1) => {
    const url = `${TMDB_BASE_URL}/${mediaType}/popular?page=${page}`;
    console.log('🔗 Fetching:', url);
    
    const response = await fetch(url, { headers });
    console.log('📡 Response status:', response.status, response.statusText);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API Error:', errorText);
      throw new Error(`TMDB API Error: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    console.log('✅ Data received:', data.results?.length, 'movies');
    return data;
  },

  getTopRated: async (mediaType: 'movie' | 'tv' = 'movie', page: number = 1) => {
    const url = `${TMDB_BASE_URL}/${mediaType}/top_rated?page=${page}`;
    const response = await fetch(url, { headers });
    
    if (!response.ok) {
      throw new Error(`TMDB API Error: ${response.status}`);
    }
    
    return response.json();
  },

  getUpcoming: async (page: number = 1) => {
    const url = `${TMDB_BASE_URL}/movie/upcoming?page=${page}`;
    console.log('🔗 Fetching:', url);
    
    const response = await fetch(url, { headers });
    console.log('📡 Response status:', response.status, response.statusText);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API Error:', errorText);
      throw new Error(`TMDB API Error: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    console.log('✅ Data received:', data.results?.length, 'movies');
    return data;
  },

  getNowPlaying: async (page: number = 1) => {
    const url = `${TMDB_BASE_URL}/movie/now_playing?page=${page}`;
    console.log('🔗 Fetching:', url);
    
    const response = await fetch(url, { headers });
    console.log('📡 Response status:', response.status, response.statusText);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API Error:', errorText);
      throw new Error(`TMDB API Error: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    console.log('✅ Data received:', data.results?.length, 'movies');
    return data;
  },

  getMovieDetails: async (movieId: number) => {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${movieId}?append_to_response=credits,videos`,
      { headers }
    );
    return response.json();
  },

  searchMovies: async (query: string) => {
    const response = await fetch(
      `${TMDB_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`,
      { headers }
    );
    return response.json();
  },

  discoverMovies: async (params: {
    with_genres?: string;
    'primary_release_date.gte'?: string;
    'primary_release_date.lte'?: string;
    'vote_average.gte'?: number;
    sort_by?: string;
  }) => {
    const queryParams = new URLSearchParams(params as Record<string, string>).toString();
    const response = await fetch(
      `${TMDB_BASE_URL}/discover/movie?${queryParams}`,
      { headers }
    );
    return response.json();
  },

  getImageUrl: (path: string | null, size: 'w200' | 'w300' | 'w500' | 'w780' | 'original' = 'w500') => {
    if (!path) return 'https://images.pexels.com/photos/1820559/pexels-photo-1820559.jpeg?auto=compress&cs=tinysrgb&w=400';
    return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
  },
};
