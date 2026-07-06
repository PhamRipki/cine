import { Search, Star, Clock } from 'lucide-react';
import { Movie } from '../types';

interface SearchResultsProps {
  movies: Movie[];
  query: string;
  onMovieClick: (movie: Movie) => void;
}

export default function SearchResults({ movies, query, onMovieClick }: SearchResultsProps) {
  if (!query.trim()) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-2 mb-6">
        <Search size={16} className="text-slate-400" />
        <span className="text-slate-400 text-sm">
          {movies.length > 0
            ? `${movies.length} result${movies.length !== 1 ? 's' : ''} for `
            : 'No results for '}
        </span>
        <span className="text-white font-medium text-sm">"{query}"</span>
      </div>

      {movies.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-4">
            <Search size={28} className="text-slate-600" />
          </div>
          <p className="text-slate-400 font-medium">No movies found</p>
          <p className="text-slate-600 text-sm mt-1">Try a different search term</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {movies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => onMovieClick(movie)}
              className="flex gap-4 bg-slate-800 rounded-xl p-4 border border-white/5 hover:border-indigo-500/25 cursor-pointer transition-all group"
            >
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-16 h-24 object-cover rounded-lg flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold leading-tight group-hover:text-indigo-400 transition-colors line-clamp-2">
                  {movie.title}
                </h3>
                <p className="text-slate-500 text-xs mt-1">{movie.year} &middot; {movie.director}</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1">
                    <Star size={12} className="text-indigo-400" fill="currentColor" />
                    <span className="text-indigo-400 text-xs font-bold">{movie.rating}</span>
                  </div>
                  <span className="text-slate-700">|</span>
                  <span className="flex items-center gap-1 text-slate-500 text-xs">
                    <Clock size={10} />
                    {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {movie.genre.slice(0, 2).map((g) => (
                    <span key={g} className="text-[10px] text-slate-500 bg-white/5 px-2 py-0.5 rounded">
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
