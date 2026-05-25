import { X, Bookmark, Star, Trash2 } from 'lucide-react';
import { Movie } from '../types';

interface WatchlistPanelProps {
  movies: Movie[];
  onClose: () => void;
  onMovieClick: (movie: Movie) => void;
  onRemove: (movie: Movie) => void;
}

export default function WatchlistPanel({ movies, onClose, onMovieClick, onRemove }: WatchlistPanelProps) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative z-10 w-full max-w-sm bg-[#13161f] border-l border-white/10 h-full overflow-y-auto flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/8">
          <div className="flex items-center gap-2">
            <Bookmark size={16} className="text-amber-400" fill="currentColor" />
            <h2 className="text-white font-bold text-base">My Watchlist</h2>
            {movies.length > 0 && (
              <span className="bg-amber-500 text-black text-xs font-bold px-2 py-0.5 rounded-full">
                {movies.length}
              </span>
            )}
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors p-1">
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-4">
          {movies.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-4">
                <Bookmark size={24} className="text-slate-600" />
              </div>
              <p className="text-slate-400 text-sm font-medium">Your watchlist is empty</p>
              <p className="text-slate-600 text-xs mt-1">Browse movies and save them here</p>
            </div>
          ) : (
            <div className="space-y-3">
              {movies.map((movie) => (
                <div
                  key={movie.id}
                  className="flex items-center gap-3 bg-[#0d0f14] rounded-xl p-3 border border-white/5 hover:border-amber-500/20 transition-all cursor-pointer group"
                  onClick={() => onMovieClick(movie)}
                >
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-12 h-16 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white text-sm font-semibold line-clamp-1 group-hover:text-amber-400 transition-colors">
                      {movie.title}
                    </h3>
                    <p className="text-slate-500 text-xs mt-0.5">{movie.year}</p>
                    <div className="flex items-center gap-1 mt-1.5">
                      <Star size={11} className="text-amber-400" fill="currentColor" />
                      <span className="text-amber-400 text-xs font-bold">{movie.rating}</span>
                      <span className="text-slate-600 text-xs ml-1">{movie.genre[0]}</span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); onRemove(movie); }}
                    className="text-slate-600 hover:text-red-400 transition-colors p-1 opacity-0 group-hover:opacity-100 flex-shrink-0"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
