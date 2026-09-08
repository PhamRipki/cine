import { useState } from 'react';
import { Star, Clock, Bookmark, Shield, TrendingUp, DollarSign, Film } from 'lucide-react';
import { Movie, TabType } from '../types';

interface MovieCardProps {
  movie: Movie;
  rank?: number;
  onClick: (movie: Movie) => void;
  onWatchlistToggle: (movie: Movie) => void;
  isInWatchlist: boolean;
  activeTab: TabType;
}

export default function MovieCard({ movie, rank, onClick, onWatchlistToggle, isInWatchlist, activeTab }: MovieCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className="group relative bg-[#1a1a1a] rounded-md overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-all duration-300 cursor-pointer flex-shrink-0 w-48 shadow-lg"
      onClick={() => onClick(movie)}
    >
      {/* Poster */}
      <div className="relative overflow-hidden aspect-[2/3] bg-gradient-to-br from-slate-800 to-slate-950 flex flex-col items-center justify-center p-4 text-center">
        {!imageError && movie.poster ? (
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 absolute inset-0"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full w-full p-2 select-none">
            <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center mb-3 text-indigo-400 group-hover:scale-110 transition-transform">
              <Film size={24} />
            </div>
            <span className="text-xs font-bold text-slate-300 line-clamp-2 leading-tight">
              {movie.title}
            </span>
            <span className="text-[10px] text-slate-500 mt-1">{movie.year}</span>
          </div>
        )}

        {/* Watchlist button (IMDb ribbon style) */}
        <button
          onClick={(e) => { e.stopPropagation(); onWatchlistToggle(movie); }}
          className={`absolute top-0 left-0 p-2 backdrop-blur-sm transition-all z-10 ${
            isInWatchlist ? 'bg-[#3b82f6] text-white' : 'bg-black/60 text-white hover:bg-black/80'
          }`}
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)' }}
        >
          <Bookmark size={16} fill={isInWatchlist ? 'white' : 'none'} />
        </button>

        {/* Rank badge */}
        {rank && (
          <div className="absolute top-2 right-2 bg-black/80 text-[#3b82f6] text-xs font-bold px-2 py-0.5 rounded border border-[#3b82f6]/35 z-10">
            #{rank}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3 bg-[#1a1a1a]">
        {/* Rating row */}
        <div className="flex items-center gap-1 mb-1">
          <Star size={14} className="text-[#3b82f6]" fill="#3b82f6" />
          <span className="text-white text-xs font-bold">{movie.rating}</span>
          <span className="text-zinc-500 text-[10px]">/10</span>
        </div>

        <h3 className="text-white text-sm font-semibold leading-tight mb-1 line-clamp-1 group-hover:text-[#3b82f6] transition-colors">
          {movie.title}
        </h3>
        <div className="text-zinc-400 text-xs mb-3">{movie.year}</div>

        {/* Add to Watchlist button IMDb style */}
        <button
          onClick={(e) => { e.stopPropagation(); onWatchlistToggle(movie); }}
          className={`w-full py-1.5 px-2 rounded font-semibold text-xs flex items-center justify-center gap-1 transition-colors ${
            isInWatchlist
              ? 'bg-zinc-800 text-[#3b82f6] border border-[#3b82f6]/30'
              : 'bg-zinc-800 hover:bg-zinc-700 text-[#3b82f6]'
          }`}
        >
          <Bookmark size={12} fill={isInWatchlist ? '#3b82f6' : 'none'} />
          {isInWatchlist ? 'Watchlisted' : 'Watchlist'}
        </button>
      </div>
    </div>
  );
}
