#!/bin/bash

# React Flow Node Editor - Deployment Script
echo "🚀 Starting deployment process..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Run linting
echo "🔍 Running linting..."
npm run lint

# Build the project
echo "🏗️ Building project..."
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
    echo "❌ Error: Build failed. dist directory not found."
    exit 1
fi

# Display build information
echo "✅ Build completed successfully!"
echo "📊 Build size: $(du -sh dist | cut -f1)"
echo "📁 Build files:"
ls -la dist/

echo ""
echo "🎯 Deployment options:"
echo "1. Serve locally: npm run serve"
echo "2. Preview build: npm run preview"
echo "3. Deploy to Netlify: netlify deploy --prod --dir=dist"
echo "4. Deploy to Vercel: vercel --prod"
echo "5. Manual deployment: Upload dist/ folder to your web server"

echo ""
echo "🌐 Your application is ready for deployment!"
echo "📂 Production files are in the 'dist' directory" 