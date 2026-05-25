import { useState } from 'react';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { FilterState } from '../types';
import { allGenres } from '../data/movies';

interface FilterPanelProps {
  filters: FilterState;
  onFiltersChange: (f: FilterState) => void;
}

const currentYear = 2024;
const minYear = 2020;

export default function FilterPanel({ filters, onFiltersChange }: FilterPanelProps) {
  const [open, setOpen] = useState(false);

  const toggleGenre = (genre: string) => {
    const updated = filters.genres.includes(genre)
      ? filters.genres.filter((g) => g !== genre)
      : [...filters.genres, genre];
    onFiltersChange({ ...filters, genres: updated });
  };

  const resetFilters = () => {
    onFiltersChange({ genres: [], yearMin: minYear, yearMax: currentYear, minRating: 0 });
  };

  const hasActiveFilters =
    filters.genres.length > 0 ||
    filters.yearMin !== minYear ||
    filters.yearMax !== currentYear ||
    filters.minRating > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-2">
      {/* Toggle button */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setOpen(!open)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
            open || hasActiveFilters
              ? 'bg-amber-500/15 border-amber-500/40 text-amber-400'
              : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
          }`}
        >
          <SlidersHorizontal size={15} />
          Filters
          <ChevronDown size={13} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
          {hasActiveFilters && (
            <span className="bg-amber-500 text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center ml-0.5">
              {filters.genres.length + (filters.yearMin !== minYear ? 1 : 0) + (filters.yearMax !== currentYear ? 1 : 0) + (filters.minRating > 0 ? 1 : 0)}
            </span>
          )}
        </button>

        {/* Active filter chips */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide flex-1">
          {filters.genres.map((g) => (
            <button
              key={g}
              onClick={() => toggleGenre(g)}
              className="flex items-center gap-1 bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs px-2.5 py-1.5 rounded-lg flex-shrink-0 hover:bg-amber-500/25 transition-all"
            >
              {g}
              <X size={10} />
            </button>
          ))}
          {filters.minRating > 0 && (
            <button
              onClick={() => onFiltersChange({ ...filters, minRating: 0 })}
              className="flex items-center gap-1 bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs px-2.5 py-1.5 rounded-lg flex-shrink-0 hover:bg-amber-500/25 transition-all"
            >
              Rating ≥ {filters.minRating}
              <X size={10} />
            </button>
          )}
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-slate-500 hover:text-white text-xs px-2 flex-shrink-0 transition-colors"
            >
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* Collapsible panel */}
      {open && (
        <div className="mt-3 bg-[#13161f] border border-white/8 rounded-2xl p-5 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Genres */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-widest mb-3">Genre</h4>
            <div className="flex flex-wrap gap-1.5">
              {allGenres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => toggleGenre(genre)}
                  className={`text-xs px-2.5 py-1.5 rounded-lg border transition-all ${
                    filters.genres.includes(genre)
                      ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* Year Range */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-widest mb-3">Release Year</h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                  <span>From</span>
                  <span className="text-amber-400 font-semibold">{filters.yearMin}</span>
                </div>
                <input
                  type="range"
                  min={minYear}
                  max={currentYear}
                  value={filters.yearMin}
                  onChange={(e) => onFiltersChange({ ...filters, yearMin: Number(e.target.value) })}
                  className="w-full accent-amber-500 h-1.5 rounded-full"
                />
              </div>
              <div>
                <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                  <span>To</span>
                  <span className="text-amber-400 font-semibold">{filters.yearMax}</span>
                </div>
                <input
                  type="range"
                  min={minYear}
                  max={currentYear}
                  value={filters.yearMax}
                  onChange={(e) => onFiltersChange({ ...filters, yearMax: Number(e.target.value) })}
                  className="w-full accent-amber-500 h-1.5 rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Min Rating */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-widest mb-3">Minimum Rating</h4>
            <div>
              <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                <span>Min Score</span>
                <span className="text-amber-400 font-semibold">{filters.minRating > 0 ? `${filters.minRating}/10` : 'Any'}</span>
              </div>
              <input
                type="range"
                min={0}
                max={9}
                step={0.5}
                value={filters.minRating}
                onChange={(e) => onFiltersChange({ ...filters, minRating: Number(e.target.value) })}
                className="w-full accent-amber-500 h-1.5 rounded-full"
              />
              <div className="flex justify-between text-xs text-slate-600 mt-1">
                <span>Any</span>
                <span>9.0</span>
              </div>
            </div>

            {/* Rating quick-picks */}
            <div className="flex gap-1.5 mt-3 flex-wrap">
              {[7, 7.5, 8, 8.5].map((r) => (
                <button
                  key={r}
                  onClick={() => onFiltersChange({ ...filters, minRating: r })}
                  className={`text-xs px-2.5 py-1.5 rounded-lg border transition-all ${
                    filters.minRating === r
                      ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  {r}+
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
