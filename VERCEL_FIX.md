# 🔧 Fix Blank Screen di Vercel

## ❌ **Masalah:**
Website blank/putih karena **environment variables belum di-set di Vercel**.

---

## ✅ **Solusi Cepat (Via Dashboard):**

### **Step 1: Buka Vercel Dashboard**
1. Go to: https://vercel.com/dashboard
2. Pilih project: **cine-sigma-three**

### **Step 2: Add Environment Variables**
1. Klik tab **Settings**
2. Klik **Environment Variables** di sidebar kiri
3. Klik **Add New**

### **Step 3: Tambahkan 5 Variables Ini:**

**Copy-paste satu per satu:**

```
Name: VITE_TMDB_API_KEY
Value: eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3N2VlNzJkMzU0YTg0NTA0MGMxZjFkMjE0ZTg1ZTRhYyIsIm5iZiI6MTc3OTY4NTMyOS43NDIsInN1YiI6IjZhMTNkN2QxZTc2MGUzZDdjNjlmZjUxMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.q-0_Tr47pyWvUjN_Yw2JeaNDCwKEMTBexATg8NzE4-8
Environment: Production, Preview, Development (✓ semua)
```

```
Name: VITE_TMDB_BASE_URL
Value: https://api.themoviedb.org/3
Environment: Production, Preview, Development (✓ semua)
```

```
Name: VITE_TMDB_IMAGE_BASE_URL
Value: https://image.tmdb.org/t/p
Environment: Production, Preview, Development (✓ semua)
```

```
Name: VITE_SUPABASE_URL
Value: https://esbwjosiizzawblpqygn.supabase.co
Environment: Production, Preview, Development (✓ semua)
```

```
Name: VITE_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzYndqb3NpaXp6YXdibHBxeWduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2Nzc4MzUsImV4cCI6MjA5NTI1MzgzNX0.UDE_--TyQCSwpg4eYR8QbVMEZyfwg92nupfvf52uGj4
Environment: Production, Preview, Development (✓ semua)
```

### **Step 4: Redeploy**
1. Klik tab **Deployments**
2. Klik **...** (three dots) pada deployment terakhir
3. Klik **Redeploy**
4. Tunggu ~2 menit
5. Refresh browser

**Done!** Website seharusnya sudah muncul! 🎉

---

## 🚀 **Solusi via CLI (Alternatif):**

```powershell
# Set environment variables via CLI
vercel env add VITE_TMDB_API_KEY production
# Paste value saat diminta

vercel env add VITE_TMDB_BASE_URL production
# Paste: https://api.themoviedb.org/3

vercel env add VITE_TMDB_IMAGE_BASE_URL production
# Paste: https://image.tmdb.org/t/p

vercel env add VITE_SUPABASE_URL production
# Paste: https://esbwjosiizzawblpqygn.supabase.co

vercel env add VITE_SUPABASE_ANON_KEY production
# Paste value saat diminta

# Redeploy
vercel --prod
```

---

## 🔍 **Cara Cek Apakah Sudah Benar:**

### **1. Check Environment Variables:**
- Vercel Dashboard → Settings → Environment Variables
- Harus ada 5 variables

### **2. Check Build Logs:**
- Vercel Dashboard → Deployments → Latest deployment
- Klik deployment → View Build Logs
- Cari error messages

### **3. Check Browser Console:**
- Buka website
- Tekan F12
- Lihat Console tab
- Cari error messages

---

## 🐛 **Common Errors & Solutions:**

### **Error: "Missing Supabase environment variables"**
**Solution:** Add `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY`

### **Error: "Failed to fetch movies"**
**Solution:** Add `VITE_TMDB_API_KEY`

### **Error: "Cannot read property of undefined"**
**Solution:** Redeploy setelah add env vars

### **Still blank after redeploy?**
**Solution:** 
1. Clear browser cache (Ctrl+Shift+Delete)
2. Hard refresh (Ctrl+F5)
3. Try incognito mode
4. Check browser console (F12) for errors

---

## 📋 **Checklist:**

- [ ] Add `VITE_TMDB_API_KEY` to Vercel
- [ ] Add `VITE_TMDB_BASE_URL` to Vercel
- [ ] Add `VITE_TMDB_IMAGE_BASE_URL` to Vercel
- [ ] Add `VITE_SUPABASE_URL` to Vercel
- [ ] Add `VITE_SUPABASE_ANON_KEY` to Vercel
- [ ] All variables set to: Production, Preview, Development
- [ ] Redeploy from Vercel dashboard
- [ ] Wait for build to complete (~2 min)
- [ ] Clear browser cache
- [ ] Refresh website
- [ ] Check if movies appear

---

## 🎯 **Expected Result:**

After adding env vars and redeploying:
- ✅ Website loads (not blank)
- ✅ Movies appear on homepage
- ✅ Search works
- ✅ Watchlist works
- ✅ Authentication works

---

## 📞 **Still Not Working?**

### **Check Build Logs:**
1. Vercel Dashboard → Deployments
2. Click latest deployment
3. Click "View Build Logs"
4. Look for errors

### **Check Runtime Logs:**
1. Vercel Dashboard → Deployments
2. Click latest deployment
3. Click "View Function Logs"
4. Look for runtime errors

### **Common Issues:**

**Issue:** Build succeeds but site is blank
**Cause:** Environment variables not set
**Fix:** Follow steps above

**Issue:** Build fails
**Cause:** Missing dependencies or syntax error
**Fix:** Check build logs for specific error

**Issue:** Site loads but no movies
**Cause:** TMDB API key invalid or not set
**Fix:** Verify API key is correct

---

## 💡 **Pro Tips:**

1. **Always set env vars for all environments:**
   - Production ✓
   - Preview ✓
   - Development ✓

2. **After adding env vars, always redeploy:**
   - Env vars only apply to new deployments
   - Old deployments won't have them

3. **Use Vercel CLI for faster setup:**
   ```powershell
   vercel env pull .env.local
   ```

4. **Test locally first:**
   ```powershell
   npm run build
   npm run preview
   ```

---

## 🎉 **Success Indicators:**

When everything works:
- ✅ Homepage shows movies
- ✅ Hero section appears
- ✅ Search bar works
- ✅ Genre browser works
- ✅ Sign in button appears
- ✅ No console errors

---

**Need more help?** Check Vercel docs: https://vercel.com/docs/environment-variables
