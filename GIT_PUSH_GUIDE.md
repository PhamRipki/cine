# 📤 Git Push Guide - Apa yang Boleh & Tidak Boleh di Push

## ❌ **JANGAN PUSH INI KE GITHUB!**

### 🔴 **SANGAT PENTING (Berisi Secrets!):**

#### 1. **`.env`** - Environment Variables
```
.env
.env.local
.env.production
.env.development
.env*.local
```

**Kenapa?** Berisi API keys dan secrets:
- `VITE_TMDB_API_KEY` - TMDB API key kamu
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anon key

**Bahaya:** Orang bisa pakai API key kamu, akses database kamu!

---

#### 2. **`node_modules/`** - Dependencies
```
node_modules/
```

**Kenapa?** Folder ini SANGAT BESAR (~200MB+)
- Berisi semua package dari npm
- Bisa di-install ulang dengan `npm install`
- Tidak perlu di-push ke GitHub

---

#### 3. **`dist/`** - Build Output
```
dist/
dist-ssr/
```

**Kenapa?** Hasil build production
- Generated otomatis dari `npm run build`
- Tidak perlu di-push (hosting akan build sendiri)
- Ukuran besar (~1-2MB)

---

### 🟡 **File Temporary/Debug:**

#### 4. **Log Files**
```
*.log
npm-debug.log*
yarn-debug.log*
logs/
```

**Kenapa?** File log tidak berguna di GitHub

---

#### 5. **IDE Settings**
```
.vscode/*
.idea/
*.suo
*.ntvs*
```

**Kenapa?** Settings personal, tiap developer beda

---

#### 6. **OS Files**
```
.DS_Store      # Mac
Thumbs.db      # Windows
```

**Kenapa?** File sistem operasi, tidak relevan

---

#### 7. **Test/Debug Files**
```
debug-env.js
test-api.html
test-tmdb-api.js
```

**Kenapa?** File untuk testing lokal, tidak perlu di production

---

## ✅ **BOLEH & HARUS DI-PUSH:**

### 📁 **Source Code:**
```
src/
├── components/
├── hooks/
├── lib/
├── data/
├── types.ts
├── App.tsx
├── main.tsx
└── index.css
```

### 📄 **Config Files:**
```
package.json           # Dependencies list
package-lock.json      # Lock file untuk npm
tsconfig.json          # TypeScript config
vite.config.ts         # Vite config
tailwind.config.js     # Tailwind config
postcss.config.js      # PostCSS config
eslint.config.js       # ESLint config
```

### 📝 **Documentation:**
```
README.md
CHANGELOG.md
AUTHENTICATION_GUIDE.md
QUICK_START.md
NEW_FEATURES_SUMMARY.md
IMPLEMENTATION_COMPLETE.md
FEATURE_ANALYSIS.md
GIT_PUSH_GUIDE.md      # File ini
```

### 🗄️ **Database Schema:**
```
supabase-auth-schema.sql
```

### 🚀 **Deployment Files:**
```
vercel.json
netlify.toml
_redirects
deploy.ps1
```

### 🔧 **Other Files:**
```
.gitignore             # PENTING! Harus di-push
.env.example           # Template untuk .env (tanpa values)
index.html
LICENSE
```

---

## 📋 **Checklist Sebelum Push:**

### ✅ **Pre-Push Checklist:**

- [ ] **Check `.env` tidak ter-commit**
  ```powershell
  git status
  # Pastikan .env tidak muncul di list
  ```

- [ ] **Check `.gitignore` sudah benar**
  ```powershell
  cat .gitignore
  # Pastikan .env, node_modules, dist ada di list
  ```

- [ ] **Remove sensitive data dari code**
  ```powershell
  # Cari hardcoded secrets
  grep -r "eyJhbGciOiJIUzI1NiJ9" src/
  # Harusnya tidak ada hasil
  ```

- [ ] **Build test**
  ```powershell
  npm run build
  # Pastikan no errors
  ```

- [ ] **Lint check**
  ```powershell
  npm run lint
  # Fix semua warnings
  ```

---

## 🚀 **Cara Push ke GitHub:**

### **First Time Push:**

```powershell
# 1. Initialize git (kalau belum)
git init

# 2. Add remote repository
git remote add origin https://github.com/username/cinedata.git

# 3. Check status
git status

# 4. Add files (gitignore akan exclude yang tidak perlu)
git add .

# 5. Commit
git commit -m "feat: add authentication and advanced search"

# 6. Push
git push -u origin main
```

---

### **Update Push (Setelah Changes):**

```powershell
# 1. Check what changed
git status

# 2. Add changes
git add .

# 3. Commit with message
git commit -m "fix: update authentication flow"

# 4. Push
git push
```

---

## 🔒 **Security Best Practices:**

