import { useState, useMemo } from 'react';
import { Movie, TabType, FilterState } from './types';
import { movies, heroMovie } from './data/movies';
import Header from './components/Header';
import HeroSpotlight from './components/HeroSpotlight';
import ContentTabs from './components/ContentTabs';
import FilterPanel from './components/FilterPanel';
import MovieDetail from './components/MovieDetail';
import WatchlistPanel from './components/WatchlistPanel';
import SearchResults from './components/SearchResults';

export default function App() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('trending');
  const [watchlist, setWatchlist] = useState<Set<number>>(new Set());
  const [showWatchlist, setShowWatchlist] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    genres: [],
    yearMin: 2020,
    yearMax: 2024,
    minRating: 0,
  });

  const toggleWatchlist = (movie: Movie) => {
    setWatchlist((prev) => {
      const next = new Set(prev);
      if (next.has(movie.id)) next.delete(movie.id);
      else next.add(movie.id);
      return next;
    });
  };

  const watchlistMovies = movies.filter((m) => watchlist.has(m.id));

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return movies.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.director.toLowerCase().includes(q) ||
        m.cast.some((c) => c.name.toLowerCase().includes(q)) ||
        m.genre.some((g) => g.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const filteredMovies = useMemo(() => {
    return movies.filter((m) => {
      if (filters.genres.length > 0 && !m.genre.some((g) => filters.genres.includes(g))) return false;
      if (m.year < filters.yearMin || m.year > filters.yearMax) return false;
      if (m.rating < filters.minRating) return false;
      return true;
    });
  }, [filters]);

  const showSearch = searchQuery.trim().length > 0;

  return (
    <div className="min-h-screen bg-[#0d0f14] text-white">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        watchlistCount={watchlist.size}
        onWatchlistClick={() => setShowWatchlist(true)}
        onTop250Click={() => {}}
      />

      {showSearch ? (
        <SearchResults
          movies={searchResults}
          query={searchQuery}
          onMovieClick={setSelectedMovie}
        />
      ) : (
        <>
          <HeroSpotlight
            movie={heroMovie}
            onMovieClick={setSelectedMovie}
            onWatchlistAdd={toggleWatchlist}
            isInWatchlist={watchlist.has(heroMovie.id)}
          />

          <div className="py-4">
            <FilterPanel filters={filters} onFiltersChange={setFilters} />
          </div>

          <ContentTabs
            movies={filteredMovies}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onMovieClick={setSelectedMovie}
            onWatchlistToggle={toggleWatchlist}
            watchlist={watchlist}
          />

          {/* Stats strip */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Movies in Database', value: movies.length.toLocaleString() },
                { label: 'Average Rating', value: (movies.reduce((a, m) => a + m.rating, 0) / movies.length).toFixed(1) },
                { label: 'Combined Box Office', value: '$8.2B+' },
                { label: 'Genres Covered', value: '15' },
              ].map((stat) => (
                <div key={stat.label} className="bg-[#13161f] rounded-xl p-4 border border-white/5 text-center">
                  <div className="text-2xl font-bold text-amber-400">{stat.value}</div>
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
                  <div className="w-6 h-6 bg-amber-500 rounded flex items-center justify-center">
                    <span className="text-black text-xs font-bold">C</span>
                  </div>
                  <span className="text-white font-bold">Cine<span className="text-amber-400">Data</span></span>
                  <span className="text-slate-600 text-sm ml-1">— The Modern Movie Database</span>
                </div>
                <p className="text-slate-600 text-xs">
                  Data sourced for demonstration. All rights to respective studios.
                </p>
              </div>
            </div>
          </footer>
        </>
      )}

      {/* Movie Detail Modal */}
      {selectedMovie && (
        <MovieDetail
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          onWatchlistToggle={toggleWatchlist}
          isInWatchlist={watchlist.has(selectedMovie.id)}
        />
      )}

      {/* Watchlist Drawer */}
      {showWatchlist && (
        <WatchlistPanel
          movies={watchlistMovies}
          onClose={() => setShowWatchlist(false)}
          onMovieClick={(m) => { setSelectedMovie(m); setShowWatchlist(false); }}
          onRemove={toggleWatchlist}
        />
      )}
    </div>
  );
}
