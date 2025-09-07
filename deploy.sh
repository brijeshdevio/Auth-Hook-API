#!/bin/bash

# AuthHookApi - Quick Vercel Deployment Script
# This script commits and pushes changes to trigger Vercel deployment

echo "🚀 AuthHookApi - Vercel Deployment"
echo "=================================="

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Error: Not in a git repository"
    echo "   Run 'git init' first"
    exit 1
fi

# Add all changes
echo "📁 Adding changes..."
git add .

# Check if there are any changes to commit
if git diff --staged --quiet; then
    echo "ℹ️  No changes to commit"
    echo "   Repository is up to date"
    exit 0
fi

# Get commit message from user or use default
if [ -z "$1" ]; then
    COMMIT_MSG="🔧 Configure for Vercel deployment - $(date '+%Y-%m-%d %H:%M:%S')"
else
    COMMIT_MSG="$1"
fi

# Commit changes
echo "💾 Committing changes..."
git commit -m "$COMMIT_MSG"

# Push to origin main
echo "⬆️  Pushing to GitHub..."
git push origin main

echo ""
echo "✅ Deployment triggered successfully!"
echo ""
echo "📋 Next steps:"
echo "   1. Go to https://vercel.com"
echo "   2. Import your GitHub repository"
echo "   3. Configure environment variables"
echo "   4. Deploy!"
echo ""
echo "📖 See VERCEL_DEPLOYMENT.md for detailed instructions"
