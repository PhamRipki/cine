import { useState } from 'react';
import { Search, Bookmark, ChevronDown, X, SlidersHorizontal, LogOut } from 'lucide-react';
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
  const userInitials = user?.user_metadata?.full_name 
    ? user.user_metadata.full_name.split(' ').map((n: string) => n[0]).join('')
    : user?.email?.charAt(0).toUpperCase() || 'U';

  return (
    <header className="sticky top-0 z-50 bg-[#121212] border-b border-[#252525]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 h-14">
          {/* Logo */}
          <a href="#" className="flex items-center gap-1.5 flex-shrink-0 group">
            <div className="bg-[#3b82f6] text-white font-black text-lg px-2 py-0.5 rounded tracking-tighter">
              CINE
            </div>
          </a>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-2 sm:mx-4 relative">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-[#1f1f1f] text-white placeholder-zinc-400 pl-3 pr-20 py-1.5 rounded-md border border-zinc-700 focus:border-[#3b82f6] focus:outline-none text-sm transition-all"
              />
              <button
                onClick={onAdvancedSearchClick}
                className="absolute right-8 text-zinc-400 hover:text-[#3b82f6] transition-colors"
                title="Advanced Search"
              >
                <SlidersHorizontal size={15} />
              </button>
              {searchQuery ? (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2 text-zinc-400 hover:text-white transition-colors"
                >
                  <X size={15} />
                </button>
              ) : (
                <Search size={15} className="absolute right-2 text-zinc-400" />
              )}
            </div>
          </div>

          {/* Nav Items */}
          <nav className="hidden md:flex items-center gap-2">
            {/* Watchlist */}
            <button
              onClick={onWatchlistClick}
              className="flex items-center gap-1.5 hover:bg-zinc-800 text-white px-3 py-1.5 rounded-md text-sm font-semibold transition-all"
            >
              <Bookmark size={16} className="text-[#3b82f6]" fill="#3b82f6" />
              Watchlist
              {watchlistCount > 0 && (
                <span className="bg-[#3b82f6] text-white text-xs px-1.5 py-0.5 rounded-full font-bold ml-0.5">
                  {watchlistCount}
                </span>
              )}
            </button>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 hover:bg-zinc-800 text-white px-2 py-1 rounded-md text-sm font-semibold transition-all"
                >
                  <div className="w-6 h-6 rounded-full bg-[#3b82f6] flex items-center justify-center text-[10px] font-bold text-white">
                    {userInitials}
                  </div>
                  <ChevronDown size={14} className={`transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                {userMenuOpen && (
                  <div className="absolute top-full right-0 mt-1 w-48 bg-[#1f1f1f] border border-zinc-700 rounded-md shadow-2xl overflow-hidden z-50">
                    <div className="p-2">
                      <div className="px-3 py-2 text-xs text-zinc-400 border-b border-zinc-800 truncate">
                        {user.user_metadata?.full_name || user.email}
                      </div>
                      <button
                        onClick={() => {
                          onSignOut();
                          setUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-md transition-all mt-1"
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
                className="flex items-center gap-1.5 bg-[#3b82f6] hover:bg-[#2563eb] text-white px-4 py-1.5 rounded-md text-sm font-bold transition-all"
              >
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
