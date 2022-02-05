#!/bin/sh

echo -e "Preparing JavaScript (removing TypeScript)"

echo -e "\n> preparing 'data'"

rm -rf data.ts
mv data.js data

echo -e "\n> preparing 'test'"

find test -iname "*.ts" ! -iname "root.js" -type f -exec ls -ls {} \;
find test -iname "*.ts" ! -iname "root.js" -type f -exec rm -r {} \;

echo -e "\n> removing .scripts"

rm -rf .scripts

echo -e "\n> preparing git for snapshot commit"

git add data data.js data.ts test .scripts
git status

echo -e "\n> finished (TypeScript removal)"

echo -e "REMEMBER TO NAME AND PUSH THE BRANCH CORRECTLY"
