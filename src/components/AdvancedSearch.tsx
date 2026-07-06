import { useState } from 'react';
import { X, Search, SlidersHorizontal, Calendar, Star, Globe, Filter } from 'lucide-react';
import { Movie } from '../types';

interface AdvancedSearchProps {
  isOpen: boolean;
  onClose: () => void;
  movies: Partial<Movie>[];
  onResults: (results: Partial<Movie>[]) => void;
}

interface SearchFilters {
  query: string;
  genres: string[];
  yearMin: number;
  yearMax: number;
  ratingMin: number;
  ratingMax: number;
  sortBy: 'title' | 'year' | 'rating' | 'popularity';
  sortOrder: 'asc' | 'desc';
}

const allGenres = [
  'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary',
  'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music',
  'Mystery', 'Romance', 'Sci-Fi', 'Thriller', 'War', 'Western'
];

const currentYear = new Date().getFullYear();

export default function AdvancedSearch({ isOpen, onClose, movies, onResults }: AdvancedSearchProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    genres: [],
    yearMin: 1900,
    yearMax: currentYear + 2,
    ratingMin: 0,
    ratingMax: 10,
    sortBy: 'popularity',
    sortOrder: 'desc',
  });

  const [resultsCount, setResultsCount] = useState(0);

  if (!isOpen) return null;

  const handleSearch = () => {
    let results = [...movies];

    // Filter by query (title, director)
    if (filters.query.trim()) {
      const query = filters.query.toLowerCase();
      results = results.filter(
        (m) =>
          m.title?.toLowerCase().includes(query) ||
          m.director?.toLowerCase().includes(query)
      );
    }

    // Filter by genres
    if (filters.genres.length > 0) {
      results = results.filter((m) =>
        filters.genres.some((genre) => m.genre?.includes(genre))
      );
    }

    // Filter by year range
    results = results.filter(
      (m) => m.year && m.year >= filters.yearMin && m.year <= filters.yearMax
    );

    // Filter by rating range
    results = results.filter(
      (m) =>
        m.rating &&
        m.rating >= filters.ratingMin &&
        m.rating <= filters.ratingMax
    );

    // Sort results
    results.sort((a, b) => {
      let comparison = 0;

      if (filters.sortBy === 'title') {
        comparison = (a.title || '').localeCompare(b.title || '');
      } else if (filters.sortBy === 'year') {
        comparison = (a.year || 0) - (b.year || 0);
      } else if (filters.sortBy === 'rating') {
        comparison = (a.rating || 0) - (b.rating || 0);
      } else if (filters.sortBy === 'popularity') {
        comparison = (b.rating || 0) - (a.rating || 0); // Higher rating = more popular
      }

      return filters.sortOrder === 'asc' ? comparison : -comparison;
    });

    setResultsCount(results.length);
    onResults(results);
  };

  const handleReset = () => {
    setFilters({
      query: '',
      genres: [],
      yearMin: 1900,
      yearMax: currentYear + 2,
      ratingMin: 0,
      ratingMax: 10,
      sortBy: 'popularity',
      sortOrder: 'desc',
    });
    setResultsCount(0);
    onResults(movies);
  };

  const toggleGenre = (genre: string) => {
    setFilters((prev) => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter((g) => g !== genre)
        : [...prev.genres, genre],
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-4xl my-8 bg-slate-800 rounded-2xl border border-white/10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-br from-indigo-500/20 to-transparent p-6 border-b border-white/10">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center">
              <SlidersHorizontal size={20} className="text-indigo-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Advanced Search</h2>
              <p className="text-slate-400 text-sm">
                Find exactly what you're looking for
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Search Query */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Search by Title or Director
            </label>
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={filters.query}
                onChange={(e) => setFilters({ ...filters, query: e.target.value })}
                placeholder="e.g., Inception, Christopher Nolan"
                className="w-full bg-slate-900 text-white placeholder-slate-500 pl-10 pr-4 py-3 rounded-lg border border-white/10 focus:border-indigo-500/50 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 transition-all"
              />
            </div>
          </div>

          {/* Genres */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
              <Filter size={16} />
              Genres ({filters.genres.length} selected)
            </label>
            <div className="flex flex-wrap gap-2">
              {allGenres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => toggleGenre(genre)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    filters.genres.includes(genre)
                      ? 'bg-indigo-500 text-black'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* Year Range */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                <Calendar size={16} />
                Year From
              </label>
              <input
                type="number"
                value={filters.yearMin}
                onChange={(e) => setFilters({ ...filters, yearMin: parseInt(e.target.value) || 1900 })}
                min={1900}
                max={currentYear + 2}
                className="w-full bg-slate-900 text-white pl-4 pr-4 py-3 rounded-lg border border-white/10 focus:border-indigo-500/50 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                <Calendar size={16} />
                Year To
              </label>
              <input
                type="number"
                value={filters.yearMax}
                onChange={(e) => setFilters({ ...filters, yearMax: parseInt(e.target.value) || currentYear + 2 })}
                min={1900}
                max={currentYear + 2}
                className="w-full bg-slate-900 text-white pl-4 pr-4 py-3 rounded-lg border border-white/10 focus:border-indigo-500/50 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 transition-all"
              />
            </div>
          </div>

          {/* Rating Range */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                <Star size={16} />
                Min Rating: {filters.ratingMin.toFixed(1)}
              </label>
              <input
                type="range"
                value={filters.ratingMin}
                onChange={(e) => setFilters({ ...filters, ratingMin: parseFloat(e.target.value) })}
                min={0}
                max={10}
                step={0.1}
                className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                <Star size={16} />
                Max Rating: {filters.ratingMax.toFixed(1)}
              </label>
              <input
                type="range"
                value={filters.ratingMax}
                onChange={(e) => setFilters({ ...filters, ratingMax: parseFloat(e.target.value) })}
                min={0}
                max={10}
                step={0.1}
                className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>
          </div>

          {/* Sort Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                <Globe size={16} />
                Sort By
              </label>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as any })}
                className="w-full bg-slate-900 text-white pl-4 pr-4 py-3 rounded-lg border border-white/10 focus:border-indigo-500/50 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 transition-all"
              >
                <option value="popularity">Popularity</option>
                <option value="title">Title</option>
                <option value="year">Year</option>
                <option value="rating">Rating</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Order
              </label>
              <select
                value={filters.sortOrder}
                onChange={(e) => setFilters({ ...filters, sortOrder: e.target.value as any })}
                className="w-full bg-slate-900 text-white pl-4 pr-4 py-3 rounded-lg border border-white/10 focus:border-indigo-500/50 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 transition-all"
              >
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          {resultsCount > 0 && (
            <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-lg p-4 text-center">
              <p className="text-indigo-400 font-semibold">
                Found {resultsCount} movie{resultsCount !== 1 ? 's' : ''}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 flex items-center gap-3">
          <button
            onClick={handleReset}
            className="flex-1 bg-white/5 hover:bg-white/10 text-white font-semibold py-3 rounded-lg transition-all"
          >
            Reset Filters
          </button>
          <button
            onClick={handleSearch}
            className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-black font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
          >
            <Search size={18} />
            Search Movies
          </button>
        </div>
      </div>
    </div>
  );
}
