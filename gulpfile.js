const { src, dest, series, watch } = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const webpack = require('webpack-stream');
const compiler = require('webpack');
const browserSync = require('browser-sync').create();

const {
    webpackBaseConfig,
    webpackDevConfig,
    webpackProdConfig
} = require('./webpack.config');

/* ----------------------- Define global config object ---------------------- */

const config = {
    distdir: 'theme/assets/dist/',
    sassdir: 'src/sass/',
    sassfiles: ['main'],
    jsdir: 'src/js/',
    jsfiles: ['main', 'blocks']
};

/* ---------------------------- Processing logic ---------------------------- */

/**
 * @param  {String} env development | production
 * @param  {String} source Source glob (file) to be processed
 * @param  {String} target Output name of the file
 * @param  {String} destination Directory to output the files to
 * @param  {Function} callback runs when streams are completed
 * @returns {Void} Void
 */
const processSass = (env, source, target, destination, callback) => {
    if (env === 'production') {
        src(source)
            .pipe(
                sass({ outputStyle: 'compressed' }).on('error', sass.logError)
            )
            .pipe(autoprefixer())
            .pipe(concat(target))
            .pipe(dest(destination))
            .pipe(browserSync.stream())
            .on('finish', callback);
    } else {
        src(source)
            .pipe(sourcemaps.init())
            .pipe(sass().on('error', sass.logError))
            .pipe(concat(target))
            .pipe(sourcemaps.write('.'))
            .pipe(dest(destination))
            .pipe(browserSync.stream())
            .on('finish', callback);
    }
};
/**
 * @param  {String} env development | production
 * @param  {String} source Source glob (file) to be processed
 * @param  {String} target Output name of the file
 * @param  {String} destination Directory to output the files to
 * @param  {Function} callback runs when streams are completed
 * @returns {void} Void
 */
const processJs = (env, source, target, destination, callback) => {
    let webpackConfig;
    if (env === 'production') {
        webpackConfig = {
            ...webpackBaseConfig,
            ...webpackProdConfig,
            output: {
                filename: `${target}`
            }
        };
    } else {
        webpackConfig = {
            ...webpackBaseConfig,
            ...webpackDevConfig,
            output: {
                filename: `${target}`
            }
        };
    }
    src(`${source}`)
        .pipe(webpack(webpackConfig, compiler))
        .pipe(dest(destination))
        .pipe(browserSync.stream())
        .on('finish', callback);
};

/**
 * @param  {String} env development | production
 * @param  {String[]} filenames Array of filenames
 * @param  {String} srcdir Source directory of files to be processed
 * @param  {Function} processor Function to handle file transpilation
 * @param  {String} srcext Sourced files extension
 * @param  {String} targetext Target extension to output the files in
 * @param  {String} destination Destination to output the files to
 * @returns {Promise} Returns a promise that resolves when all files have been processed
 */
const compileFiles = (
    env,
    filenames,
    srcdir,
    processor,
    srcext,
    targetext,
    destination
) => {
    let fileStreamPromises = [];
    filenames.forEach((filename) => {
        const singleFileStreamPromise = new Promise((resolve) => {
            const source = `${srcdir}${filename}.${srcext}`;
            const target =
                env === 'production'
                    ? `${filename}.min.${targetext}`
                    : `${filename}.${targetext}`;
            return processor(env, source, target, destination, resolve);
        });
        fileStreamPromises.push(singleFileStreamPromise);
    });
    return Promise.all(fileStreamPromises);
};

/* ---------------------------------- SCSS/JS tasks --------------------------------- */

const compileStylesMinimal = () =>
    compileFiles(
        'development',
        config.sassfiles,
        config.sassdir,
        processSass,
        'scss',
        'css',
        config.distdir
    );
const compileStylesFull = () =>
    compileFiles(
        'production',
        config.sassfiles,
        config.sassdir,
        processSass,
        'scss',
        'css',
        config.distdir
    );
const compileScriptsMinimal = () =>
    compileFiles(
        'development',
        config.jsfiles,
        config.jsdir,
        processJs,
        'js',
        'js',
        config.distdir
    );
const compileScriptsFull = () =>
    compileFiles(
        'production',
        config.jsfiles,
        config.jsdir,
        processJs,
        'js',
        'js',
        config.distdir
    );

/* ------------------------------- Other tasks ------------------------------ */

const initBrowserSync = (callback) => {
    browserSync.init(
        {
            open: false,
            proxy: 'http://diplomaatia.rwd.ee',
            port: 1000,
            ui: false
        },
        callback
    );
};

const initWatchers = () => {
    watch('theme/**/*.php').on('change', browserSync.reload);
    watch('src/sass/**/*.scss').on('change', series(compileStylesMinimal));
    watch('src/js/**/*.js').on('change', series(compileScriptsMinimal));
};

/* --------------------------------- Exports -------------------------------- */

exports.default = series(
    compileStylesMinimal,
    compileScriptsMinimal,
    initBrowserSync,
    initWatchers
);
exports.build = series(compileStylesFull, compileScriptsFull);
