import { useState, useEffect, useCallback } from 'react';
import { Movie } from './types';
import { movies as fallbackMovies, heroMovie as fallbackHero } from './data/movies';
import { useMovies } from './hooks/useMovies';
import { useDebounce } from './hooks/useDebounce';
import { useWatchlist } from './hooks/useWatchlist';
import { useAuth } from './hooks/useAuth';
import { tmdbApi } from './lib/tmdb';
import { mapTMDBToMovie } from './lib/movieMapper';
import Header from './components/Header';
import HeroSpotlight from './components/HeroSpotlight';
import MovieGrid from './components/MovieGrid';
import MovieDetail from './components/MovieDetail';
import WatchlistPanel from './components/WatchlistPanel';
import AuthModal from './components/AuthModal';
import AdvancedSearch from './components/AdvancedSearch';
import { Toast, ToastMessage } from './components/Toast';

export default function App() {
  const { user, signOut } = useAuth();
  const { movies: apiMovies, heroMovie: apiHero, loading, error } = useMovies();
  const { watchlist, toggleWatchlist: toggleWatchlistHook, syncWithSupabase, clearWatchlist } = useWatchlist(user?.id);
  
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [showWatchlist, setShowWatchlist] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [filteredMovies, setFilteredMovies] = useState<Partial<Movie>[]>([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ id: Date.now(), message, type });
  }, []);

  // Use API movies if available, otherwise fallback
  const movies = apiMovies.length > 0 ? apiMovies : fallbackMovies;
  const heroMovie = apiHero || fallbackHero;

  // Use filtered movies if search is active, otherwise use all movies
  const displayMovies = isSearchActive ? filteredMovies : movies;

  useEffect(() => {
    const search = async () => {
      if (!debouncedSearchQuery.trim()) {
        setIsSearchActive(false);
        setFilteredMovies([]);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);
      try {
        const results = await tmdbApi.searchMovies(debouncedSearchQuery);
        const mappedResults = (results.results || []).map((m: any) => mapTMDBToMovie(m, 'trending'));
        setFilteredMovies(mappedResults);
        setIsSearchActive(true);
      } catch (err) {
        console.error('Search failed:', err);
      } finally {
        setIsSearching(false);
      }
    };

    search();
  }, [debouncedSearchQuery]);

  // Separate movies by category
  const trendingMovies = displayMovies.filter(m => m.category === 'trending');
  const anticipatedMovies = displayMovies.filter(m => m.category === 'anticipated');
  const boxofficeMovies = displayMovies.filter(m => m.category === 'boxoffice');
  const nowPlayingMovies = displayMovies.filter(m => m.category === 'nowplaying');
  const topRatedMovies = displayMovies.filter(m => m.category === 'toprated');

  // Sync watchlist when user logs in
  useEffect(() => {
    if (user?.id) {
      syncWithSupabase(user.id);
      showToast(`Berhasil Login sebagai ${user.email}`);
    }
  }, [user?.id, showToast]);

  const toggleWatchlist = (movie: Partial<Movie>) => {
    if (!user) {
      setShowAuthModal(true);
      showToast('Silakan login terlebih dahulu untuk menyimpan ke Watchlist', 'info');
      return;
    }
    toggleWatchlistHook(movie.id!);
  };

  const handleSignOut = async () => {
    await signOut();
    clearWatchlist();
    showToast('Berhasil Logout', 'info');
  };

  const handleAdvancedSearchResults = (results: Partial<Movie>[]) => {
    const uniqueResults = Array.from(new Map(results.map(m => [m.id, m])).values());
    setFilteredMovies(uniqueResults);
    setIsSearchActive(true);
    setShowAdvancedSearch(false);
  };

  const safeWatchlist = watchlist instanceof Set ? watchlist : new Set<number>();
  const watchlistCount = safeWatchlist.size;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400 text-lg">Loading movies from TMDB...</p>
          <p className="text-slate-600 text-sm mt-2">Please wait...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Toast message={toast} onClose={() => setToast(null)} />
      {/* Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        watchlistCount={watchlistCount}
        onWatchlistClick={() => setShowWatchlist(true)}
        onAdvancedSearchClick={() => setShowAdvancedSearch(true)}
        onAuthClick={() => setShowAuthModal(true)}
        user={user}
        onSignOut={handleSignOut}
      />


      {/* Hero Section */}
      {heroMovie && (
        <HeroSpotlight
          movie={heroMovie as Movie}
          onMovieClick={setSelectedMovie}
          onWatchlistAdd={toggleWatchlist}
          isInWatchlist={heroMovie.id ? safeWatchlist.has(heroMovie.id) : false}
        />
      )}

      {/* API Status Banner */}
      {error && apiMovies.length === 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-lg p-4 flex items-start gap-3">
            <span className="text-2xl">⚠️</span>
            <div className="flex-1">
              <h3 className="font-semibold text-indigo-400 mb-1">Using Fallback Data</h3>
              <p className="text-sm text-slate-300">
                Could not connect to TMDB API. Showing sample movies instead.
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Check console (F12) for details or open test-api.html to test your API key.
              </p>
            </div>
          </div>
        </div>
      )}



      {/* Search Results Banner */}
      {isSearchActive && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-lg p-4 flex items-start gap-3">
            <span className="text-2xl">🔍</span>
            <div className="flex-1">
              <p className="text-sm text-slate-300">
                Filtered by: {filteredMovies.length} movie{filteredMovies.length !== 1 ? 's' : ''}
              </p>
            </div>
            <button
              onClick={() => {
                setIsSearchActive(false);
                setFilteredMovies([]);
                setSearchQuery('');
              }}
              className="text-indigo-400 hover:text-indigo-300 text-sm font-semibold"
            >
              Clear Filter
            </button>
          </div>
        </div>
      )}

      {/* Movie Grids */}
      {!isSearchActive ? (
        <>
          <MovieGrid
            movies={trendingMovies}
            title="🔥 Trending Today"
            onMovieClick={(m) => setSelectedMovie(m as Movie)}
            onWatchlistToggle={toggleWatchlist}
            watchlist={safeWatchlist}
          />
          <MovieGrid
            movies={nowPlayingMovies}
            title="🎬 Now Playing in Theaters"
            onMovieClick={(m) => setSelectedMovie(m as Movie)}
            onWatchlistToggle={toggleWatchlist}
            watchlist={safeWatchlist}
          />
          <MovieGrid
            movies={boxofficeMovies}
            title="💰 Box Office Top Sellers"
            onMovieClick={(m) => setSelectedMovie(m as Movie)}
            onWatchlistToggle={toggleWatchlist}
            watchlist={safeWatchlist}
          />
          <MovieGrid
            movies={anticipatedMovies}
            title="⚡ Most Anticipated"
            onMovieClick={(m) => setSelectedMovie(m as Movie)}
            onWatchlistToggle={toggleWatchlist}
            watchlist={safeWatchlist}
          />
          <MovieGrid
            movies={topRatedMovies}
            title="⭐ Top Rated Movies"
            onMovieClick={(m) => setSelectedMovie(m as Movie)}
            onWatchlistToggle={toggleWatchlist}
            watchlist={safeWatchlist}
          />
        </>
      ) : (
        <MovieGrid
          movies={filteredMovies as Movie[]}
          title={`Results: ${filteredMovies.length} movies`}
          onMovieClick={(m) => setSelectedMovie(m as Movie)}
          onWatchlistToggle={toggleWatchlist}
          watchlist={safeWatchlist}
          isLoading={isSearching}
        />
      )}

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Movies in Database', value: displayMovies.length.toLocaleString() },
            { label: 'Average Rating', value: (displayMovies.reduce((a, m) => a + (m.rating || 0), 0) / displayMovies.length).toFixed(1) },
            { label: 'Data Source', value: apiMovies.length > 0 ? 'TMDB API' : 'Fallback' },
            { label: 'Your Watchlist', value: watchlistCount.toString() },
          ].map((stat) => (
            <div key={stat.label} className="bg-slate-800 rounded-xl p-4 border border-white/5 text-center">
              <div className="text-2xl font-bold text-indigo-400">{stat.value}</div>
              <div className="text-slate-500 text-xs mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-indigo-500 rounded flex items-center justify-center">
                <span className="text-black text-xs font-bold">C</span>
              </div>
              <span className="text-white font-bold">Cine<span className="text-indigo-400">View</span></span>
              <span className="text-slate-600 text-sm ml-1">— The Modern Movie Database</span>
            </div>
            <p className="text-slate-600 text-xs">
              Data from TMDB API • {displayMovies.length} movies loaded
              {user && <span className="ml-2">• Synced with cloud</span>}
            </p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => setShowAuthModal(false)}
      />

      {/* Advanced Search Modal */}
      <AdvancedSearch
        isOpen={showAdvancedSearch}
        onClose={() => setShowAdvancedSearch(false)}
        movies={movies}
        onResults={handleAdvancedSearchResults}
      />

      {/* Movie Detail Modal */}
      {selectedMovie && (
        <MovieDetail
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          onWatchlistToggle={toggleWatchlist}
          isInWatchlist={selectedMovie?.id ? safeWatchlist.has(selectedMovie.id) : false}
        />
      )}

      {/* Watchlist Drawer */}
      {showWatchlist && (
        <WatchlistPanel
          movies={displayMovies.filter(m => m.id && safeWatchlist.has(m.id)) as Movie[]}
          onClose={() => setShowWatchlist(false)}
          onMovieClick={(m) => { setSelectedMovie(m); setShowWatchlist(false); }}
          onRemove={toggleWatchlist}
        />
      )}
    </div>
  );
}
