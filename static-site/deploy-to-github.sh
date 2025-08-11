#!/bin/bash

echo "Deploying Vulcan Cycling static site to GitHub Pages..."

# Create deploy directory if it doesn't exist
mkdir -p deploy

# Clean up previous deploy
rm -rf deploy/*

# Create necessary subdirectories
mkdir -p deploy/css
mkdir -p deploy/js
mkdir -p deploy/images
mkdir -p deploy/admin
mkdir -p deploy/news
mkdir -p deploy/races
mkdir -p deploy/results
mkdir -p deploy/about
mkdir -p deploy/contact

# Copy standalone HTML files
cp index.html deploy/
cp team.html deploy/
cp grasshopper.html deploy/
cp news/index.html deploy/news/
cp news/detail.html deploy/news/
cp races/index.html deploy/races/
cp races/detail.html deploy/races/
cp results/index.html deploy/results/
cp about/index.html deploy/about/
cp contact/index.html deploy/contact/

# Copy CSS
cp css/*.css deploy/css/ 2>/dev/null || true

# Copy JS
cp js/*.js deploy/js/ 2>/dev/null || true

# Copy images (if they exist)
if [ -d "images" ]; then
  cp -r images/* deploy/images/ 2>/dev/null || true
fi

# Copy admin files
cp admin/*.html deploy/admin/ 2>/dev/null || true

# Copy admin JS and CSS if they exist
if [ -d "admin/js" ]; then
  mkdir -p deploy/admin/js
  cp admin/js/*.js deploy/admin/js/ 2>/dev/null || true
fi

if [ -d "admin/css" ]; then
  mkdir -p deploy/admin/css
  cp admin/css/*.css deploy/admin/css/ 2>/dev/null || true
fi

# Create or update the .nojekyll file to disable Jekyll processing on GitHub Pages
touch deploy/.nojekyll

# Deploy to GitHub Pages
echo "Site prepared for deployment in 'deploy' directory"
echo "If deploying to a web server, upload all contents of the 'deploy' directory"
echo "For GitHub Pages, push the contents of the 'deploy' directory to the gh-pages branch"

# Check if GITHUB_DEPLOY_TOKEN environment variable is set
if [ -n "$GITHUB_DEPLOY_TOKEN" ]; then
  echo "Deploying to GitHub Pages using token..."
  # Commands to deploy using GitHub token would go here
else
  echo "Deploying to GitHub Pages using git..."
  cd deploy
  git init
  git add .
  git commit -m "Deploy site update"
  git branch -M gh-pages
  git remote add origin https://github.com/abinkley/vulcan.git
  git push -f origin gh-pages
  cd ..
  
  echo "Deployment complete. Site should be available at: https://abinkley.github.io/vulcan/"
  echo "Note: It may take a few minutes for changes to propagate"
fi

# Reminder about background image
echo "Note: The background image is loaded from images/vulcan-screenshot-bg.jpg. Make sure this image exists in the images directory."

# Create CNAME file for custom domain
echo "vulcancycling.com" > deploy/CNAME

echo "Deploying Vulcan Cycling static site..."
echo "Site prepared for deployment in the 'deploy' directory."
echo "To deploy to your web server, run: scp -r deploy/* user@your-server:/path/to/webroot/"
echo "For GitHub Pages, push the contents of the 'deploy' directory to your gh-pages branch."

# Check if we're in a git repository
if [ -d .git ] || git rev-parse --git-dir > /dev/null 2>&1; then
    # Change to deploy directory
    cd deploy

    # Check if we're already on gh-pages branch
    current_branch=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)
    
    if [ "$current_branch" != "gh-pages" ]; then
        echo "Checking out gh-pages branch..."
        git checkout gh-pages || git checkout -b gh-pages
    else
        echo "Already on 'gh-pages'"
    fi
    
    # Add all files in the deploy directory
    git add .
    
    # Check for background image
    if grep -q "url('images/vulcan-screenshot-bg.jpg')" index.html; then
        echo "Note: The background image is loaded from a local path. Make sure the image exists in the images directory."
    elif grep -q "url('http" index.html; then
        echo "Note: The background image is loaded from a direct URL. Make sure the image is available at that URL."
    fi
    
    # Commit changes
    git commit -m "Deploy to GitHub Pages"
    
    # Push to GitHub
    echo "Pushing to GitHub Pages..."
    git push origin gh-pages
    
    echo "Deployment complete! Your site should be available at your GitHub Pages URL."
    echo "If you've set up a custom domain, it will be available at vulcancycling.com"
    echo "Note: It may take a few minutes for the changes to propagate."
    echo "Done!"
else
    echo "This is not a git repository. Please set up git before deploying to GitHub Pages."
    exit 1
fi 