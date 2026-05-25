import { useState } from 'react';
import { Movie } from '../types';
import { Film, Sparkles, Zap, Heart, Ghost, Laugh, Drama, Rocket, Shield, Music } from 'lucide-react';

interface GenreBrowserProps {
  movies: Partial<Movie>[];
  onMovieClick: (movie: Partial<Movie>) => void;
  onWatchlistToggle: (movie: Partial<Movie>) => void;
  watchlist: Set<number>;
}

// Genre icons mapping
const genreIcons: Record<string, React.ReactNode> = {
  'Action': <Zap size={18} />,
  'Adventure': <Rocket size={18} />,
  'Animation': <Sparkles size={18} />,
  'Comedy': <Laugh size={18} />,
  'Crime': <Shield size={18} />,
  'Drama': <Drama size={18} />,
  'Fantasy': <Sparkles size={18} />,
  'Horror': <Ghost size={18} />,
  'Romance': <Heart size={18} />,
  'Sci-Fi': <Rocket size={18} />,
  'Thriller': <Zap size={18} />,
  'Music': <Music size={18} />,
};

export default function GenreBrowser({ movies, onMovieClick, onWatchlistToggle, watchlist }: GenreBrowserProps) {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  // Extract all unique genres from movies
  const allGenres = Array.from(
    new Set(
      movies.flatMap(movie => movie.genre || [])
    )
  ).sort();

  // Filter movies by selected genre
  const filteredMovies = selectedGenre
    ? movies.filter(movie => movie.genre?.includes(selectedGenre))
    : movies;

  console.log('GenreBrowser - All genres:', allGenres);
  console.log('GenreBrowser - Selected genre:', selectedGenre);
  console.log('GenreBrowser - Filtered movies:', filteredMovies.length);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <Film className="text-amber-400" size={32} />
          <span>Browse by Genre</span>
        </h2>
        <p className="text-slate-400">
          {selectedGenre 
            ? `Showing ${filteredMovies.length} ${selectedGenre} movies`
            : `Explore ${movies.length} movies across ${allGenres.length} genres`
          }
        </p>
      </div>

      {/* Genre Pills */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-3">
          {/* All Movies Button */}
          <button
            onClick={() => setSelectedGenre(null)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-200 ${
              selectedGenre === null
                ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/30'
                : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Film size={16} />
            <span>All Movies</span>
            <span className="text-xs opacity-75">({movies.length})</span>
          </button>

          {/* Genre Buttons */}
          {allGenres.map((genre) => {
            const count = movies.filter(m => m.genre?.includes(genre)).length;
            return (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                  selectedGenre === genre
                    ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/30'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                {genreIcons[genre] || <Film size={16} />}
                <span>{genre}</span>
                <span className="text-xs opacity-75">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Movies Grid */}
      {filteredMovies.length === 0 ? (
        <div className="text-center py-16 bg-white/5 rounded-lg">
          <Ghost size={48} className="mx-auto mb-4 text-slate-600" />
          <p className="text-slate-400 text-lg">No movies found in this genre</p>
          <button
            onClick={() => setSelectedGenre(null)}
            className="mt-4 text-amber-400 hover:text-amber-300 underline"
          >
            View all movies
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filteredMovies.map((movie) => (
            <div 
              key={movie.id} 
              className="group cursor-pointer"
              onClick={() => onMovieClick(movie)}
            >
              {/* Movie Poster */}
              <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-slate-800 mb-2">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x450/1e293b/94a3b8?text=No+Image';
                  }}
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-3 space-y-2">
                    {/* Genres */}
                    {movie.genre && movie.genre.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {movie.genre.slice(0, 2).map((g) => (
                          <span
                            key={g}
                            className="text-xs px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded-full"
                          >
                            {g}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {/* Watchlist Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onWatchlistToggle(movie);
                      }}
                      className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold py-2 px-3 rounded text-sm transition-colors"
                    >
                      {watchlist.has(movie.id!) ? '✓ In Watchlist' : '+ Watchlist'}
                    </button>
                  </div>
                </div>

                {/* Rating Badge */}
                {movie.rating && (
                  <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1">
                    <span className="text-amber-400 text-xs">⭐</span>
                    <span className="text-white text-xs font-semibold">{movie.rating.toFixed(1)}</span>
                  </div>
                )}
              </div>

              {/* Movie Info */}
              <h3 className="font-semibold text-sm line-clamp-2 mb-1 group-hover:text-amber-400 transition-colors">
                {movie.title}
              </h3>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>{movie.year}</span>
                {movie.genre && movie.genre.length > 0 && (
                  <span className="truncate ml-2">{movie.genre[0]}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stats */}
      {selectedGenre && filteredMovies.length > 0 && (
        <div className="mt-8 p-6 bg-white/5 rounded-lg border border-white/10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-amber-400">{filteredMovies.length}</div>
              <div className="text-xs text-slate-500 mt-1">Movies</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-400">
                {(filteredMovies.reduce((sum, m) => sum + (m.rating || 0), 0) / filteredMovies.length).toFixed(1)}
              </div>
              <div className="text-xs text-slate-500 mt-1">Avg Rating</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-400">
                {Math.min(...filteredMovies.map(m => m.year || 2024))} - {Math.max(...filteredMovies.map(m => m.year || 2024))}
              </div>
              <div className="text-xs text-slate-500 mt-1">Year Range</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-400">{selectedGenre}</div>
              <div className="text-xs text-slate-500 mt-1">Genre</div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
