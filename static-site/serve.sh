#!/bin/bash

# Simple script to start a local server for testing the static site

echo "Starting local server for Vulcan Cycling static site..."
echo "Access the site at: http://localhost:8000"
echo "Press Ctrl+C to stop the server"

# Check if Python is available
if command -v python3 &>/dev/null; then
    python3 -m http.server 8000
elif command -v python &>/dev/null; then
    python -m SimpleHTTPServer 8000
else
    echo "Error: Python is not installed. Please install Python to use this script."
    exit 1
fi 