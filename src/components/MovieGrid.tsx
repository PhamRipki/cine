import { Movie } from '../types';

interface MovieGridProps {
  movies: Partial<Movie>[];
  title: string;
  onMovieClick: (movie: Partial<Movie>) => void;
  onWatchlistToggle: (movie: Partial<Movie>) => void;
  watchlist: Set<number>;
}

export default function MovieGrid({ movies, title, onMovieClick, onWatchlistToggle, watchlist }: MovieGridProps) {
  console.log(`MovieGrid "${title}" - Movies:`, movies.length);
  
  if (movies.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
        <div className="text-center py-12 bg-white/5 rounded-lg">
          <p className="text-slate-400">No movies available</p>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
        <span className="text-amber-400">{title}</span>
        <span className="text-sm text-slate-500 font-normal">({movies.length} movies)</span>
      </h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="group cursor-pointer" onClick={() => onMovieClick(movie)}>
            <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-slate-800 mb-2">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x450/1e293b/94a3b8?text=No+Image';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-3">
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
              {movie.rating && (
                <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1">
                  <span className="text-amber-400 text-xs">⭐</span>
                  <span className="text-white text-xs font-semibold">{movie.rating.toFixed(1)}</span>
                </div>
              )}
            </div>
            <h3 className="font-semibold text-sm line-clamp-2 mb-1 group-hover:text-amber-400 transition-colors">
              {movie.title}
            </h3>
            <p className="text-xs text-slate-500">{movie.year}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
