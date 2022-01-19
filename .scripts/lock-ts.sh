#!/bin/sh

echo "hiding TS files"

mv data.js data
find test -name "*.ts" -exec bash -c 'mv "$1" "${1%.ts}".ts__' - '{}' \;
