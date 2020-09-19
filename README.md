# CMS Boilerplate with Docker

This is a boilerplate theme development template for WordPress or Joomla. Before running any commands.

NB! Before launching the Docker containers or running any commands, make sure you have mkcert setup (https://github.com/FiloSottile/mkcert). This is a required step.

## Scripts

`npm run dcu` launches the Docker containers defined in `docker-compose.yml` as background services.

`npm run dcd` shuts the containers down gracefully.

`npm run dev:watch` runs Gulp with the **devWatch** task. Code is not minified and sourcemaps are generated. BrowserSync is used to reload for PHP file changes (localhost:1000) and to stream CSS/JS changes. A watcher instance is started for .php files within theme/ and SASS/JS within src/ to reload BrowserSync accordingly.

`npm run dev:build` runs Gulp with the **dev** task. This is development mode without file watching or BrowserSync. Code is not minified and sourcemaps are generated.

`npm run build` runs Gulp with the **build** task. This is production mode. Code is minified/transpiled and sourcemaps are not generated.

`npm run format` runs Prettier and formats JS/SASS files recursively in src/.

`npm run mkcert:generate` calls mkcert to generate self-signed trusted certificates to properly use an SSL connection in local development. The certificates are used by Docker and BrowserSync. More on how to setup and use mkcert here: https://github.com/FiloSottile/mkcert. Before running `npm run mkcert:generate` you must have ran `mkcert -install` at least once.

Excerpt from package.json

        "dcu": "docker-compose up -d",
        "dcd": "docker-compose down",
        "predev:watch": "npm run format",
        "dev:watch": "gulp devWatch",
        "build": "gulp build",
        "dev:build": "gulp dev",
        "format": "prettier --write src/**/*.{js,jsx,scss}",
        "mkcert:generate": "mkcert -key-file certs/dev.key -cert-file certs/dev.crt domain.tld localhost"

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
