<?php
/**
 * Theme supports, menus, assets and head output.
 *
 * @package Daberau
 */

defined( 'ABSPATH' ) || exit;

add_action(
	'after_setup_theme',
	function () {
		load_theme_textdomain( 'daberau', DABERAU_DIR . '/languages' );
		add_theme_support( 'title-tag' );
		add_theme_support( 'post-thumbnails' );
		add_theme_support( 'html5', array( 'search-form', 'gallery', 'caption', 'style', 'script' ) );
		add_theme_support( 'custom-logo', array( 'height' => 502, 'width' => 720, 'flex-height' => true, 'flex-width' => true ) );
		add_theme_support( 'responsive-embeds' );

		register_nav_menus(
			array(
				'primary'        => __( 'Header (after "Services")', 'daberau' ),
				'footer_company' => __( 'Footer: Company', 'daberau' ),
				'footer_help'    => __( 'Footer: Help', 'daberau' ),
				'footer_legal'   => __( 'Footer: Legal', 'daberau' ),
			)
		);
	}
);

add_action(
	'wp_enqueue_scripts',
	function () {
		wp_enqueue_style( 'daberau-fonts', 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap', array(), null ); // phpcs:ignore WordPress.WP.EnqueuedResourceParameters.MissingVersion
		wp_enqueue_style( 'daberau', DABERAU_URI . '/assets/css/main.css', array(), daberau_asset_version( 'css/main.css' ) );
		wp_enqueue_script( 'daberau', DABERAU_URI . '/assets/js/main.js', array(), daberau_asset_version( 'js/main.js' ), array( 'strategy' => 'defer', 'in_footer' => true ) );

		$form = daberau_default( 'leadForm' );
		wp_localize_script(
			'daberau',
			'daberauData',
			array(
				'endpoint' => esc_url_raw( rest_url( 'daberau/v1/contact' ) ),
				'maxBytes' => 10 * MB_IN_BYTES,
				'errors'   => array(
					'name'       => $form['fields']['name']['error'],
					'email'      => $form['fields']['email']['error'],
					'whatsapp'   => $form['fields']['whatsapp']['error'],
					'service'    => $form['fields']['service']['error'],
					'message'    => $form['fields']['message']['error'],
					'attachment' => $form['fields']['attachment']['error'],
					'consent'    => $form['fields']['consent']['error'],
				),
				'loading'  => $form['loading'],
				'shown'    => __( '%d services shown', 'daberau' ),
			)
		);
	}
);

/** Cache-busting version from the file's modification time. */
function daberau_asset_version( $path ) {
	$file = DABERAU_DIR . '/assets/' . $path;
	return file_exists( $file ) ? (string) filemtime( $file ) : DABERAU_VERSION;
}

// Marks JS as available before paint, so scroll-reveal never hides content without JavaScript.
add_action(
	'wp_head',
	function () {
		echo "<script>document.documentElement.classList.add('js')</script>\n";
	},
	1
);

add_action(
	'wp_head',
	function () {
		echo '<link rel="preconnect" href="https://fonts.googleapis.com">' . "\n";
		echo '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' . "\n";
		echo '<meta name="theme-color" content="#bf1e2e">' . "\n";
		if ( ! has_site_icon() ) {
			printf( '<link rel="icon" href="%s" sizes="any">' . "\n", esc_url( daberau_asset( 'images/favicon.ico' ) ) );
			printf( '<link rel="icon" type="image/png" href="%s">' . "\n", esc_url( daberau_asset( 'images/icon.png' ) ) );
			printf( '<link rel="apple-touch-icon" href="%s">' . "\n", esc_url( daberau_asset( 'images/apple-icon.png' ) ) );
		}
	},
	2
);

// Tidy head: the theme ships no emoji or block styles it doesn't use on the front end.
remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'wp_print_styles', 'print_emoji_styles' );
add_action(
	'wp_enqueue_scripts',
	function () {
		$kind   = is_page() ? daberau_page_kind( get_queried_object() ) : '';
		$custom = is_front_page() || is_singular( 'daberau_service' ) || ( $kind && 'legal' !== $kind );
		if ( $custom ) {
			wp_dequeue_style( 'wp-block-library' );
			wp_dequeue_style( 'global-styles' );
			wp_dequeue_style( 'classic-theme-styles' );
		}
	},
	100
);

/**
 * Logo image: the Customizer logo when set, otherwise the bundled one.
 *
 * @param string $variant full|mark.
 * @param string $class   CSS classes.
 */
function daberau_logo( $variant = 'full', $class = '' ) {
	if ( 'full' === $variant && has_custom_logo() ) {
		return wp_get_attachment_image( get_theme_mod( 'custom_logo' ), 'full', false, array( 'class' => $class, 'alt' => get_bloginfo( 'name' ) ) );
	}
	$src = 'full' === $variant ? 'images/logo-daberau.png' : 'images/logo-monogram.png';
	$dim = 'full' === $variant ? 'width="720" height="502"' : 'width="40" height="40"';
	$alt = 'full' === $variant ? daberau_default( 'site.brand' ) : '';
	return '<img src="' . esc_url( daberau_asset( $src ) ) . '" alt="' . esc_attr( $alt ) . '" ' . $dim . ' class="' . esc_attr( $class ) . '">';
}

/**
 * Links for a menu location, or the default links when no menu is assigned.
 *
 * @param string $location Menu location.
 * @param array  $defaults [ [ label, url ] ].
 * @return array [ [ 'label' => …, 'url' => …, 'external' => bool ] ]
 */
