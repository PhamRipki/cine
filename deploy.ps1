# CineData Deployment Script (PowerShell)
# Usage: .\deploy.ps1 [platform]
# Platforms: vercel, netlify, preview

param(
    [string]$Platform = "preview"
)

Write-Host "🚀 CineData Deployment Script" -ForegroundColor Cyan
Write-Host "==============================" -ForegroundColor Cyan
Write-Host ""

# Pre-deployment checks
Write-Host "📋 Running pre-deployment checks..." -ForegroundColor Yellow
Write-Host ""

# Check Node version
$nodeVersion = node -v
Write-Host "✓ Node version: $nodeVersion" -ForegroundColor Green

# Check if .env exists
if (-not (Test-Path .env)) {
    Write-Host "✗ .env file not found!" -ForegroundColor Red
    Write-Host "  Please create .env file with your API keys" -ForegroundColor Yellow
    exit 1
}
Write-Host "✓ .env file found" -ForegroundColor Green

# Check environment variables
Write-Host ""
Write-Host "🔑 Checking environment variables..." -ForegroundColor Yellow
node debug-env.js
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Environment variables check failed!" -ForegroundColor Red
    exit 1
}

# Run type check
Write-Host ""
Write-Host "🔍 Running type check..." -ForegroundColor Yellow
npm run typecheck
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Type check failed!" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Type check passed" -ForegroundColor Green

# Run linter
Write-Host ""
Write-Host "🔍 Running linter..." -ForegroundColor Yellow
npm run lint
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠ Linter warnings found (continuing...)" -ForegroundColor Yellow
}

# Build
Write-Host ""
Write-Host "🔨 Building for production..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Build failed!" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Build successful" -ForegroundColor Green

# Deploy based on platform
Write-Host ""
switch ($Platform) {
    "vercel" {
        Write-Host "🚀 Deploying to Vercel..." -ForegroundColor Cyan
        if (-not (Get-Command vercel -ErrorAction SilentlyContinue)) {
            Write-Host "✗ Vercel CLI not found!" -ForegroundColor Red
            Write-Host "  Install with: npm install -g vercel" -ForegroundColor Yellow
            exit 1
        }
        vercel --prod
    }
    
    "netlify" {
        Write-Host "🚀 Deploying to Netlify..." -ForegroundColor Cyan
        if (-not (Get-Command netlify -ErrorAction SilentlyContinue)) {
            Write-Host "✗ Netlify CLI not found!" -ForegroundColor Red
            Write-Host "  Install with: npm install -g netlify-cli" -ForegroundColor Yellow
            exit 1
        }
        netlify deploy --prod --dir=dist
    }
    
    "preview" {
        Write-Host "👀 Starting preview server..." -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Preview your production build at:" -ForegroundColor Green
        Write-Host "  http://localhost:4173" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Press Ctrl+C to stop" -ForegroundColor Yellow
        npm run preview
    }
    
    default {
        Write-Host "✗ Unknown platform: $Platform" -ForegroundColor Red
        Write-Host ""
        Write-Host "Usage: .\deploy.ps1 [platform]"
        Write-Host "Platforms:"
        Write-Host "  vercel   - Deploy to Vercel"
        Write-Host "  netlify  - Deploy to Netlify"
        Write-Host "  preview  - Preview locally (default)"
        exit 1
    }
}

Write-Host ""
Write-Host "✅ Deployment complete!" -ForegroundColor Green
