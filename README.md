# Website for Detroit Arcology and Arcology Builders

This is the website source code for Arcology, a project to build and steward affordable, community housing 
in Detroit.

## Getting Started

Clone our source code locally to your computer.
```
git clone https://github.com/invisible-college/arcology-website.git
```

Build the CSS file.

```
yarn build
```
to generate files to serve in the `dist/` directory.

Serve the files locally using a live-updating static site server:
```
yarn start:detroit
```

Your browser should automatically open to the URL below.
If it doesn't, open the URL below manually.
```
http://localhost:8080/detroit
```

We recommend keeping the website and your code side-by-side.
As you make changes, they'll automatically cause a refresh on the right.

## Deployment

```
ssh ubuntu@detroitarcology.org

cd /var/www/arcology-website
git pull
yarn clean
yarn build
```

## Tech Stack

We use a static responsive website made with TailwindsCSS and plain HTML.
