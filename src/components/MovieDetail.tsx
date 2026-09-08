import { useState, useEffect } from 'react';
import { X, Star, Shield, Clock, Calendar, Globe, Languages, DollarSign, TrendingUp, Bookmark, Loader2, Building2, Info, ExternalLink, Play } from 'lucide-react';
import { Movie } from '../types';
import { tmdbApi } from '../lib/tmdb';
import { mapTMDBDetailsToMovie, mapTMDBToMovie } from '../lib/movieMapper';
import SkeletonCard from './SkeletonCard';

export default function MovieDetail({ movie, onClose, onWatchlistToggle, isInWatchlist, onSelectMovie }: MovieDetailProps) {
  const [currentMovie, setCurrentMovie] = useState<Movie>(movie);
  const [fullMovie, setFullMovie] = useState<Movie>(movie);
  const [similarMovies, setSimilarMovies] = useState<Partial<Movie>[]>([]);
  const [isLoadingDetail, setIsLoadingDetail] = useState<boolean>(true);
  const [isLoadingSimilar, setIsLoadingSimilar] = useState<boolean>(true);

  useEffect(() => {
    setCurrentMovie(movie);
  }, [movie]);

  useEffect(() => {
    let isMounted = true;
    setIsLoadingDetail(true);
    setIsLoadingSimilar(true);
    setFullMovie(currentMovie);

    // Scroll modal to top on movie change
    const modalContainer = document.getElementById('movie-detail-modal-container');
    if (modalContainer) {
      modalContainer.scrollTop = 0;
    }

    const fetchDetails = async () => {
      try {
        const details = await tmdbApi.getMovieDetails(currentMovie.id);
        if (details && isMounted) {
          const mapped = mapTMDBDetailsToMovie(details, currentMovie.category);
          setFullMovie(mapped);

          // Extract similar movies if returned by append_to_response
          if ((details as any).similar?.results) {
            const rawSimilar = (details as any).similar.results.slice(0, 10);
            const mappedSimilar = rawSimilar.map((m: any) => mapTMDBToMovie(m));
            setSimilarMovies(mappedSimilar);
          }
        }
      } catch (err) {
        console.error('Failed to load movie details:', err);
      } finally {
        if (isMounted) {
          setIsLoadingDetail(false);
          setIsLoadingSimilar(false);
        }
      }
    };

    fetchDetails();
    return () => {
      isMounted = false;
    };
  }, [currentMovie.id]);

  return (
    <div id="movie-detail-modal-container" className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto" onClick={onClose}>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />

      <div
        className="relative z-10 w-full max-w-5xl mx-4 my-8 bg-slate-800 rounded-2xl border border-white/10 overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero Banner */}
        <div className="relative h-64 sm:h-80 overflow-hidden">
          <img
            src={fullMovie.backdrop}
            alt={fullMovie.title}
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.4)' }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://placehold.co/1280x720/1e293b/94a3b8?text=No+Cover+Image';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[slate-800] via-[slate-800]/40 to-transparent" />

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-xl border border-white/10 transition-all z-20"
          >
            <X size={18} />
          </button>

          {/* Badges */}
          <div className="absolute bottom-4 left-6 flex items-center gap-2">
            <span className="bg-indigo-500 text-black text-xs font-bold px-2 py-0.5 rounded">{fullMovie.pgRating}</span>
            {fullMovie.genre.map((g) => (
              <span key={g} className="bg-white/10 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded border border-white/10">
                {g}
              </span>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Title + actions */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">{fullMovie.title}</h2>
              <p className="text-slate-500 text-sm mt-1">{fullMovie.year} &middot; Directed by <span className="text-slate-300">{fullMovie.director}</span></p>
            </div>
            <button
              onClick={() => onWatchlistToggle(fullMovie)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                isInWatchlist
                  ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-400'
                  : 'bg-white/5 border-white/15 text-white hover:bg-white/10'
              }`}
            >
              <Bookmark size={14} fill={isInWatchlist ? 'currentColor' : 'none'} />
              {isInWatchlist ? 'Saved' : 'Watchlist'}
            </button>
          </div>

          {/* Ratings */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-900 border border-indigo-500/25 rounded-xl px-4 py-3">
              <Star size={18} className="text-indigo-400" fill="currentColor" />
              <div>
                <div className="text-white font-bold text-xl leading-none">
                  {fullMovie.rating}<span className="text-slate-500 text-sm font-normal">/10</span>
                </div>
                <div className="text-slate-500 text-xs mt-0.5">CineData Score</div>
              </div>
            </div>
            <div className={`flex items-center gap-2 rounded-xl px-4 py-3 border ${
              fullMovie.criticScore >= 80 ? 'bg-emerald-500/10 border-emerald-500/25' :
              fullMovie.criticScore >= 60 ? 'bg-yellow-500/10 border-yellow-500/25' :
              'bg-red-500/10 border-red-500/25'
            }`}>
              <Shield size={18} className={
                fullMovie.criticScore >= 80 ? 'text-emerald-400' :
                fullMovie.criticScore >= 60 ? 'text-yellow-400' : 'text-red-400'
              } />
              <div>
                <div className={`font-bold text-xl leading-none ${
                  fullMovie.criticScore >= 80 ? 'text-emerald-400' :
                  fullMovie.criticScore >= 60 ? 'text-yellow-400' : 'text-red-400'
                }`}>{fullMovie.criticScore}</div>
                <div className="text-slate-500 text-xs mt-0.5">Metascore</div>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-slate-900 border border-white/10 rounded-xl px-4 py-3">
              <Clock size={18} className="text-slate-400" />
              <div>
                <div className="text-white font-bold text-xl leading-none">
                  {Math.floor(fullMovie.runtime / 60)}<span className="text-slate-500 text-sm font-normal">h</span>{' '}
                  {fullMovie.runtime % 60}<span className="text-slate-500 text-sm font-normal">m</span>
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
                  <span className="w-4 h-0.5 bg-indigo-500 rounded" />
                  Synopsis
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">{fullMovie.synopsis}</p>
              </div>

              {/* Top Cast */}
              <div>
                <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span className="w-4 h-0.5 bg-indigo-500 rounded" />
                  Top Cast
                  {isLoadingDetail && <Loader2 size={14} className="animate-spin text-indigo-400 ml-2" />}
                </h3>
                {fullMovie.cast && fullMovie.cast.length > 0 ? (
                  <div className="flex gap-4 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {fullMovie.cast.map((actor) => (
                      <div key={actor.id} className="flex-shrink-0 w-28 bg-slate-900 rounded-xl border border-white/5 overflow-hidden p-2 text-center">
                        <img
                          src={actor.avatar || (actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : '')}
                          alt={actor.name}
                          className="w-20 h-20 mx-auto rounded-full object-cover mb-2 border border-white/10"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://placehold.co/100x100/1e293b/94a3b8?text=No+Photo';
                          }}
                        />
                        <div className="text-white text-xs font-semibold truncate" title={actor.name}>{actor.name}</div>
                        <div className="text-slate-500 text-[10px] truncate mt-0.5" title={actor.character}>{actor.character}</div>
                      </div>
                    ))}
                  </div>
                ) : isLoadingDetail ? (
                  <p className="text-slate-500 text-sm">Loading cast...</p>
                ) : (
                  <p className="text-slate-500 text-sm">No cast information available.</p>
                )}
              </div>

              {/* Official Trailer Section */}
              {fullMovie.trailerId && (
                <div>
                  <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span className="w-4 h-0.5 bg-indigo-500 rounded" />
                    Official Trailer
                  </h3>
                  <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-white/10 bg-black">
                    <iframe
                      src={`https://www.youtube.com/embed/${fullMovie.trailerId}`}
                      title={`${fullMovie.title} Trailer`}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar: Technical Specs */}
            <div className="lg:col-span-1 space-y-4">
              <div>
                <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="w-4 h-0.5 bg-indigo-500 rounded" />
                  Technical Specs
                </h3>
                <div className="bg-slate-900 rounded-xl border border-white/8 overflow-hidden">
                  {[
                    { icon: <Calendar size={14} />, label: 'Release Date', value: fullMovie.releaseDate },
                    { icon: <Globe size={14} />, label: 'Country', value: fullMovie.country },
                    { icon: <Languages size={14} />, label: 'Language', value: fullMovie.language },
                    { icon: <DollarSign size={14} />, label: 'Budget', value: fullMovie.budget },
                    { icon: <TrendingUp size={14} />, label: 'Box Office', value: fullMovie.boxOffice },
                    { icon: <Building2 size={14} />, label: 'Production', value: fullMovie.production || 'N/A' },
                    { icon: <Info size={14} />, label: 'Status', value: fullMovie.status || 'N/A' },
                  ].map((item, index, arr) => (
                    <div
                      key={item.label}
                      className={`flex items-center gap-3 px-4 py-3.5 ${
                        index < arr.length - 1 ? 'border-b border-white/5' : ''
                      }`}
                    >
                      <span className="text-indigo-400/70 flex-shrink-0">{item.icon}</span>
                      <div className="min-w-0">
                        <div className="text-slate-500 text-xs">{item.label}</div>
                        <div className="text-slate-200 text-sm font-medium mt-0.5 truncate">{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Links */}
                {fullMovie.homepage && (
                  <div className="mt-4 flex gap-2">
                    <a
                      href={fullMovie.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 py-2 rounded-lg text-xs font-bold transition-all"
                    >
                      <ExternalLink size={14} />
                      Website
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Similar Movies Section */}
          <div className="pt-4 border-t border-white/10">
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-indigo-500 rounded" />
              Similar Movies
            </h3>
            {isLoadingSimilar ? (
              <div className="flex gap-4 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : similarMovies.length > 0 ? (
              <div className="flex gap-4 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {similarMovies.map((similar) => (
                  <div
                    key={similar.id}
                    onClick={() => {
                      if (onSelectMovie) {
                        onSelectMovie(similar as Movie);
                      }
                      setCurrentMovie(similar as Movie);
                    }}
                    className="flex-shrink-0 w-32 group cursor-pointer"
                  >
                    <div className="aspect-[2/3] bg-slate-900 rounded-xl overflow-hidden border border-white/10 mb-2 relative">
                      <img
                        src={similar.poster}
                        alt={similar.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://placehold.co/300x450/1e293b/94a3b8?text=No+Image';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <Play size={24} className="text-white" fill="white" />
                      </div>
                    </div>
                    <div className="text-white text-xs font-semibold truncate group-hover:text-indigo-400 transition-colors">
                      {similar.title}
                    </div>
                    <div className="text-slate-500 text-[10px]">
                      {similar.year}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-sm">No similar movies found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
