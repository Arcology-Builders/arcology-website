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

Serve the files locally using any static site server, such as
```
python3 -m http.server -d dist
```

Then load the `index.html` file above in your browser locally at
```
http://localhost:8000/detroit
```

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
