# Changelog

All notable changes to this project will be documented in this file.

## [1.1.0] - 2025-01-XX

### Added

#### 🔐 Authentication System
- ✅ User authentication dengan Supabase Auth
- ✅ Sign up dengan email & password
- ✅ Sign in dengan email & password
- ✅ Sign in dengan Google OAuth
- ✅ Password reset via email
- ✅ User profile management
- ✅ Automatic session management
- ✅ User menu di header dengan dropdown
- ✅ Sign out functionality

#### ☁️ Cloud Watchlist Sync
- ✅ Watchlist sync ke Supabase database
- ✅ Cross-device watchlist synchronization
- ✅ Automatic sync saat login
- ✅ Optimistic updates untuk UX yang smooth
- ✅ Fallback ke localStorage saat offline
- ✅ Merge local & cloud watchlist saat login

#### 🔍 Advanced Search
- ✅ Advanced search modal dengan filter lengkap
- ✅ Search by title atau director
- ✅ Filter by multiple genres (OR logic)
- ✅ Filter by year range (1900-2028)
- ✅ Filter by rating range (0-10)
- ✅ Sort by: Title, Year, Rating, Popularity
- ✅ Sort order: Ascending/Descending
- ✅ Real-time results count
- ✅ Reset filters button
- ✅ Search results banner dengan clear button

#### New Components
- `AuthModal.tsx` - Login/signup modal dengan form validation
- `AdvancedSearch.tsx` - Advanced search dengan filters
- `useAuth.ts` hook - Authentication state management

#### Database Schema
- `watchlist` table dengan RLS policies
- `user_ratings` table (ready for future)
- `user_profiles` table untuk extended user info
- `movie_cache` table untuk performance
- Automatic profile creation on signup
- Triggers untuk updated_at timestamps
- Views untuk statistics

### Changed
- Updated `Header.tsx` dengan auth buttons & advanced search
- Enhanced `useWatchlist.ts` dengan cloud sync support
- Modified `App.tsx` untuk integrate auth & advanced search
- Improved search UX dengan filtered results display

### Security
- ✅ Row Level Security (RLS) enabled on all tables
- ✅ Users can only access their own data
- ✅ Secure password hashing by Supabase
- ✅ OAuth integration dengan Google
- ✅ Email verification untuk new users

## [1.0.0] - 2024-01-XX

### Added

#### Core Features
- ✅ TMDB API integration untuk data film real-time
- ✅ Supabase backend integration
- ✅ Search functionality dengan debounce
- ✅ Filter berdasarkan genre, tahun, dan rating
- ✅ Watchlist lokal menggunakan localStorage
- ✅ Movie detail modal dengan cast & crew
- ✅ Responsive design untuk semua device
- ✅ Loading states dan error handling

#### API Integration
- TMDB API client (`src/lib/tmdb.ts`)
  - Get trending movies
  - Get popular movies
  - Get upcoming movies
  - Search movies
  - Get movie details
  - Discover movies with filters
  - Image URL helper
- Supabase client (`src/lib/supabase.ts`)
  - Database connection
  - Ready for authentication

#### Custom Hooks
- `useMovies` - Fetch movies from TMDB
- `useWatchlist` - Manage user watchlist

#### Utilities
- Movie data mapper (TMDB → App format)
- Genre ID mapping
- Helper functions (currency, date, runtime formatting)
- Storage helpers for localStorage
- Constants for TMDB genres and image sizes

#### Documentation
- `README.md` - Project overview
- `SETUP_GUIDE.md` - Detailed setup instructions
- `API_DOCUMENTATION.md` - API usage guide
- `DEPLOYMENT.md` - Deployment guide for various platforms
- `supabase-schema.sql` - Database schema

#### Database Schema
- `watchlist` table - User watchlist storage
- `user_ratings` table - User ratings & reviews
- `movie_cache` table - Cache TMDB responses
- Row Level Security (RLS) policies
- Indexes for performance

### Changed
- Updated `App.tsx` to use TMDB API instead of static data
- Enhanced `types.ts` with TMDB-specific types
- Improved error handling across components

### Technical Details

#### Dependencies
- React 18.3.1
- TypeScript 5.5.3
- Vite 5.4.2
- Tailwind CSS 3.4.1
- @supabase/supabase-js 2.57.4
- lucide-react 0.344.0

#### Environment Variables
```
VITE_TMDB_API_KEY
VITE_TMDB_BASE_URL
VITE_TMDB_IMAGE_BASE_URL
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

#### File Structure
```
src/
├── components/       # React components
├── data/            # Fallback static data
├── hooks/           # Custom React hooks
├── lib/             # Utilities & API clients
│   ├── tmdb.ts      # TMDB API client
│   ├── supabase.ts  # Supabase client
│   ├── movieMapper.ts
│   ├── constants.ts
│   └── helpers.ts
└── types.ts         # TypeScript types
```

## [Upcoming] - Future Releases

### Planned Features

#### v1.1.0 - Authentication ✅ COMPLETED
- [x] Supabase Auth integration
- [x] User login/signup
- [x] Social auth (Google)
- [x] User profile page
- [x] Watchlist sync dengan Supabase
- [x] Cross-device watchlist
- [x] Advanced search dengan filters

#### v1.2.0 - Ratings & Reviews
- [ ] User ratings
- [ ] User reviews
- [ ] Review moderation
- [ ] Rating statistics

#### v1.4.0 - Recommendations
- [ ] Personalized recommendations
- [ ] Similar movies
- [ ] Trending in your region
- [ ] Based on watchlist

#### v1.5.0 - Advanced Features
- [ ] Infinite scroll / pagination
- [ ] Advanced filters
- [ ] Sort options
- [ ] Movie lists/collections
- [ ] Watch providers integration

#### v2.0.0 - Major Update
- [ ] TV Shows support
- [ ] Actor/Director pages
- [ ] Trailers & videos
- [ ] News & articles
- [ ] Community features
- [ ] Dark/Light theme toggle
- [ ] Multiple languages

### Performance Improvements
- [ ] Image lazy loading
- [ ] Code splitting optimization
- [ ] Service Worker for offline support
- [ ] API response caching
- [ ] Skeleton loading states

### Developer Experience
- [ ] Unit tests
- [ ] E2E tests
- [ ] Storybook for components
- [ ] CI/CD pipeline
- [ ] Automated deployments

## Notes

### Breaking Changes
None yet - this is the initial release.

### Migration Guide
Not applicable for v1.0.0.

### Known Issues
- Limited to movies only (TV shows in v2.0.0)
- No pagination yet (all movies loaded at once)
- No movie trailers yet (coming soon)

### Credits
- Movie data provided by [TMDB](https://www.themoviedb.org/)
- Backend powered by [Supabase](https://supabase.com/)
- Icons by [Lucide](https://lucide.dev/)

---

## Version History

- **v1.1.0** - Added authentication, cloud sync, and advanced search
- **v1.0.0** - Initial release with TMDB & Supabase integration
