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
        
        // Fetch multiple pages for each category to get more movies
        console.log('📞 Calling getTrending (2 pages)...');
        const trendingPage1 = await tmdbApi.getTrending('movie', 'week', 1);
        const trendingPage2 = await tmdbApi.getTrending('movie', 'week', 2);
        
        console.log('📞 Calling getPopular (2 pages)...');
        const popularPage1 = await tmdbApi.getPopular('movie', 1);
        const popularPage2 = await tmdbApi.getPopular('movie', 2);
        
        console.log('📞 Calling getUpcoming (2 pages)...');
        const upcomingPage1 = await tmdbApi.getUpcoming(1);
        const upcomingPage2 = await tmdbApi.getUpcoming(2);
        
        console.log('📞 Calling getNowPlaying (2 pages)...');
        const nowPlayingPage1 = await tmdbApi.getNowPlaying(1);
        const nowPlayingPage2 = await tmdbApi.getNowPlaying(2);

        console.log('📞 Calling getTopRated...');
        const topRatedRes = await tmdbApi.getTopRated('movie', 1);

        // Combine results from multiple pages
        const trendingResults = [...(trendingPage1.results || []), ...(trendingPage2.results || [])];
        const popularResults = [...(popularPage1.results || []), ...(popularPage2.results || [])];
        const upcomingResults = [...(upcomingPage1.results || []), ...(upcomingPage2.results || [])];
        const nowPlayingResults = [...(nowPlayingPage1.results || []), ...(nowPlayingPage2.results || [])];
        const topRatedResults = topRatedRes.results || [];

        // Map and limit to 20 movies per category
        const trending = trendingResults.slice(0, 20).map((m: TMDBMovie) => mapTMDBToMovie(m, 'trending'));
        const boxoffice = popularResults.slice(0, 20).map((m: TMDBMovie) => mapTMDBToMovie(m, 'boxoffice'));
        const anticipated = upcomingResults.slice(0, 20).map((m: TMDBMovie) => mapTMDBToMovie(m, 'anticipated'));
        const nowPlaying = nowPlayingResults.slice(0, 20).map((m: TMDBMovie) => mapTMDBToMovie(m, 'nowplaying'));
        const topRated = topRatedResults.slice(0, 20).map((m: TMDBMovie) => mapTMDBToMovie(m, 'toprated'));

        console.log('🎯 Mapped trending:', trending.length);
        console.log('🎯 Mapped boxoffice:', boxoffice.length);
        console.log('🎯 Mapped anticipated:', anticipated.length);
        console.log('🎯 Mapped now playing:', nowPlaying.length);
        console.log('🎯 Mapped top rated:', topRated.length);

        // Combine all movies (total: up to 100 movies)
        const allMovies = [...trending, ...boxoffice, ...anticipated, ...nowPlaying, ...topRated];
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
