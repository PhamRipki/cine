# Vercel Environment Variables Setup Script
# Run this to add all environment variables to Vercel

Write-Host "Setting up Vercel Environment Variables..." -ForegroundColor Green

# TMDB Variables
vercel env add VITE_TMDB_API_KEY production
# Paste: eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3N2VlNzJkMzU0YTg0NTA0MGMxZjFkMjE0ZTg1ZTRhYyIsIm5iZiI6MTc3OTY4NTMyOS43NDIsInN1YiI6IjZhMTNkN2QxZTc2MGUzZDdjNjlmZjUxMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.q-0_Tr47pyWvUjN_Yw2JeaNDCwKEMTBexATg8NzE4-8

vercel env add VITE_TMDB_BASE_URL production
# Paste: https://api.themoviedb.org/3

vercel env add VITE_TMDB_IMAGE_BASE_URL production
# Paste: https://image.tmdb.org/t/p

# Supabase Variables
vercel env add VITE_SUPABASE_URL production
# Paste: https://esbwjosiizzawblpqygn.supabase.co

vercel env add VITE_SUPABASE_ANON_KEY production
# Paste: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzYndqb3NpaXp6YXdibHBxeWduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2Nzc4MzUsImV4cCI6MjA5NTI1MzgzNX0.UDE_--TyQCSwpg4eYR8QbVMEZyfwg92nupfvf52uGj4

Write-Host "Done! Now redeploy with: vercel --prod" -ForegroundColor Green
