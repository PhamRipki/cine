import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const STORAGE_KEY_PREFIX = 'cineview_watchlist';

const getStorageKey = (userId?: string) => {
  return userId ? `${STORAGE_KEY_PREFIX}_${userId}` : `${STORAGE_KEY_PREFIX}_guest`;
};

export const useWatchlist = (userId?: string) => {
  const [watchlist, setWatchlist] = useState<Set<number>>(new Set());

  // Load initial state
  useEffect(() => {
    const key = getStorageKey(userId);
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const uniqueIds = Array.from(new Set(parsed)) as number[];
        setWatchlist(new Set(uniqueIds));
        localStorage.setItem(key, JSON.stringify(uniqueIds));
      } catch (e) {
        console.error('Failed to parse watchlist from storage:', e);
      }
    } else {
      setWatchlist(new Set());
    }
  }, [userId]);

  // Persist state on change
  useEffect(() => {
    const key = getStorageKey(userId);
    localStorage.setItem(key, JSON.stringify(Array.from(watchlist)));
  }, [watchlist, userId]);

  const toggleWatchlist = (movieId: number) => {
    setWatchlist((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(movieId)) {
        newSet.delete(movieId);
      } else {
        newSet.add(movieId);
      }
      return newSet;
    });
  };

  const syncWithSupabase = async (uid: string) => {
    try {
      const key = getStorageKey(uid);
      const stored = localStorage.getItem(key);
      if (stored) {
        const ids: number[] = JSON.parse(stored);
        // Optional: sync logic to Supabase table if exists
        // For now, we just confirm the local state is in sync
        setWatchlist(new Set(ids));
      }
    } catch (err) {
      console.error('Watchlist sync failed:', err);
    }
  };

  const clearWatchlist = () => {
    setWatchlist(new Set());
  };

  return { watchlist, toggleWatchlist, syncWithSupabase, clearWatchlist };
};
