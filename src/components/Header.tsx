import { useState } from 'react';
import { Search, Bookmark, ChevronDown, Film, X, SlidersHorizontal, User, LogOut } from 'lucide-react';
import { User as SupabaseUser } from '@supabase/supabase-js';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  watchlistCount: number;
  onWatchlistClick: () => void;
  onAdvancedSearchClick: () => void;
  onAuthClick: () => void;
  user: SupabaseUser | null;
  onSignOut: () => void;
}

export default function Header({ 
  searchQuery, 
  onSearchChange, 
  watchlistCount, 
  onWatchlistClick, 
  onAdvancedSearchClick,
  onAuthClick,
  user,
  onSignOut
}: HeaderProps) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 flex-shrink-0 group">
            <div className="w-8 h-8 bg-indigo-500 rounded flex items-center justify-center">
              <Film size={18} className="text-black" />
            </div>
            <span className="text-white font-bold text-xl tracking-tight">
              Cine<span className="text-indigo-400">View</span>
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
                className="w-full bg-slate-700 text-white placeholder-slate-500 pl-10 pr-10 py-2.5 rounded-lg border border-white/10 focus:border-indigo-500/50 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 text-sm transition-all"
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
            {/* Advanced Search Button */}
            <button
              onClick={onAdvancedSearchClick}
              className="absolute right-12 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-400 transition-colors"
              title="Advanced Search"
            >
              <SlidersHorizontal size={16} />
            </button>
          </div>

          {/* Nav Items */}
          <nav className="hidden md:flex items-center gap-1">
            {/* Watchlist */}
            <button
              onClick={onWatchlistClick}
              className="flex items-center gap-1.5 bg-indigo-500 hover:bg-indigo-400 text-black px-3 py-2 rounded-lg text-sm font-semibold transition-all"
            >
              <Bookmark size={14} />
              Watchlist
              {watchlistCount > 0 && (
                <span className="bg-black/30 text-xs px-1.5 py-0.5 rounded-full font-bold ml-0.5">
                  {watchlistCount}
                </span>
              )}
            </button>

            {/* User Menu */}
            {user ? (
              <div className="relative ml-2">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all"
                >
                  <User size={14} />
                  <span className="max-w-[100px] truncate">
                    {user.user_metadata?.full_name || user.email?.split('@')[0]}
                  </span>
                  <ChevronDown size={14} className={`transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                {userMenuOpen && (
                  <div className="absolute top-full right-0 mt-1 w-48 bg-slate-700 border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
                    <div className="p-2">
                      <div className="px-3 py-2 text-xs text-slate-500 border-b border-white/5">
                        {user.email}
                      </div>
                      <button
                        onClick={() => {
                          onSignOut();
                          setUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-all mt-1"
                      >
                        <LogOut size={14} />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all ml-2"
              >
                <User size={14} />
                Sign In
              </button>
            )}
          </nav>

          {/* Mobile watchlist */}
          <button
            onClick={onWatchlistClick}
            className="md:hidden relative text-slate-300 hover:text-indigo-400 transition-colors"
          >
            <Bookmark size={20} />
            {watchlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-indigo-500 text-black text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {watchlistCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Overlay to close dropdowns */}
      {userMenuOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setUserMenuOpen(false)} 
        />
      )}
    </header>
  );
}
