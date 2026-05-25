import { useState } from 'react';
import { Search, Bookmark, ChevronDown, Film, Star, X } from 'lucide-react';
import { allGenres } from '../data/movies';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  watchlistCount: number;
  onWatchlistClick: () => void;
  onTop250Click: () => void;
}

export default function Header({ searchQuery, onSearchChange, watchlistCount, onWatchlistClick, onTop250Click }: HeaderProps) {
  const [genreOpen, setGenreOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-[#0d0f14]/95 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 flex-shrink-0 group">
            <div className="w-8 h-8 bg-amber-500 rounded flex items-center justify-center">
              <Film size={18} className="text-black" />
            </div>
            <span className="text-white font-bold text-xl tracking-tight">
              Cine<span className="text-amber-400">Data</span>
            </span>
          </a>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-4 relative">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search movies, directors, actors..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-[#1a1d26] text-white placeholder-slate-500 pl-10 pr-10 py-2.5 rounded-lg border border-white/10 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/30 text-sm transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Nav Items */}
          <nav className="hidden md:flex items-center gap-1">
            {/* Browse Genres */}
            <div className="relative">
              <button
                onClick={() => setGenreOpen(!genreOpen)}
                className="flex items-center gap-1.5 text-slate-300 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 text-sm font-medium transition-all"
              >
                Browse Genres
                <ChevronDown size={14} className={`transition-transform ${genreOpen ? 'rotate-180' : ''}`} />
              </button>
              {genreOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-[#1a1d26] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
                  <div className="p-2 grid grid-cols-2 gap-0.5">
                    {allGenres.map((genre) => (
                      <button
                        key={genre}
                        onClick={() => { setSelectedGenre(genre); setGenreOpen(false); }}
                        className={`text-left px-3 py-2 text-sm rounded-lg transition-all ${
                          selectedGenre === genre
                            ? 'bg-amber-500/20 text-amber-400'
                            : 'text-slate-300 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        {genre}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Top 250 */}
            <button
              onClick={onTop250Click}
              className="flex items-center gap-1.5 text-slate-300 hover:text-amber-400 px-3 py-2 rounded-lg hover:bg-white/5 text-sm font-medium transition-all"
            >
              <Star size={14} className="text-amber-400" />
              Top 250
            </button>

            {/* Watchlist */}
            <button
              onClick={onWatchlistClick}
              className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-black px-3 py-2 rounded-lg text-sm font-semibold transition-all ml-1"
            >
              <Bookmark size={14} />
              Watchlist
              {watchlistCount > 0 && (
                <span className="bg-black/30 text-xs px-1.5 py-0.5 rounded-full font-bold ml-0.5">
                  {watchlistCount}
                </span>
              )}
            </button>
          </nav>

          {/* Mobile watchlist */}
          <button
            onClick={onWatchlistClick}
            className="md:hidden relative text-slate-300 hover:text-amber-400 transition-colors"
          >
            <Bookmark size={20} />
            {watchlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-500 text-black text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {watchlistCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Overlay to close genre dropdown */}
      {genreOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setGenreOpen(false)} />
      )}
    </header>
  );
}
