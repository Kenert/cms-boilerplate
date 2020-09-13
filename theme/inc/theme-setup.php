<?php

/**
 * Theme optional functionality calls
 *
 * @return Void
 */
function ct_support() {
    /*
     * Enable support for Post Thumbnails on posts and pages.
     *
     * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
     */
    add_theme_support('post-thumbnails');

    /*
     * Let WordPress manage the document title.
     * By adding theme support, we declare that this theme does not use a
     * hard-coded <title> tag in the document head, and expect WordPress to
     * provide it for us.
     */
    add_theme_support('title-tag');

    // Defines the text domain value for this theme, used for localization
    load_theme_textdomain('ct');
}

add_action('after_setup_theme', 'ct_support');

/**
 * Get current environment
 *
 * @return String development | production
 */
function ct_get_env() {
    if (defined('WP_DEBUG') && WP_DEBUG === true) {
        $env = 'development';
    } else {
        $env = 'production';
    }
    return $env;
}

/**
 * Gets the filepath for enqueue functions based on env
 *
 * @param String $filename Name of the file without extension
 * @param String $type style | script
 * @return Void
 */
function ct_get_enqueue_filepath($filename, $type) {
    $asset_path = '/assets/dist/';

    if (ct_get_env() === 'production') {
        $extension = $type === 'style' ? '.min.css' : '.min.js';
    } else {
        $extension = $type === 'style' ? '.css' : '.js';
    }

    return get_template_directory_uri() . $asset_path . $filename . $extension;
}

/**
 * Enqueues style and script assets to be loaded in
 *
 * @return Void
 */
function ct_enqueue_assets() {
    $theme_version = wp_get_theme()->get('Version');

    /* style.css is only used for metadata */
    wp_enqueue_style('style', get_stylesheet_uri());

    /* Loads main(.min).js and main(.min).css */
    wp_enqueue_style('main', ct_get_enqueue_filepath('main', 'style'), [], $theme_version, 'all');
    wp_enqueue_script('main', ct_get_enqueue_filepath('main', 'script'), [], $theme_version, true);
}

add_action('wp_enqueue_scripts', 'ct_enqueue_assets');

/**
 * Loads blocks(.min).js for Gutenberg
 *
 * @return Void
 */
function ct_enqueue_editor_assets() {
    $theme_version = wp_get_theme()->get('Version');

    wp_enqueue_script('blocks', ct_get_enqueue_filepath('blocks', 'script'), [], $theme_version, true);

}

add_action('enqueue_block_editor_assets', 'ct_enqueue_editor_assets');

/**
 * Registers custom Gutenberg block types
 *
 * @return Void
 */
function ct_register_block_types() {
    register_block_type('rwd/example');
}

add_action('init', 'ct_register_block_types');