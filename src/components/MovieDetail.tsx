import { X, Star, Shield, Clock, Calendar, Globe, Languages, DollarSign, TrendingUp, Bookmark, ChevronRight } from 'lucide-react';
import { Movie } from '../types';

interface MovieDetailProps {
  movie: Movie;
  onClose: () => void;
  onWatchlistToggle: (movie: Movie) => void;
  isInWatchlist: boolean;
}

export default function MovieDetail({ movie, onClose, onWatchlistToggle, isInWatchlist }: MovieDetailProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto" onClick={onClose}>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />

      <div
        className="relative z-10 w-full max-w-5xl mx-4 my-8 bg-[#13161f] rounded-2xl border border-white/10 overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero Banner */}
        <div className="relative h-64 sm:h-80 overflow-hidden">
          <img
            src={movie.backdrop}
            alt={movie.title}
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.4)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#13161f] via-[#13161f]/40 to-transparent" />

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-xl border border-white/10 transition-all"
          >
            <X size={18} />
          </button>

          {/* Badges */}
          <div className="absolute bottom-4 left-6 flex items-center gap-2">
            <span className="bg-amber-500 text-black text-xs font-bold px-2 py-0.5 rounded">{movie.pgRating}</span>
            {movie.genre.map((g) => (
              <span key={g} className="bg-white/10 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded border border-white/10">
                {g}
              </span>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Title + actions */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">{movie.title}</h2>
              <p className="text-slate-500 text-sm mt-1">{movie.year} &middot; Directed by <span className="text-slate-300">{movie.director}</span></p>
            </div>
            <button
              onClick={() => onWatchlistToggle(movie)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                isInWatchlist
                  ? 'bg-amber-500/20 border-amber-500/50 text-amber-400'
                  : 'bg-white/5 border-white/15 text-white hover:bg-white/10'
              }`}
            >
              <Bookmark size={14} fill={isInWatchlist ? 'currentColor' : 'none'} />
              {isInWatchlist ? 'Saved' : 'Watchlist'}
            </button>
          </div>

          {/* Ratings */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-2 bg-[#0d0f14] border border-amber-500/25 rounded-xl px-4 py-3">
              <Star size={18} className="text-amber-400" fill="currentColor" />
              <div>
                <div className="text-white font-bold text-xl leading-none">
                  {movie.rating}<span className="text-slate-500 text-sm font-normal">/10</span>
                </div>
                <div className="text-slate-500 text-xs mt-0.5">CineData Score</div>
              </div>
            </div>
            <div className={`flex items-center gap-2 rounded-xl px-4 py-3 border ${
              movie.criticScore >= 80 ? 'bg-emerald-500/10 border-emerald-500/25' :
              movie.criticScore >= 60 ? 'bg-yellow-500/10 border-yellow-500/25' :
              'bg-red-500/10 border-red-500/25'
            }`}>
              <Shield size={18} className={
                movie.criticScore >= 80 ? 'text-emerald-400' :
                movie.criticScore >= 60 ? 'text-yellow-400' : 'text-red-400'
              } />
              <div>
                <div className={`font-bold text-xl leading-none ${
                  movie.criticScore >= 80 ? 'text-emerald-400' :
                  movie.criticScore >= 60 ? 'text-yellow-400' : 'text-red-400'
                }`}>{movie.criticScore}</div>
                <div className="text-slate-500 text-xs mt-0.5">Metascore</div>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-[#0d0f14] border border-white/10 rounded-xl px-4 py-3">
              <Clock size={18} className="text-slate-400" />
              <div>
                <div className="text-white font-bold text-xl leading-none">
                  {Math.floor(movie.runtime / 60)}<span className="text-slate-500 text-sm font-normal">h</span>{' '}
                  {movie.runtime % 60}<span className="text-slate-500 text-sm font-normal">m</span>
                </div>
                <div className="text-slate-500 text-xs mt-0.5">Runtime</div>
              </div>
            </div>
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Synopsis */}
              <div>
                <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span className="w-4 h-0.5 bg-amber-500 rounded" />
                  Synopsis
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">{movie.synopsis}</p>
              </div>

              {/* Director & Writers */}
              <div>
                <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span className="w-4 h-0.5 bg-amber-500 rounded" />
                  Filmmakers
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-slate-500 w-16 flex-shrink-0">Director</span>
                    <ChevronRight size={12} className="text-slate-600" />
                    <span className="text-slate-200 font-medium">{movie.director}</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <span className="text-slate-500 w-16 flex-shrink-0 pt-0.5">
                      {movie.writers.length > 1 ? 'Writers' : 'Writer'}
                    </span>
                    <ChevronRight size={12} className="text-slate-600 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-200 font-medium">{movie.writers.join(', ')}</span>
                  </div>
                </div>
              </div>

              {/* Top Cast */}
              <div>
                <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="w-4 h-0.5 bg-amber-500 rounded" />
                  Top Cast
                </h3>
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                  {movie.cast.map((member) => (
                    <div key={member.id} className="flex-shrink-0 text-center w-20">
                      <div className="w-16 h-16 mx-auto mb-2 rounded-full overflow-hidden border-2 border-white/10 hover:border-amber-500/50 transition-all">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-white text-xs font-semibold leading-tight line-clamp-2">{member.name}</p>
                      <p className="text-slate-500 text-[10px] mt-0.5 leading-tight line-clamp-2">{member.character}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar: Technical Specs */}
            <div className="lg:col-span-1">
              <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-4 h-0.5 bg-amber-500 rounded" />
                Technical Specs
              </h3>
              <div className="bg-[#0d0f14] rounded-xl border border-white/8 overflow-hidden">
                {[
                  { icon: <Calendar size={14} />, label: 'Release Date', value: movie.releaseDate },
                  { icon: <Globe size={14} />, label: 'Country', value: movie.country },
                  { icon: <Languages size={14} />, label: 'Language', value: movie.language },
                  { icon: <DollarSign size={14} />, label: 'Budget', value: movie.budget },
                  { icon: <TrendingUp size={14} />, label: 'Box Office', value: movie.boxOffice },
                ].map((item, index, arr) => (
                  <div
                    key={item.label}
                    className={`flex items-center gap-3 px-4 py-3.5 ${
                      index < arr.length - 1 ? 'border-b border-white/5' : ''
                    }`}
                  >
                    <span className="text-amber-400/70 flex-shrink-0">{item.icon}</span>
                    <div className="min-w-0">
                      <div className="text-slate-500 text-xs">{item.label}</div>
                      <div className="text-slate-200 text-sm font-medium mt-0.5 truncate">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
