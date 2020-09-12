# CMS Boilerplate with Docker

This is a boilerplate theme development template for WordPress or Joomla.

## Scripts

`npm run dcu` launches the Docker containers defined in `docker-compose.yml` as background services.

`npm run dcd` shuts the containers down gracefully.

`npm run dev` runs Gulp with no parameters. This defaults to development mode. Code is not minified and sourcemaps are generated.

`npm run build` runs Gulp with the build task. This is production mode. Code is minified/transpiled and sourcemaps are not generated.

Excerpt from package.json

        "dcu": "docker-compose up -d",
        "dcd": "docker-compose down",
        "dev": "webpack --config=webpack.dev.js",
        "build": "webpack --config=webpack.prod.js"
