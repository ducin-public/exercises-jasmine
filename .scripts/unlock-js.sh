#!/bin/sh

echo "uncovering JS files"

mv data data.ts
find test -name "*.js__" -exec bash -c 'mv "$1" "${1%.js__}".js' - '{}' \;
