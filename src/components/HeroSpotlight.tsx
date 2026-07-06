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
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="max-w-2xl">
          {/* Meta badges */}
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className="bg-indigo-500 text-black text-xs font-bold px-2 py-0.5 rounded">
              {movie.pgRating}
            </span>
            <span className="text-slate-400 text-sm">{movie.year}</span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1 text-slate-400 text-sm">
              <Clock size={12} />
              {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
            </span>
            <span className="text-slate-600">•</span>
            <div className="flex items-center gap-1">
              {movie.genre.map((g) => (
                <span key={g} className="text-xs text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                  {g}
                </span>
              ))}
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight tracking-tight">
            {movie.title}
          </h1>

          {/* Synopsis */}
          <p className="text-slate-300 text-base leading-relaxed mb-6 line-clamp-3">
            {movie.synopsis}
          </p>

          {/* Rating Badges */}
          <div className="flex items-center gap-3 mb-8">
            {/* CineData Score */}
            <div className="flex items-center gap-2 bg-slate-700/90 border border-indigo-500/30 rounded-xl px-4 py-3">
              <Star size={18} className="text-indigo-400" fill="currentColor" />
              <div>
                <div className="text-white font-bold text-lg leading-none">{movie.rating}<span className="text-slate-500 text-sm font-normal">/10</span></div>
                <div className="text-slate-500 text-xs mt-0.5">CineData Score</div>
              </div>
            </div>

            {/* Critic Score */}
            <div className={`flex items-center gap-2 rounded-xl px-4 py-3 border ${
              movie.criticScore >= 80
                ? 'bg-emerald-500/10 border-emerald-500/30'
                : movie.criticScore >= 60
                ? 'bg-yellow-500/10 border-yellow-500/30'
                : 'bg-red-500/10 border-red-500/30'
            }`}>
              <Shield size={18} className={
                movie.criticScore >= 80 ? 'text-emerald-400' :
                movie.criticScore >= 60 ? 'text-yellow-400' : 'text-red-400'
              } />
              <div>
                <div className={`font-bold text-lg leading-none ${
                  movie.criticScore >= 80 ? 'text-emerald-400' :
                  movie.criticScore >= 60 ? 'text-yellow-400' : 'text-red-400'
                }`}>{movie.criticScore}</div>
                <div className="text-slate-500 text-xs mt-0.5">Critic Score</div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onMovieClick(movie)}
              className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-black font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Play size={16} fill="currentColor" />
              View Details
            </button>
            <button
              onClick={() => onWatchlistAdd(movie)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl border font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                isInWatchlist
                  ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-400'
                  : 'bg-white/5 border-white/15 text-white hover:bg-white/10'
              }`}
            >
              <Bookmark size={16} fill={isInWatchlist ? 'currentColor' : 'none'} />
              {isInWatchlist ? 'Saved' : 'Add to Watchlist'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
