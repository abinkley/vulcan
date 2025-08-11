#!/bin/bash

# Clean up any previous builds
rm -rf .next
rm -rf node_modules

# Install dependencies
npm install

# Build the application
npm run build

# Deploy to Vercel
vercel --prod 