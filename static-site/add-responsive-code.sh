#!/bin/bash

# Script to add responsive CSS and JS references to all HTML files in the project

# Find all HTML files in the static-site directory
HTML_FILES=$(find . -name "*.html")

for file in $HTML_FILES; do
  echo "Processing $file..."
  
  # Get the relative path from this file to the root
  # Count how many directories deep we are
  depth=$(echo "$file" | tr -cd '/' | wc -c)
  path_prefix=""
  
  # If we're not in the root, add the appropriate number of "../"
  if [ $depth -gt 1 ]; then
    for (( i=1; i<$depth; i++ )); do
      path_prefix="${path_prefix}../"
    done
  else
    path_prefix="./"
  fi
  
  # Check if responsive CSS is already included
  if ! grep -q "responsive.css" "$file"; then
    # Add responsive CSS link before closing head tag
    sed -i '' -e "/<\/head>/i\\
  <!-- Responsive Styles -->\\
  <link rel=\"stylesheet\" href=\"${path_prefix}css/responsive.css\">\\
" "$file"
  fi
  
  # Check if mobile-nav.js is already included
  if ! grep -q "mobile-nav.js" "$file"; then
    # Add mobile-nav.js script before closing head tag
    sed -i '' -e "/<\/head>/i\\
  <!-- Mobile Navigation Script -->\\
  <script src=\"${path_prefix}js/mobile-nav.js\" defer></script>\\
" "$file"
  fi
done

echo "All HTML files updated with responsive code!" 