#!/usr/bin/env bash
set -euo pipefail

echo "Checking Node/npm..."
if ! command -v npm >/dev/null 2>&1; then
  echo "npm not found. Install Node.js (use nvm or Homebrew) and try again." >&2
  exit 1
fi

echo "Installing dev dependencies (local)..."
npm install

echo "Cleaning dist/..."
rm -rf dist
mkdir -p dist

# CSS
if [ -f "css/style.css" ]; then
  echo "Minifying CSS..."
  mkdir -p dist/css
  npx postcss css/style.css --use cssnano -o dist/css/style.min.css
else
  echo "Warning: css/style.css not found — skipping CSS minify"
fi

# JS
if compgen -G "js/*.js" > /dev/null; then
  echo "Minifying JS..."
  mkdir -p dist/js
  cat js/*.js > dist/js/combined.js
  npx terser dist/js/combined.js -o dist/js/script.min.js -c -m
else
  echo "Warning: no js/*.js files found — skipping JS minify"
fi

# HTML
if [ -f "index.html" ]; then
  echo "Minifying HTML..."
  npx html-minifier-terser --collapse-whitespace --remove-comments --minify-js --minify-css -o dist/index.html index.html
else
  echo "Error: index.html not found in repo root" >&2
  exit 1
fi

# Assets
if [ -d "assets" ]; then
  echo "Copying assets/..."
  cp -r assets dist/assets
fi

echo "Build finished. Open dist/index.html to preview."
