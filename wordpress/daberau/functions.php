<?php
/**
 * Daberau theme bootstrap.
 *
 * @package Daberau
 */

defined( 'ABSPATH' ) || exit;

define( 'DABERAU_VERSION', '1.1.0' );
define( 'DABERAU_DIR', get_template_directory() );
define( 'DABERAU_URI', get_template_directory_uri() );

require DABERAU_DIR . '/inc/helpers.php';
require DABERAU_DIR . '/inc/setup.php';
require DABERAU_DIR . '/inc/customizer.php';
require DABERAU_DIR . '/inc/fields.php';
require DABERAU_DIR . '/inc/post-types.php';
require DABERAU_DIR . '/inc/contact-form.php';
require DABERAU_DIR . '/inc/seo.php';
require DABERAU_DIR . '/inc/seed.php';
