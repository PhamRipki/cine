# 🎬 CineData - Modern Movie Database

> Aplikasi web modern untuk eksplorasi film dengan data real-time dari TMDB API, dilengkapi authentication, cloud sync, dan advanced search.

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue.svg)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Latest-green.svg)](https://supabase.com/)
[![TMDB](https://img.shields.io/badge/TMDB-API-yellow.svg)](https://www.themoviedb.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## ✨ Features

### 🔐 Authentication & User Management
- ✅ Sign up/Sign in dengan email & password
- ✅ Google OAuth integration
- ✅ Password reset via email
- ✅ Automatic session management
- ✅ User profile management

### ☁️ Cloud Watchlist Sync
- ✅ Watchlist tersimpan di cloud (Supabase)
- ✅ Cross-device synchronization
- ✅ Offline support dengan localStorage fallback
- ✅ Optimistic updates untuk UX yang smooth

### 🔍 Advanced Search
- ✅ Search by title atau director
- ✅ Filter by multiple genres
- ✅ Filter by year range (1900-2028)
- ✅ Filter by rating (0-10)
- ✅ Sort by: Title, Year, Rating, Popularity
- ✅ Real-time results count

### 🎥 Movie Features
- ✅ Real-time data dari TMDB API
- ✅ Trending, Popular, Upcoming movies
- ✅ Movie details dengan cast & crew
- ✅ Genre browser dengan filter
- ✅ Hero spotlight section
- ✅ Responsive grid layout

### 🎨 UI/UX
- ✅ Modern, clean design
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Loading states & error handling
- ✅ Smooth animations & transitions
- ✅ Dark theme optimized

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ dan npm
- Akun [TMDB](https://www.themoviedb.org/settings/api) (gratis)
- Akun [Supabase](https://supabase.com/) (gratis)

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/cinedata.git
cd cinedata

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env dengan API keys kamu
# VITE_TMDB_API_KEY=your_tmdb_key
# VITE_SUPABASE_URL=your_supabase_url
# VITE_SUPABASE_ANON_KEY=your_supabase_key

# Setup database (jalankan SQL di Supabase)
# Copy isi supabase-auth-schema.sql ke Supabase SQL Editor

# Start development server
npm run dev
```

Buka http://localhost:5173

### Build for Production

```bash
npm run build
```

Output: `dist/` folder (~105 KB gzipped)

---

## 📖 Documentation

- **[Quick Start Guide](QUICK_START.md)** - Setup 5 menit
- **[Authentication Guide](AUTHENTICATION_GUIDE.md)** - Panduan lengkap auth
- **[New Features Summary](NEW_FEATURES_SUMMARY.md)** - Fitur terbaru v1.1.0
- **[Changelog](CHANGELOG.md)** - Version history

---

## 🗄️ Database Setup

### Step 1: Jalankan SQL Schema

1. Buka [Supabase Dashboard](https://app.supabase.com/)
2. Pilih project kamu
3. Klik **SQL Editor** → **New Query**
4. Copy isi file `supabase-auth-schema.sql`
5. Paste dan klik **Run**

### Step 2: Enable Google OAuth (Optional)

1. Di Supabase: **Authentication** → **Providers** → **Google**
2. Enable dan tambahkan OAuth credentials dari Google Cloud Console
3. Save

**Selesai!** Database siap dipakai.

---

## 🎯 Usage

### Authentication

```typescript
// Sign up
const { data, error } = await signUp(email, password, fullName);

// Sign in
const { data, error } = await signIn(email, password);

// Sign in with Google
const { data, error } = await signInWithGoogle();

// Sign out
await signOut();
```

### Watchlist

```typescript
// Add to watchlist (auto-sync to cloud if logged in)
toggleWatchlist(movieId);

// Get watchlist
const { watchlist } = useWatchlist(userId);
```

### Advanced Search

```typescript
// Search with filters
const results = movies.filter(m => {
  // Filter by genre, year, rating
  // Sort by title, year, rating, popularity
});
```

---

## 📁 Project Structure

```
cinedata/
├── src/
│   ├── components/
│   │   ├── AuthModal.tsx           # Login/signup modal
│   │   ├── AdvancedSearch.tsx      # Advanced search modal
│   │   ├── Header.tsx              # Header with auth
│   │   ├── MovieGrid.tsx           # Movie grid display
│   │   ├── GenreBrowser.tsx        # Genre browser
│   │   └── ...
│   ├── hooks/
│   │   ├── useAuth.ts              # Authentication hook
│   │   ├── useMovies.ts            # TMDB API hook
│   │   └── useWatchlist.ts         # Watchlist with cloud sync
│   ├── lib/
│   │   ├── tmdb.ts                 # TMDB API client
│   │   ├── supabase.ts             # Supabase client
│   │   └── ...
│   └── types.ts                    # TypeScript types
├── supabase-auth-schema.sql        # Database schema
├── AUTHENTICATION_GUIDE.md         # Auth documentation
├── QUICK_START.md                  # Quick start guide
└── README.md                       # This file
```

---

## 🔒 Security

### Row Level Security (RLS)

All tables protected dengan RLS policies:
- Users can only access their own data
- Watchlist is private per user
- Ratings are public (read), private (write)
- Profiles are public (read), private (write)

### Authentication

- Password hashing by Supabase
- OAuth with Google
- Email verification
- Session management
- CSRF protection

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
vercel
```

### Netlify

```bash
netlify deploy --prod
```

### Manual

```bash
npm run build
# Upload dist/ folder to hosting
```

**Important:** Add environment variables di hosting platform!

---

## 🧪 Testing

### Test Authentication

1. Sign up dengan email baru
2. Check email untuk verification
3. Sign in dengan credentials
4. Check if name appears in header

### Test Watchlist Sync

1. Login dan add movies to watchlist
2. Sign out
3. Sign in again
4. Watchlist should persist

### Test Advanced Search

1. Click sliders icon in search bar
2. Set filters (genre, year, rating)
3. Click "Search Movies"
4. Verify results

---

## 📊 Tech Stack

- **Frontend:** React 18.3.1, TypeScript 5.5.3
- **Styling:** Tailwind CSS 3.4.1
- **Build Tool:** Vite 5.4.2
- **Backend:** Supabase (Auth, Database)
- **API:** TMDB API v3
- **Icons:** Lucide React
- **Deployment:** Vercel/Netlify

---

## 🎯 Roadmap

### v1.1.0 ✅ (Current)
- [x] User authentication
- [x] Cloud watchlist sync
- [x] Advanced search

### v1.2.0 (Next)
- [ ] User ratings & reviews
- [ ] Movie trailers
- [ ] Similar movies
- [ ] Watch providers

### v1.3.0 (Future)
- [ ] Pagination/infinite scroll
- [ ] Actor/Director pages
- [ ] TV Shows support
- [ ] PWA support

---

## 🐛 Known Issues

- No pagination yet (all movies loaded at once)
- No movie trailers yet
- Limited to movies only (no TV shows)

---

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📝 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file.

---

## 🙏 Credits

- Movie data by [TMDB](https://www.themoviedb.org/)
- Backend by [Supabase](https://supabase.com/)
- Icons by [Lucide](https://lucide.dev/)
- Built with [React](https://reactjs.org/) & [TypeScript](https://www.typescriptlang.org/)

---

## 📞 Support

- 📖 Read [AUTHENTICATION_GUIDE.md](AUTHENTICATION_GUIDE.md)
- 🚀 Read [QUICK_START.md](QUICK_START.md)
- 💬 Open an issue on GitHub
- 📧 Contact: your-email@example.com

---

**Made with ❤️ by Your Name**

**Star ⭐ this repo if you like it!**
