<?php

require_once 'inc/theme-setup.php';

/* This loads the baseline style only for the admin view */
if (is_admin()) {
    wp_enqueue_style('style', get_stylesheet_uri());
}
