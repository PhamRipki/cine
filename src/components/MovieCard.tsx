import { Star, Clock, Bookmark, Shield, TrendingUp, DollarSign } from 'lucide-react';
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
  return (
    <div
      className="group relative bg-[#13161f] rounded-xl overflow-hidden border border-white/5 hover:border-amber-500/25 transition-all duration-300 cursor-pointer flex-shrink-0 w-52"
      onClick={() => onClick(movie)}
    >
      {/* Poster */}
      <div className="relative overflow-hidden aspect-[2/3]">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#13161f] via-transparent to-transparent opacity-60" />

        {/* Rank badge */}
        {rank && (
          <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm text-amber-400 text-xs font-bold px-2 py-1 rounded-lg border border-amber-500/30">
            #{rank}
          </div>
        )}

        {/* Tab-specific badge */}
        {activeTab === 'trending' && (
          <div className="absolute top-2 right-2 bg-rose-500/80 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1">
            <TrendingUp size={10} />
            Hot
          </div>
        )}
        {activeTab === 'boxoffice' && (
          <div className="absolute top-2 right-2 bg-emerald-500/80 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1">
            <DollarSign size={10} />
            {movie.boxOffice}
          </div>
        )}

        {/* Watchlist button */}
        <button
          onClick={(e) => { e.stopPropagation(); onWatchlistToggle(movie); }}
          className={`absolute bottom-2 right-2 p-1.5 rounded-lg backdrop-blur-sm transition-all ${
            isInWatchlist
              ? 'bg-amber-500/90 text-black'
              : 'bg-black/60 text-white opacity-0 group-hover:opacity-100'
          }`}
        >
          <Bookmark size={14} fill={isInWatchlist ? 'currentColor' : 'none'} />
        </button>

        {/* PG Rating */}
        <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-xs text-slate-300 px-1.5 py-0.5 rounded border border-white/10">
          {movie.pgRating}
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="text-white text-sm font-semibold leading-tight mb-1 line-clamp-1 group-hover:text-amber-400 transition-colors">
          {movie.title}
        </h3>
        <div className="text-slate-500 text-xs mb-2">{movie.year}</div>

        {/* Ratings row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star size={12} className="text-amber-400" fill="currentColor" />
            <span className="text-amber-400 text-xs font-bold">{movie.rating}</span>
          </div>
          <div className={`flex items-center gap-1 text-xs font-semibold px-1.5 py-0.5 rounded ${
            movie.criticScore >= 80 ? 'bg-emerald-500/15 text-emerald-400' :
            movie.criticScore >= 60 ? 'bg-yellow-500/15 text-yellow-400' :
            'bg-red-500/15 text-red-400'
          }`}>
            <Shield size={10} />
            {movie.criticScore}
          </div>
        </div>

        {/* Runtime */}
        <div className="flex items-center gap-1 mt-2 text-slate-600 text-xs">
          <Clock size={10} />
          {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
        </div>

        {/* Genres */}
        <div className="flex flex-wrap gap-1 mt-2">
          {movie.genre.slice(0, 2).map((g) => (
            <span key={g} className="text-[10px] text-slate-500 bg-white/5 px-1.5 py-0.5 rounded">
              {g}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
