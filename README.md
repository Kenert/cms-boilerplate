# CMS Boilerplate with Docker

This is a boilerplate theme development template for WordPress or Joomla.

## Scripts

`npm run dcu` launches the Docker containers defined in `docker-compose.yml` as background services.

`npm run dcd` shuts the containers down gracefully.

`npm run dev:watch` runs Gulp with the **devWatch** task. Code is not minified and sourcemaps are generated. BrowserSync is used to reload for PHP file changes (localhost:1000) and to stream CSS/JS changes. A watcher instance is started for .php files within theme/ and SASS/JS within src/ to reload BrowserSync accordingly.

`npm run dev:build` runs Gulp with the **dev** task. This is development mode without file watching or BrowserSync. Code is not minified and sourcemaps are generated.

`npm run build` runs Gulp with the **build** task. This is production mode. Code is minified/transpiled and sourcemaps are not generated.

`npm run formatJs` runs Prettier and formats JS files recursively in src/js/.

`npm run formatSass` runs Prettier and formats SASS files recursively in src/sass/.

Excerpt from package.json

        "dcu": "docker-compose up -d",
        "dcd": "docker-compose down",
        "predev:watch": "npm run formatJs && npm run formatSass",
        "dev:watch": "gulp devWatch",
        "build": "gulp build",
        "dev:build": "gulp dev",
        "formatJs": "prettier --write src/js/**/*.js",
        "formatSass": "prettier --write src/sass/**/*.scss"

## Docker Environment Variables

Put .env in root directory with following content:

```
# Wordpress environment variables for Docker
WORDPRESS_DB_HOST=DB_HOST:3306
WORDPRESS_DB_USER=DB_USER
WORDPRESS_DB_PASSWORD=PASSWORD
WORDPRESS_DB_NAME=DB_NAME
# Used to detect within the theme whether in production or development
WORDPRESS_DEBUG=1
```
