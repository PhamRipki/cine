# 🔐 Authentication & Advanced Search Guide

## ✨ New Features Added

### 1. **User Authentication** 🔑
- Sign up with email & password
- Sign in with email & password
- Sign in with Google OAuth
- Password reset via email
- User profile management
- Automatic session management

### 2. **Cloud Watchlist Sync** ☁️
- Watchlist automatically syncs to Supabase
- Access your watchlist from any device
- Seamless sync when you log in
- Fallback to localStorage when offline

### 3. **Advanced Search** 🔍
- Search by title or director
- Filter by multiple genres
- Filter by year range (1900 - 2028)
- Filter by rating range (0 - 10)
- Sort by: Title, Year, Rating, Popularity
- Sort order: Ascending or Descending
- Real-time results count

---

## 🚀 How to Use

### **Authentication**

#### Sign Up (New User)
1. Click **"Sign In"** button in header
2. Click **"Sign up"** link at bottom
3. Enter your full name, email, and password
4. Click **"Create Account"**
5. Check your email for verification link
6. Click verification link
7. Return to app and sign in

#### Sign In (Existing User)
1. Click **"Sign In"** button in header
2. Enter your email and password
3. Click **"Sign In"**
4. Your watchlist will automatically sync!

#### Sign In with Google
1. Click **"Sign In"** button in header
2. Click **"Sign in with Google"**
3. Choose your Google account
4. Authorize the app
5. You're logged in!

#### Forgot Password
1. Click **"Sign In"** button in header
2. Click **"Forgot password?"** link
3. Enter your email
4. Click **"Send Reset Link"**
5. Check your email
6. Click reset link and set new password

#### Sign Out
1. Click your name in header
2. Click **"Sign Out"**

---

### **Advanced Search**

#### Open Advanced Search
1. Click the **sliders icon** (🎚️) next to search bar in header
2. Or type in search bar and click advanced search

#### Search Options

**1. Search by Title or Director**
- Type movie title: "Inception"
- Type director name: "Christopher Nolan"
- Searches both fields simultaneously

**2. Filter by Genres**
- Click genre pills to select/deselect
- Multiple genres = movies with ANY of those genres
- Shows count of selected genres

**3. Filter by Year Range**
- Set "Year From" (minimum year)
- Set "Year To" (maximum year)
- Default: 1900 - 2028

**4. Filter by Rating**
- Drag "Min Rating" slider (0.0 - 10.0)
- Drag "Max Rating" slider (0.0 - 10.0)
- Shows only movies within rating range

**5. Sort Results**
- **Sort By:**
  - Popularity (default)
  - Title (A-Z or Z-A)
  - Year (oldest/newest)
  - Rating (lowest/highest)
- **Order:**
  - Descending (high to low)
  - Ascending (low to high)

**6. Search & Reset**
- Click **"Search Movies"** to apply filters
- Click **"Reset Filters"** to clear all
- Results count shows at bottom

---

## 🗄️ Database Setup (Supabase)

### **Step 1: Run SQL Schema**

1. Go to your Supabase project dashboard
2. Click **"SQL Editor"** in left sidebar
3. Click **"New Query"**
4. Copy contents of `supabase-auth-schema.sql`
5. Paste into SQL editor
6. Click **"Run"** or press `Ctrl+Enter`
7. Wait for success message

### **Step 2: Enable Google OAuth (Optional)**

