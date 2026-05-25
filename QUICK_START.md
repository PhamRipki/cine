# 🚀 Quick Start Guide - Authentication & Advanced Search

## ⚡ 5-Minute Setup

### Step 1: Setup Supabase Database (2 minutes)

1. Open [Supabase Dashboard](https://app.supabase.com/)
2. Select your project: `esbwjosiizzawblpqygn`
3. Click **SQL Editor** in sidebar
4. Click **New Query**
5. Copy & paste contents from `supabase-auth-schema.sql`
6. Click **Run** (or press `Ctrl+Enter`)
7. Wait for ✅ Success message

**Done!** Your database is ready.

---

### Step 2: Enable Google OAuth (Optional, 2 minutes)

1. In Supabase, go to **Authentication** → **Providers**
2. Find **Google** and click **Enable**
3. Go to [Google Cloud Console](https://console.cloud.google.com/)
4. Create new project or select existing
5. Enable **Google+ API**
6. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
7. Application type: **Web application**
8. Add authorized redirect URI:
   ```
   https://esbwjosiizzawblpqygn.supabase.co/auth/v1/callback
   ```
9. Copy **Client ID** and **Client Secret**
10. Paste into Supabase Google provider settings
11. Click **Save**

**Done!** Google sign-in is ready.

---

### Step 3: Test the App (1 minute)

```powershell
# Start dev server
npm run dev
```

Open http://localhost:5173

**Test Authentication:**
1. Click **"Sign In"** button in header
2. Click **"Sign up"** to create account
3. Enter name, email, password
4. Check email for verification
5. Sign in with your credentials
6. Your name should appear in header!

**Test Advanced Search:**
1. Click **sliders icon** (🎚️) next to search bar
2. Select genres: Action, Sci-Fi
3. Set year range: 2020-2024
4. Set rating: 7.0-10.0
5. Click **"Search Movies"**
6. See filtered results!

**Test Watchlist Sync:**
1. Add movies to watchlist (click + button)
2. Sign out
3. Sign in again
4. Your watchlist should still be there!

---

## 🎯 Key Features

### ✅ What Works Now:

1. **Authentication**
   - ✅ Email/password signup & login
   - ✅ Google OAuth login
   - ✅ Password reset
   - ✅ Session management
   - ✅ User profile

2. **Watchlist**
   - ✅ Cloud sync (when logged in)
   - ✅ Local storage (when logged out)
   - ✅ Cross-device sync
   - ✅ Optimistic updates

3. **Advanced Search**
   - ✅ Search by title/director
   - ✅ Filter by genres
   - ✅ Filter by year range
   - ✅ Filter by rating
   - ✅ Sort by multiple fields
   - ✅ Real-time results

4. **UI/UX**
   - ✅ User menu in header
   - ✅ Auth modal with validation
   - ✅ Advanced search modal
   - ✅ Search results banner
   - ✅ Loading states
   - ✅ Error handling

---

## 📝 Usage Examples

### Example 1: Find Recent Action Movies

1. Click advanced search icon
2. Select genre: **Action**
3. Set year: **2023-2024**
4. Set rating: **7.0-10.0**
5. Sort by: **Rating**
6. Order: **Descending**
7. Click **Search**

Result: Top-rated action movies from 2023-2024

---

### Example 2: Find Christopher Nolan Movies

1. Click advanced search icon
2. Type in search: **Christopher Nolan**
3. Click **Search**

Result: All movies directed by Christopher Nolan

---

### Example 3: Find Family-Friendly Movies

1. Click advanced search icon
2. Select genres: **Animation**, **Family**, **Comedy**
3. Set rating: **6.0-10.0**
4. Sort by: **Popularity**
5. Click **Search**

Result: Popular family-friendly movies

---

## 🔧 Troubleshooting

### Problem: Can't sign up

**Solution:**
- Check email format is valid
- Password must be 6+ characters
- Check Supabase project is active
- Check `.env` file has correct credentials

---

### Problem: Email verification not received

**Solution:**
- Check spam/junk folder
- Wait 5 minutes (email can be delayed)
- Check Supabase email settings
- Try different email provider

---

### Problem: Google sign-in doesn't work

**Solution:**
- Enable Google provider in Supabase
- Add OAuth credentials from Google Cloud
- Check redirect URI is correct
- Clear browser cache and try again

---

### Problem: Watchlist not syncing

**Solution:**
- Make sure you're logged in (check header)
- Check browser console for errors (F12)
- Check Supabase connection
- Try signing out and in again

---

### Problem: Advanced search returns no results

**Solution:**
- Filters might be too restrictive
- Try resetting filters
- Check if movies exist in that range
- Try broader search criteria

---

## 🎨 Customization

### Change Theme Colors

Edit `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      primary: '#f59e0b',  // Change amber to your color
      // Add more custom colors
    }
  }
}
```

---

### Add More Genres

Edit `src/components/AdvancedSearch.tsx`:

```typescript
const allGenres = [
  'Action', 'Adventure', 'Animation',
  // Add your custom genres here
  'Superhero', 'Martial Arts', 'Cyberpunk'
];
```

---

### Customize Email Templates

1. Go to Supabase Dashboard
2. **Authentication** → **Email Templates**
3. Edit templates:
   - Confirmation email
   - Password reset
   - Magic link
4. Add your branding
5. Click **Save**

---

## 📊 Database Queries

### Get user's watchlist count

```sql
SELECT COUNT(*) 
FROM watchlist 
WHERE user_id = 'USER_ID_HERE';
```

### Get most popular movies (by watchlist)

```sql
SELECT movie_id, COUNT(*) as saves
FROM watchlist
GROUP BY movie_id
ORDER BY saves DESC
LIMIT 10;
```

### Get user statistics

```sql
SELECT 
  u.email,
  COUNT(w.id) as watchlist_count,
  MIN(w.added_at) as first_movie_added,
  MAX(w.added_at) as last_movie_added
FROM auth.users u
LEFT JOIN watchlist w ON u.id = w.user_id
GROUP BY u.id, u.email;
```

---

## 🚀 Deploy to Production

### Option 1: Vercel (Recommended)

```powershell
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts
# Add environment variables in Vercel dashboard
```

### Option 2: Netlify

```powershell
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod

# Add environment variables in Netlify dashboard
```

### Option 3: Manual Build

```powershell
# Build for production
npm run build

# Upload dist/ folder to your hosting
# Configure environment variables on server
```

**Important:** Don't forget to add environment variables on your hosting platform!

---

## 📚 Next Steps

### Recommended Features to Add:

1. **Movie Trailers** (Easy, 2 hours)
   - TMDB API already provides video data
   - Just add YouTube embed in modal

2. **User Ratings** (Medium, 4 hours)
   - Database table already created
   - Add rating UI component
   - Sync with Supabase

3. **Similar Movies** (Easy, 1 hour)
   - TMDB API has endpoint
   - Show in movie detail modal

4. **Watch Providers** (Easy, 2 hours)
   - TMDB API has data
   - Show where to watch (Netflix, etc)

5. **Pagination** (Medium, 3 hours)
   - Load more movies on scroll
   - Better performance

---

## 💡 Pro Tips

### For Users:
- ✅ Sign up to sync watchlist across devices
- ✅ Use advanced search for precise results
- ✅ Combine multiple filters
- ✅ Sort by rating to find best movies

### For Developers:
- ✅ Check Supabase logs for errors
- ✅ Monitor RLS policies
- ✅ Add indexes for performance
- ✅ Use React DevTools for debugging
- ✅ Test on mobile devices

---

## 🎉 You're All Set!

Your app now has:
- ✅ User authentication
- ✅ Cloud watchlist sync
- ✅ Advanced search with filters
- ✅ Secure database with RLS
- ✅ Google OAuth
- ✅ Production-ready code

**Happy coding!** 🚀

---

## 📞 Need Help?

- 📖 Read `AUTHENTICATION_GUIDE.md` for detailed docs
- 🐛 Check `CHANGELOG.md` for version history
- 💬 Open an issue on GitHub
- 📧 Contact support

---

**Built with ❤️ using React, TypeScript, Supabase, and TMDB API**
