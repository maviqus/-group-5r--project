#!/bin/bash

# Vercel Pre-Deploy Check Script
# Run this before deploying to Vercel

echo "🚀 Vercel Pre-Deploy Checklist"
echo "================================"
echo ""

# 1. Check Node version
echo "✓ Checking Node.js version..."
node --version
echo ""

# 2. Check npm version
echo "✓ Checking npm version..."
npm --version
echo ""

# 3. Clean install dependencies
echo "✓ Cleaning node_modules..."
rm -rf node_modules package-lock.json
echo ""

echo "✓ Installing dependencies..."
npm install
echo ""

# 4. Run build
echo "✓ Building project..."
npm run build
echo ""

# 5. Check build output
if [ -d "build" ]; then
    echo "✅ Build folder exists"
    echo "✓ Build folder size:"
    du -sh build/
    echo ""
    echo "✓ Build contents:"
    ls -la build/
    echo ""
else
    echo "❌ Build folder not found!"
    exit 1
fi

# 6. Check critical files
echo "✓ Checking critical files..."
files=("build/index.html" "build/static/js" "build/static/css")
for file in "${files[@]}"; do
    if [ -e "$file" ]; then
        echo "  ✅ $file exists"
    else
        echo "  ❌ $file missing!"
    fi
done
echo ""

# 7. Check package.json scripts
echo "✓ Checking package.json scripts..."
if grep -q "\"build\": \"react-scripts build\"" package.json; then
    echo "  ✅ Build script configured"
else
    echo "  ⚠️  Build script not standard"
fi
echo ""

# 8. Check vercel.json
if [ -f "vercel.json" ]; then
    echo "✅ vercel.json exists"
    echo "  Content:"
    cat vercel.json
else
    echo "⚠️  vercel.json not found (optional)"
fi
echo ""

# 9. Summary
echo "================================"
echo "📋 Deploy Information"
echo "================================"
echo "Project: group-5r-project"
echo "Framework: Create React App"
echo "Build Command: npm run build"
echo "Output Directory: build"
echo "Node Version: $(node --version)"
echo ""
echo "✅ Pre-deploy check complete!"
echo ""
echo "Next steps:"
echo "1. Push to GitHub: git push origin main"
echo "2. Deploy to Vercel:"
echo "   - Web: https://vercel.com/new"
echo "   - CLI: vercel --prod"
echo ""
