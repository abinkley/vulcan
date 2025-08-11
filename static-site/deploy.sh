#!/bin/bash

# Simple deployment script for Vulcan Cycling static site

echo "Deploying Vulcan Cycling static site..."

# Create a directory for deployment
DEPLOY_DIR="deploy"
mkdir -p $DEPLOY_DIR

# Copy all files to the deployment directory
cp -r index.html images admin $DEPLOY_DIR/

# Create other necessary directories and files
mkdir -p $DEPLOY_DIR/about $DEPLOY_DIR/news $DEPLOY_DIR/results $DEPLOY_DIR/contact

# Create placeholder pages
for page in about news results contact; do
  PAGE_TITLE=$(echo $page | sed 's/\b\(.\)/\u\1/g')
  cat > $DEPLOY_DIR/$page/index.html << EOF
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>$PAGE_TITLE - Vulcan Cycling</title>
  <meta http-equiv="refresh" content="0;url=../index.html">
</head>
<body>
  <p>Redirecting to home page...</p>
</body>
</html>
EOF
done

echo "Site prepared for deployment in the '$DEPLOY_DIR' directory."
echo "To deploy to your web server, run: scp -r $DEPLOY_DIR/* user@your-server:/path/to/webroot/"
echo "For GitHub Pages, push the contents of the '$DEPLOY_DIR' directory to your gh-pages branch."

# Make the script executable
chmod +x deploy.sh 