1. Go to **Authentication** → **Providers**
2. Find **Google** provider
3. Click **"Enable"**
4. Get credentials from [Google Cloud Console](https://console.cloud.google.com/):
   - Create OAuth 2.0 Client ID
   - Add authorized redirect URI: `https://YOUR_PROJECT.supabase.co/auth/v1/callback`
5. Copy Client ID and Client Secret
6. Paste into Supabase Google provider settings
7. Click **"Save"**

### **Step 3: Configure Email Templates (Optional)**

1. Go to **Authentication** → **Email Templates**
2. Customize:
   - Confirmation email
   - Password reset email
   - Magic link email
3. Add your branding and styling
4. Click **"Save"**

---

## 📊 Database Tables Created

### **1. `watchlist`**
Stores user watchlists with cloud sync
```sql
- id (UUID, primary key)
- user_id (UUID, references auth.users)
- movie_id (INTEGER)
- added_at (TIMESTAMP)
```

### **2. `user_ratings`**
Stores user ratings and reviews (ready for future feature)
```sql
- id (UUID, primary key)
- user_id (UUID, references auth.users)
- movie_id (INTEGER)
- rating (DECIMAL 0-10)
- review (TEXT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### **3. `user_profiles`**
Extended user information
```sql
- id (UUID, primary key, references auth.users)
- full_name (TEXT)
- avatar_url (TEXT)
- bio (TEXT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### **4. `movie_cache`**
Caches TMDB data for performance (optional)
```sql
- movie_id (INTEGER, primary key)
- title (TEXT)
- poster_path (TEXT)
- backdrop_path (TEXT)
- overview (TEXT)
- release_date (DATE)
- vote_average (DECIMAL)
- genre_ids (INTEGER[])
- cached_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

---

## 🔒 Security Features

### **Row Level Security (RLS)**
All tables have RLS enabled:
- Users can only see/edit their own data
- Watchlist is private per user
- Ratings are public (read), private (write)
- Profiles are public (read), private (write)

### **Policies Created**
- ✅ Users can view their own watchlist
- ✅ Users can add to their own watchlist
- ✅ Users can remove from their own watchlist
- ✅ Anyone can view ratings (for future features)
- ✅ Users can only edit their own ratings
- ✅ Anyone can view profiles
- ✅ Users can only edit their own profile

---

## 🎯 How It Works

### **Authentication Flow**

```
1. User clicks "Sign In"
   ↓
2. AuthModal opens
   ↓
3. User enters credentials
   ↓
4. useAuth hook calls Supabase Auth
   ↓
5. Supabase validates & creates session
   ↓
6. Session stored in localStorage
   ↓
7. User state updated in App
   ↓
8. Watchlist syncs from Supabase
   ↓
9. User is logged in!
```

### **Watchlist Sync Flow**

```
When NOT logged in:
- Watchlist stored in localStorage only
- No cloud sync

When logged in:
1. Load watchlist from Supabase
2. Merge with local watchlist
3. Save to both Supabase & localStorage
4. On toggle:
   - Update UI immediately (optimistic)
   - Sync to Supabase in background
   - Revert if sync fails
```

### **Advanced Search Flow**

```
1. User opens Advanced Search modal
   ↓
2. User sets filters (genre, year, rating, etc)
   ↓
3. User clicks "Search Movies"
   ↓
4. Filter logic runs:
   - Filter by query (title/director)
   - Filter by genres (OR logic)
   - Filter by year range
   - Filter by rating range
   - Sort by selected field & order
   ↓
5. Results passed to App
   ↓
6. App displays filtered movies
   ↓
7. Banner shows result count
   ↓
8. User can clear search to see all movies
```

---

## 🧪 Testing

### **Test Authentication**

1. **Sign Up:**
   - Use real email (for verification)
   - Password must be 6+ characters
   - Check email for verification link

2. **Sign In:**
   - Use verified email
   - Check if watchlist syncs
   - Check if name appears in header

3. **Google Sign In:**
   - Must enable in Supabase first
   - Use any Google account
   - Should auto-create profile

4. **Password Reset:**
   - Enter email
   - Check inbox for reset link
   - Set new password
   - Try signing in with new password

5. **Sign Out:**
   - Click name → Sign Out
   - Check if redirected
   - Check if watchlist persists (localStorage)

### **Test Advanced Search**

1. **Search by Title:**
   - Type "Inception"
   - Should find matching movies

2. **Filter by Genre:**
   - Select "Action"
   - Should show only action movies
   - Select multiple genres
   - Should show movies with ANY selected genre

3. **Filter by Year:**
   - Set 2020-2024
   - Should show only movies from those years

4. **Filter by Rating:**
   - Set 8.0-10.0
   - Should show only highly rated movies

5. **Sort Results:**
   - Sort by Title A-Z
   - Sort by Year (newest first)
   - Sort by Rating (highest first)

6. **Reset Filters:**
   - Click "Reset Filters"
   - All filters should clear
   - Should show all movies again

---

## 🐛 Troubleshooting

### **Authentication Issues**

**Problem:** Can't sign up
- ✅ Check email is valid format
- ✅ Check password is 6+ characters
- ✅ Check Supabase project is active
- ✅ Check environment variables in `.env`

**Problem:** Email verification not received
- ✅ Check spam folder
- ✅ Check Supabase email settings
- ✅ Try resending verification email

**Problem:** Google sign in doesn't work
- ✅ Enable Google provider in Supabase
- ✅ Add OAuth credentials
- ✅ Check redirect URI is correct

**Problem:** Watchlist not syncing
- ✅ Check if user is logged in
- ✅ Check Supabase connection
- ✅ Check RLS policies are enabled
- ✅ Check browser console for errors

### **Advanced Search Issues**

**Problem:** No results found
- ✅ Check if filters are too restrictive
- ✅ Try resetting filters
- ✅ Check if movies exist in that range

**Problem:** Search is slow
- ✅ Normal for large datasets
- ✅ Consider adding pagination
- ✅ Consider caching results

**Problem:** Genres not filtering correctly
- ✅ Check if movies have genre data
- ✅ Check if genre names match exactly

---

## 📝 Code Structure

### **New Files Created**

```
src/
├── hooks/
│   └── useAuth.ts              # Authentication hook
├── components/
│   ├── AuthModal.tsx           # Login/signup modal
│   └── AdvancedSearch.tsx      # Advanced search modal
└── ...

supabase-auth-schema.sql        # Database schema
```

### **Modified Files**

```
src/
├── App.tsx                     # Added auth & search state
├── components/
│   └── Header.tsx              # Added auth buttons & search
└── hooks/
    └── useWatchlist.ts         # Added cloud sync
```

---

## 🎉 What's Next?

### **Recommended Next Features:**

1. **User Ratings & Reviews** ⭐
   - Rate movies 1-10
   - Write reviews
   - See other users' reviews
   - Database table already created!

2. **Movie Trailers** 🎬
   - Watch trailers in modal
   - YouTube integration
   - TMDB already provides video data

3. **Similar Movies** 🎯
   - Show similar movies
   - Based on genre & rating
   - TMDB API has this endpoint

4. **Watch Providers** 📺
   - Where to watch (Netflix, Disney+, etc)
   - Regional availability
   - TMDB API has this data

5. **Pagination** 📄
   - Load more movies
   - Infinite scroll
   - Better performance

---

## 💡 Tips

### **For Users:**
- ✅ Sign up to sync watchlist across devices
- ✅ Use advanced search to find specific movies
- ✅ Combine multiple filters for precise results
- ✅ Save your favorite searches

### **For Developers:**
- ✅ Check Supabase dashboard for user activity
- ✅ Monitor RLS policies for security
- ✅ Add indexes for better performance
- ✅ Consider adding rate limiting
- ✅ Add error tracking (Sentry, etc)

---

## 📚 Resources

- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Supabase RLS Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [TMDB API Docs](https://developers.themoviedb.org/3)
- [React Hooks Guide](https://react.dev/reference/react)

---

**🎊 Congratulations! Your app now has authentication and advanced search!** 🎊

Need help? Check the troubleshooting section or open an issue on GitHub.
