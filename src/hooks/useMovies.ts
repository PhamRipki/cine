import { useState, useEffect } from 'react';
import { Movie, TMDBMovie } from '../types';
import { tmdbApi } from '../lib/tmdb';
import { mapTMDBToMovie } from '../lib/movieMapper';

export const useMovies = () => {
  const [movies, setMovies] = useState<Partial<Movie>[]>([]);
  const [heroMovie, setHeroMovie] = useState<Partial<Movie> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        console.log('🎬 Fetching movies from TMDB...');
        console.log('API Key:', import.meta.env.VITE_TMDB_API_KEY ? 'Present' : 'Missing');
        console.log('Base URL:', import.meta.env.VITE_TMDB_BASE_URL);
        
        console.log('📞 Calling getTrending...');
        const trendingRes = await tmdbApi.getTrending('movie', 'week');
        console.log('✅ Trending response:', trendingRes);
        
        console.log('📞 Calling getPopular...');
        const popularRes = await tmdbApi.getPopular('movie');
        console.log('✅ Popular response:', popularRes);
        
        console.log('📞 Calling getUpcoming...');
        const upcomingRes = await tmdbApi.getUpcoming();
        console.log('✅ Upcoming response:', upcomingRes);

        const trending = trendingRes.results?.slice(0, 8).map((m: TMDBMovie) => mapTMDBToMovie(m, 'trending')) || [];
        const boxoffice = popularRes.results?.slice(0, 8).map((m: TMDBMovie) => mapTMDBToMovie(m, 'boxoffice')) || [];
        const anticipated = upcomingRes.results?.slice(0, 8).map((m: TMDBMovie) => mapTMDBToMovie(m, 'anticipated')) || [];

        console.log('🎯 Mapped trending:', trending.length);
        console.log('🎯 Mapped boxoffice:', boxoffice.length);
        console.log('🎯 Mapped anticipated:', anticipated.length);

        const allMovies = [...trending, ...boxoffice, ...anticipated];
        console.log('📊 Total movies fetched:', allMovies.length);
        setMovies(allMovies);
        
        if (trending.length > 0) {
          setHeroMovie(trending[0]);
          console.log('🦸 Hero movie set:', trending[0].title);
        }

        setError(null);
        console.log('✅ All movies loaded successfully!');
      } catch (err) {
        console.error('❌ Error fetching movies:', err);
        console.error('Error details:', err instanceof Error ? err.message : String(err));
        setError('Failed to fetch movies');
      } finally {
        setLoading(false);
        console.log('🏁 Loading complete');
      }
    };

    fetchMovies();
  }, []);

  return { movies, heroMovie, loading, error };
};
