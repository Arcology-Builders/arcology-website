#!/bin/sh

# Set up symlinks when you first clone a repo, for easy static site editing

CITIES="detroit tempe"
mkdir -p dist

yarn build:css

for city in ${CITIES};
    do echo "Creating dist files for ${city}"
    mkdir -p dist/$city/css
    mkdir -p dist/$city/images
    # if [ ! -e "./dist/$city/index.html" ]; then
    cp public/$city/index.html ./dist/$city/index.html
    # fi
    # TODO Separate out Tailwinds CSS for each city if they diverge
    # Windows doesn't support symlinks, so copy
    #if [ ! -f "./dist/$city/css/tailwind.min.css" ]; then
    cp ./dist/css/tailwind.min.css ./dist/$city/css/tailwind.min.css
    #fi
done