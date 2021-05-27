#!/bin/sh
set -x

# Set up symlinks when you first clone a repo, for easy static site editing

CITIES="detroit snowflake"
mkdir -p dist

if [ ! -e "./dist/images" ]; then
    cd ./dist/
    ln -s ../public/images .
    cd ..
fi


# Assume that CSS has already been built
# If not, explicitly call
# yarn build:css

for city in ${CITIES};
    do echo "Creating dist files for ${city}"
    mkdir -p dist/$city/css
    if [ ! -e "./dist/$city/index.html" ]; then
        cd ./dist/$city/
        ln -s ../../public/$city/index.html .
        cd ../..
    fi
    # TODO Separate out Tailwinds CSS for each city if they diverge
    # Windows doesn't support symlinks, so copy
    if [ ! -e "./dist/$city/css/tailwind.min.css" ]; then
        cd ./dist/$city/css
        ln -s ../../../public/css/tailwind.min.css .
        cd ../../..
    fi
    if [ ! -e "./dist/$city/images" ]; then
        cd ./dist/$city
        ln -s ../../public/$city/images .
        cd ../..
    fi
done
