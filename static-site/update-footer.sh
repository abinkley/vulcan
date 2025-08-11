#!/bin/bash

# Script to add Grasshopper Kids Race link to the footer in all HTML files

# Find all HTML files in the static-site directory
HTML_FILES=$(find . -name "*.html" -not -path "./deploy/*")

for file in $HTML_FILES; do
  echo "Processing $file..."
  
  # Check if the file already has the Grasshopper link
  if ! grep -q "Grasshopper Kids Race" "$file"; then
    # Get the relative path from this file to the root
    # Count how many directories deep we are
    depth=$(echo "$file" | tr -cd '/' | wc -c)
    path_prefix=""
    
    # If we're not in the root, add the appropriate number of "../"
    if [ $depth -gt 1 ]; then
      for (( i=1; i<$depth; i++ )); do
        path_prefix="${path_prefix}../"
      done
    fi
    
    # Add Grasshopper Kids Race link to the footer's Quick Links section
    sed -i '' -e '/<li><a href=".*results\/index.html">Results<\/a><\/li>/a\
              <li><a href="'"${path_prefix}"'grasshopper.html">Grasshopper Kids Race</a></li>' "$file"
  fi
done

echo "All HTML files updated with Grasshopper Kids Race link in footer!" 