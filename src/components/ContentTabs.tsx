import { TrendingUp, Zap, DollarSign } from 'lucide-react';
import { Movie, TabType } from '../types';
import MovieCard from './MovieCard';

interface ContentTabsProps {
  movies: Movie[];
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onMovieClick: (movie: Movie) => void;
  onWatchlistToggle: (movie: Movie) => void;
  watchlist: Set<number>;
}

const tabs: { key: TabType; label: string; icon: React.ReactNode }[] = [
  { key: 'trending', label: 'Trending Today', icon: <TrendingUp size={15} /> },
  { key: 'anticipated', label: 'Most Anticipated', icon: <Zap size={15} /> },
  { key: 'boxoffice', label: 'Box Office Top Sellers', icon: <DollarSign size={15} /> },
];

export default function ContentTabs({ movies, activeTab, onTabChange, onMovieClick, onWatchlistToggle, watchlist }: ContentTabsProps) {
  const filtered = movies.filter((m) => m.category === activeTab);

  console.log('ContentTabs - Total movies:', movies.length);
  console.log('ContentTabs - Active tab:', activeTab);
  console.log('ContentTabs - Filtered movies:', filtered.length);
  console.log('ContentTabs - Movies:', movies.map(m => ({ id: m.id, title: m.title, category: m.category })));

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Tab header */}
      <div className="flex items-center gap-1 mb-6 border-b border-white/8 pb-0">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-all duration-200 -mb-px ${
              activeTab === tab.key
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-slate-500 hover:text-slate-300 hover:border-white/20'
            }`}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="sm:hidden">
              {tab.key === 'trending' ? 'Trending' : tab.key === 'anticipated' ? 'Anticipated' : 'Box Office'}
            </span>
          </button>
        ))}
      </div>

      {/* Scrollable movie row */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-slate-400">
          <p>No movies found for this category</p>
          <p className="text-sm mt-2">Total movies available: {movies.length}</p>
        </div>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
          {filtered.map((movie, i) => (
            <div key={movie.id} className="snap-start">
              <MovieCard
                movie={movie}
                rank={activeTab === 'boxoffice' ? i + 1 : undefined}
                activeTab={activeTab}
                onClick={onMovieClick}
                onWatchlistToggle={onWatchlistToggle}
                isInWatchlist={watchlist.has(movie.id)}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