### ✅ **DO:**
- ✅ Push `.env.example` (template tanpa values)
- ✅ Push `.gitignore` (untuk protect secrets)
- ✅ Push source code
- ✅ Push documentation
- ✅ Push config files (tanpa secrets)

### ❌ **DON'T:**
- ❌ Push `.env` (berisi secrets!)
- ❌ Push `node_modules/` (terlalu besar)
- ❌ Push `dist/` (generated files)
- ❌ Push API keys di code
- ❌ Push passwords di code
- ❌ Push database credentials

---

## 🆘 **Kalau Sudah Terlanjur Push `.env`:**

### **URGENT! Segera lakukan ini:**

```powershell
# 1. Remove .env from git history
git rm --cached .env

# 2. Commit the removal
git commit -m "chore: remove .env from git"

# 3. Push
git push

# 4. PENTING! Regenerate semua secrets:
# - Generate new TMDB API key
# - Regenerate Supabase anon key
# - Update .env dengan keys baru
```

**Kenapa?** Git history menyimpan semua perubahan. Orang masih bisa lihat `.env` lama di history!

---

## 📝 **`.env.example` Template:**

Buat file `.env.example` (BOLEH di-push):

```env
# TMDB API
VITE_TMDB_API_KEY=your_tmdb_api_key_here
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p

# Supabase
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

**Cara pakai:**
```powershell
# User lain copy template
cp .env.example .env

# Lalu edit .env dengan keys mereka sendiri
```

---

## 🎯 **Git Commit Message Best Practices:**

### **Format:**
```
<type>: <description>

[optional body]
```

### **Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Formatting
- `refactor:` - Code restructure
- `test:` - Tests
- `chore:` - Maintenance

### **Examples:**
```bash
git commit -m "feat: add user authentication"
git commit -m "fix: watchlist sync issue"
git commit -m "docs: update README with new features"
git commit -m "style: format code with prettier"
git commit -m "refactor: optimize search performance"
git commit -m "chore: update dependencies"
```

---

## 📊 **Check Repository Size:**

```powershell
# Check what will be pushed
git status

# Check repository size
git count-objects -vH

# Check largest files
git ls-files | xargs ls -lh | sort -k5 -hr | head -20
```

**Ideal size:** <50MB (tanpa node_modules & dist)

---

## 🔍 **Verify Before Push:**

```powershell
# 1. Check .env is ignored
git status | grep ".env"
# Should return nothing

# 2. Check node_modules is ignored
git status | grep "node_modules"
# Should return nothing

# 3. Check dist is ignored
git status | grep "dist"
# Should return nothing

# 4. List files to be committed
git diff --cached --name-only

# 5. Check for secrets in code
grep -r "eyJhbGciOiJIUzI1NiJ9" src/
grep -r "supabase.co" src/
# Should only find in lib/supabase.ts (using env vars)
```

---

## 📦 **What Your GitHub Repo Should Look Like:**

```
cinedata/
├── .github/              # GitHub workflows (optional)
├── src/                  # Source code ✅
├── public/               # Public assets ✅
├── .gitignore            # Git ignore rules ✅
├── .env.example          # Env template ✅
├── package.json          # Dependencies ✅
├── package-lock.json     # Lock file ✅
├── tsconfig.json         # TS config ✅
├── vite.config.ts        # Vite config ✅
├── tailwind.config.js    # Tailwind config ✅
├── index.html            # HTML entry ✅
├── README.md             # Documentation ✅
├── CHANGELOG.md          # Version history ✅
├── LICENSE               # License ✅
└── *.md                  # Other docs ✅

# NOT in repo:
# ❌ .env
# ❌ node_modules/
# ❌ dist/
# ❌ *.log
```

---

## 🎯 **Summary:**

### **JANGAN PUSH:**
1. ❌ `.env` (secrets!)
2. ❌ `node_modules/` (terlalu besar)
3. ❌ `dist/` (generated)
4. ❌ `*.log` (logs)
5. ❌ IDE settings
6. ❌ OS files
7. ❌ Test/debug files

### **HARUS PUSH:**
1. ✅ Source code (`src/`)
2. ✅ Config files
3. ✅ Documentation
4. ✅ `.gitignore`
5. ✅ `.env.example`
6. ✅ `package.json`
7. ✅ Database schema

---

## 🚀 **Ready to Push?**

```powershell
# Final check
git status

# Add all (gitignore will exclude automatically)
git add .

# Commit
git commit -m "feat: add authentication and advanced search features"

# Push
git push -u origin main
```

**Done!** 🎉

---

## 📞 **Need Help?**

- 🔒 **Accidentally pushed secrets?** Regenerate them immediately!
- 📦 **Repo too large?** Check if node_modules or dist got committed
- ❓ **Not sure?** Run `git status` and check the list

---

**Remember:** 
- ✅ `.env.example` = OK to push (template)
- ❌ `.env` = NEVER push (secrets!)

**Stay safe!** 🔒
