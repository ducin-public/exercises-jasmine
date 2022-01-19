#!/bin/sh

echo "hiding JS files"

mv data.ts data
find test -name "*.js" -exec bash -c 'mv "$1" "${1%.js}".js__' - '{}' \;
mv test/root.js__ test/root.js # this one has to stay :)
