<?php

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
 * @return string development|production
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
 * Registers main CSS file based on env
 *
 * @return void
 */
function ct_enqueue_styles() {
    $theme_version = wp_get_theme()->get('Version');
    if (ct_get_env() === 'development') {
        wp_enqueue_style('main', get_template_directory_uri() . '/assets/dist/main.css', [], $theme_version, 'all');
    } else {
        wp_enqueue_style('main', get_template_directory_uri() . '/assets/dist/main.min.css', [], $theme_version, 'all');
    }
}

add_action('wp_enqueue_scripts', 'ct_enqueue_styles');

/**
 * Registers main JS file based on env
 *
 * @return void
 */
function ct_enqueue_scripts() {
    $theme_version = wp_get_theme()->get('Version');
    if (ct_get_env() === 'development') {
        wp_enqueue_script('main', get_template_directory_uri() . '/assets/dist/main.js', [], $theme_version, true);
    } else {
        wp_enqueue_script('main', get_template_directory_uri() . '/assets/dist/main.min.js', [], $theme_version, true);
    }
}

add_action('wp_enqueue_scripts', 'ct_enqueue_scripts');

/**
 * Dequeues default styles
 *
 * @return void
 */
function ct_dequeue_styles() {
    wp_dequeue_style('wp-block-library');
}

// add_action('wp_enqueue_scripts', 'ct_dequeue_styles');