function daberau_menu_links( $location, $defaults ) {
	$locations = get_nav_menu_locations();
	if ( ! empty( $locations[ $location ] ) ) {
		$items = wp_get_nav_menu_items( $locations[ $location ] );
		if ( $items ) {
			$out = array();
			foreach ( $items as $item ) {
				if ( (int) $item->menu_item_parent ) {
					continue;
				}
				$out[] = array( 'label' => $item->title, 'url' => $item->url, 'external' => '_blank' === $item->target );
			}
			return $out;
		}
	}
	$out = array();
	foreach ( $defaults as $d ) {
		$out[] = array( 'label' => $d[0], 'url' => $d[1], 'external' => false );
	}
	return $out;
}

/** Default links per menu location. */
function daberau_default_menu( $location ) {
	$sets = array(
		'primary'        => array( array( __( 'Industries', 'daberau' ), daberau_url( 'industries' ) ), array( __( 'How We Work', 'daberau' ), daberau_url( 'how-we-work' ) ), array( __( 'About Us', 'daberau' ), daberau_url( 'about' ) ), array( __( 'Contact', 'daberau' ), daberau_url( 'contact' ) ) ),
		'footer_company' => array( array( __( 'About Us', 'daberau' ), daberau_url( 'about' ) ), array( __( 'Industries', 'daberau' ), daberau_url( 'industries' ) ), array( __( 'Contact', 'daberau' ), daberau_url( 'contact' ) ) ),
		'footer_help'    => array( array( __( 'FAQ', 'daberau' ), daberau_url( 'faq' ) ), array( __( 'How We Work', 'daberau' ), daberau_url( 'how-we-work' ) ) ),
		'footer_legal'   => array( array( __( 'Privacy Policy', 'daberau' ), daberau_url( 'privacy' ) ), array( __( 'Terms & Conditions', 'daberau' ), daberau_url( 'terms' ) ) ),
	);
	return daberau_menu_links( $location, $sets[ $location ] );
}

/** Whether a URL is the current page (or a parent of it). */
function daberau_is_current( $url ) {
	$current = trailingslashit( strtok( home_url( add_query_arg( array() ) ), '?' ) );
	$url     = trailingslashit( strtok( $url, '#' ) );
	if ( trailingslashit( home_url( '/' ) ) === $url ) {
		return $current === $url;
	}
	return 0 === strpos( $current, $url );
}

/** Published services in menu order. */
function daberau_services() {
	static $services = null;
	if ( null === $services ) {
		$services = get_posts(
			array(
				'post_type'      => 'daberau_service',
				'posts_per_page' => 50,
				'orderby'        => array( 'menu_order' => 'ASC', 'title' => 'ASC' ),
				'no_found_rows'  => true,
			)
		);
	}
	return $services;
}

/**
 * Card data for a service post.
 *
 * @param WP_Post $post Service.
 */
function daberau_service_card( $post ) {
	$f   = daberau_fields( $post, 'service' );
	$def = daberau_default_service( $post->post_name );
	if ( has_post_thumbnail( $post ) ) {
		$img_id = get_post_thumbnail_id( $post );
		$image  = wp_get_attachment_image_url( $img_id, 'large' );
		$alt    = get_post_meta( $img_id, '_wp_attachment_image_alt', true );
	} else {
		$file  = 'images/services/' . $post->post_name . '.webp';
		$image = file_exists( DABERAU_DIR . '/assets/' . $file ) ? daberau_asset( $file ) : '';
		$alt   = isset( $def['image']['alt'] ) ? $def['image']['alt'] : '';
	}
	return array(
		'id'    => $post->ID,
		'slug'  => $post->post_name,
		'name'  => get_the_title( $post ),
		'url'   => get_permalink( $post ),
		'short' => $f['short'],
		'icon'  => $f['icon'],
		'scope' => daberau_lines( $f['scope'] ),
		'needs' => array_filter( array_map( 'trim', explode( ',', $f['needs'] ) ) ),
		'image' => $image,
		'alt'   => $alt ? $alt : '',
	);
}

/** WhatsApp glyph (filled). */
function daberau_whatsapp_icon( $class = 'h-5 w-5' ) {
	return '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" class="' . esc_attr( $class ) . '"><path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.01c0-5.2 4.24-9.44 9.45-9.44 2.52 0 4.89.99 6.67 2.77a9.37 9.37 0 0 1 2.76 6.68c0 5.2-4.24 9.43-9.45 9.43m8.04-17.47A11.3 11.3 0 0 0 12.05.7C5.78.7.68 5.8.68 12.06c0 2 .52 3.96 1.52 5.68L.58 23.7l6.1-1.6a11.3 11.3 0 0 0 5.37 1.37h.01c6.26 0 11.36-5.1 11.37-11.36 0-3.04-1.18-5.89-3.33-8.04"/></svg>';
}

/** Whether the pre-footer CTA shows on this page (not on Contact or legal pages). */
function daberau_show_prefooter() {
	$kind = is_page() ? daberau_page_kind( get_queried_object() ) : '';
	return ! is_404() && 'contact' !== $kind && 'legal' !== $kind;
}

/*
 * Daberau pages always use their Daberau layout, even when an existing page still has another template
 * (a "Default" template or a page builder's canvas from the previous theme). Runs late so it wins.
 */
add_filter(
	'template_include',
	function ( $template ) {
		if ( ! is_page() || is_front_page() ) {
			return $template;
		}
		$kind = daberau_page_kind( get_queried_object() );
		if ( ! $kind ) {
			return $template;
		}
		$file = DABERAU_DIR . '/' . daberau_page_kinds()[ $kind ][0];
		return file_exists( $file ) ? $file : $template;
	},
	99
);
