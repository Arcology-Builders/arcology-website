all: public/css/tailwind.min.css

public/css/tailwind.min.css:
	postcss tailwind.config.css -o public/css/tailwind.min.css