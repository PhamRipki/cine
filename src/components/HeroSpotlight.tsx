import { Play, Bookmark, Star, Clock, Shield } from 'lucide-react';
import { Movie } from '../types';

interface HeroSpotlightProps {
  movie: Movie;
  onMovieClick: (movie: Movie) => void;
  onWatchlistAdd: (movie: Movie) => void;
  isInWatchlist: boolean;
}

export default function HeroSpotlight({ movie, onMovieClick, onWatchlistAdd, isInWatchlist }: HeroSpotlightProps) {
  return (
    <section className="relative w-full h-[560px] overflow-hidden">
      {/* Backdrop */}
      <img
        src={movie.backdrop}
        alt={movie.title}
        className="absolute inset-0 w-full h-full object-cover object-center scale-105"
        style={{ filter: 'brightness(0.35)' }}
        onError={(e) => {
          (e.target as HTMLImageElement).src = 'https://placehold.co/1280x720/1e293b/94a3b8?text=No+Cover+Image';
        }}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[slate-900] via-[slate-900]/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[slate-900] via-transparent to-transparent" />

      {/* Badge */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 hidden md:block">
        <div className="flex items-center gap-2 bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 text-xs font-semibold px-4 py-1.5 rounded-full tracking-widest uppercase">
          <Star size={11} fill="currentColor" />
          Movie of the Day
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center pt-20 sm:pt-24 lg:pt-32">
        <div className="max-w-2xl">
          {/* Meta badges */}
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className="text-zinc-300 text-sm">{movie.year}</span>
            <span className="text-zinc-600">•</span>
            <span className="flex items-center gap-1 text-zinc-300 text-sm">
              <Clock size={12} />
              {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight tracking-tight">
            {movie.title}
          </h1>

          {/* Synopsis */}
          <p className="text-zinc-300 text-base leading-relaxed mb-6 line-clamp-3">
            {movie.synopsis}
          </p>

          {/* Rating Badges */}
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center gap-2 bg-black/60 border border-zinc-800 rounded-lg px-4 py-2">
              <Star size={20} className="text-[#3b82f6]" fill="#3b82f6" />
              <div>
                <div className="text-white font-bold text-lg leading-none">{movie.rating}<span className="text-zinc-500 text-sm font-normal">/10</span></div>
                <div className="text-zinc-400 text-xs mt-0.5">Rating</div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onMovieClick(movie)}
              className="flex items-center gap-2 bg-[#3b82f6] hover:bg-[#2563eb] text-white font-bold px-6 py-3 rounded-lg transition-all"
            >
              <Play size={16} fill="currentColor" />
              Watch Trailer
            </button>
            <button
              onClick={() => onWatchlistAdd(movie)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all ${
                isInWatchlist
                  ? 'bg-zinc-800 text-[#3b82f6] border border-[#3b82f6]/30'
                  : 'bg-zinc-800 hover:bg-zinc-700 text-white'
              }`}
            >
              <Bookmark size={16} fill={isInWatchlist ? '#3b82f6' : 'none'} />
              {isInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
