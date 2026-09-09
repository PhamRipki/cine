import React, { useState, useEffect } from 'react';
import { Star, Trash2, Send, MessageSquare, User as UserIcon } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';

interface Review {
  id: string;
  user_id: string;
  movie_id: number;
  rating: number;
  review: string;
  created_at: string;
  user_email?: string;
}

interface ReviewSectionProps {
  movieId: number;
}

export default function ReviewSection({ movieId }: ReviewSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_ratings')
        .select('*')
        .eq('movie_id', movieId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (err: any) {
      console.error('Error fetching reviews:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (movieId) {
      fetchReviews();
    }
  }, [movieId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!comment.trim()) {
      setError('Komentar tidak boleh kosong');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('user_ratings')
        .upsert({
          user_id: user.id,
          movie_id: movieId,
          rating: rating,
          review: comment.trim(),
          updated_at: new Date().toISOString()
        }, { onConflict: 'user_id,movie_id' });

      if (error) throw error;

      setComment('');
      setRating(5);
      fetchReviews();
    } catch (err: any) {
      setError(err.message || 'Gagal mengirim ulasan');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (reviewId: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus ulasan ini?')) return;

    try {
      const { error } = await supabase
        .from('user_ratings')
        .delete()
        .eq('id', reviewId);

      if (error) throw error;
      fetchReviews();
    } catch (err: any) {
      alert('Gagal menghapus ulasan: ' + err.message);
    }
  };

  return (
    <div className="mt-8 border-t border-white/10 pt-6">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="text-indigo-400" size={20} />
        <h3 className="text-xl font-bold text-white">Ulasan & Komentar ({reviews.length})</h3>
      </div>

      {user ? (
        <form onSubmit={handleSubmit} className="bg-slate-900/80 border border-white/10 rounded-xl p-4 mb-8">
          <h4 className="text-sm font-semibold text-white mb-3">Tulis Ulasan Anda</h4>
          
          {error && (
            <div className="mb-3 p-2.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg">
              {error}
            </div>
          )}

          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs text-slate-400">Rating:</span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="p-1 focus:outline-none transition-transform hover:scale-110"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  <Star
                    size={18}
                    className={`${
                      (hoverRating || rating) >= star
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-slate-600'
                    } transition-colors`}
                  />
                </button>
              ))}
              <span className="text-xs font-bold text-yellow-400 ml-2">{rating}/5</span>
            </div>
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Bagikan pendapat Anda tentang film ini..."
            rows={3}
            className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors resize-none mb-3"
          />

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-colors disabled:opacity-50"
            >
              <Send size={14} />
              {submitting ? 'Mengirim...' : 'Kirim Ulasan'}
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-slate-900/50 border border-white/5 rounded-xl p-6 text-center mb-8">
          <p className="text-slate-400 text-sm mb-3">Ingin ikut memberikan ulasan atau rating?</p>
          <button
            onClick={() => {
              const loginBtn = document.querySelector('button[class*="bg-indigo-600"]') as HTMLButtonElement;
              if (loginBtn) loginBtn.click();
            }}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-colors inline-block"
          >
            Login untuk memberi ulasan
          </button>
        </div>
      )}

      {loading ? (
        <div className="text-center py-8 text-slate-500 text-sm">Memuat ulasan...</div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-8 text-slate-500 text-sm">Belum ada ulasan untuk film ini. Jadilah yang pertama mengulas!</div>
      ) : (
        <div className="space-y-4">
          {reviews.map((rev) => (
            <div key={rev.id} className="bg-slate-900/40 border border-white/5 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                    <UserIcon size={14} />
                  </div>
                  <div>
                    <span className="text-white text-xs font-medium block">
                      {rev.user_id === user?.id ? 'Anda' : 'Pengguna CINE'}
                    </span>
                    <span className="text-slate-500 text-[10px]">
                      {new Date(rev.created_at).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 rounded-full">
                    <Star size={12} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-yellow-400 text-xs font-bold">{rev.rating}</span>
                  </div>

                  {user && rev.user_id === user.id && (
                    <button
                      onClick={() => handleDelete(rev.id)}
                      className="p-1 text-slate-500 hover:text-red-400 transition-colors"
                      title="Hapus ulasan"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>

              <p className="text-slate-300 text-sm mt-2 whitespace-pre-wrap">{rev.review}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
