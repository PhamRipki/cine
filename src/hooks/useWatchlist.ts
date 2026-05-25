import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const useWatchlist = (userId?: string | null) => {
  const [watchlist, setWatchlist] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWatchlist();
  }, [userId]);

  const loadWatchlist = async () => {
    try {
      if (userId) {
        // Load from Supabase if user is logged in
        const { data, error } = await supabase
          .from('watchlist')
          .select('movie_id')
          .eq('user_id', userId);

        if (error) throw error;

        if (data) {
          const movieIds = data.map(item => item.movie_id);
          setWatchlist(new Set(movieIds));
          // Also save to localStorage as backup
          localStorage.setItem('watchlist', JSON.stringify(movieIds));
        }
      } else {
        // Load from localStorage if not logged in
        const stored = localStorage.getItem('watchlist');
        if (stored) {
          setWatchlist(new Set(JSON.parse(stored)));
        }
      }
    } catch (error) {
      console.error('Error loading watchlist:', error);
      // Fallback to localStorage
      const stored = localStorage.getItem('watchlist');
      if (stored) {
        setWatchlist(new Set(JSON.parse(stored)));
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleWatchlist = async (movieId: number) => {
    const isInWatchlist = watchlist.has(movieId);

    // Optimistic update
    setWatchlist((prev) => {
      const next = new Set(prev);
      if (isInWatchlist) {
        next.delete(movieId);
      } else {
        next.add(movieId);
      }
      
      // Save to localStorage
      localStorage.setItem('watchlist', JSON.stringify([...next]));
      return next;
    });

    // Sync with Supabase if user is logged in
    if (userId) {
      try {
        if (isInWatchlist) {
          // Remove from watchlist
          await supabase
            .from('watchlist')
            .delete()
            .eq('user_id', userId)
            .eq('movie_id', movieId);
        } else {
          // Add to watchlist
          await supabase
            .from('watchlist')
            .insert({
              user_id: userId,
              movie_id: movieId,
              added_at: new Date().toISOString(),
            });
        }
      } catch (error) {
        console.error('Error syncing watchlist with Supabase:', error);
        // Revert optimistic update on error
        setWatchlist((prev) => {
          const next = new Set(prev);
          if (isInWatchlist) {
            next.add(movieId);
          } else {
            next.delete(movieId);
          }
          localStorage.setItem('watchlist', JSON.stringify([...next]));
          return next;
        });
      }
    }
  };

  const syncWithSupabase = async (newUserId: string) => {
    try {
      // Get local watchlist
      const localWatchlist = Array.from(watchlist);

      // Upload local watchlist to Supabase
      if (localWatchlist.length > 0) {
        const watchlistData = localWatchlist.map(movieId => ({
          user_id: newUserId,
          movie_id: movieId,
          added_at: new Date().toISOString(),
        }));

        await supabase
          .from('watchlist')
          .upsert(watchlistData, { onConflict: 'user_id,movie_id' });
      }

      // Then load from Supabase (in case user has data from another device)
      const { data, error } = await supabase
        .from('watchlist')
        .select('movie_id')
        .eq('user_id', newUserId);

      if (error) throw error;

      if (data) {
        const movieIds = data.map(item => item.movie_id);
        setWatchlist(new Set(movieIds));
        localStorage.setItem('watchlist', JSON.stringify(movieIds));
      }
    } catch (error) {
      console.error('Error syncing watchlist:', error);
    }
  };

  return { watchlist, toggleWatchlist, syncWithSupabase, loading };
};
