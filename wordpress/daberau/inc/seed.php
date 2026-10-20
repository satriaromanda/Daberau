<?php
/**
 * First-run setup: creates the pages, services, FAQs and menus the theme expects.
 *
 * Runs when the theme is activated and can be re-run from Appearance → Daberau setup.
 * It only adds what is missing, so it never overwrites content you have edited.
 *
 * @package Daberau
 */

defined( 'ABSPATH' ) || exit;

add_action( 'after_switch_theme', 'daberau_seed' );

/** Creates missing content. Returns a list of what was created. */
function daberau_seed() {
	$log = array();
	// Seeding can run on a front-end request (no user); keep titles like "IT Consulting & Digital Transformation" intact.
	kses_remove_filters();

	// Pretty permalinks are needed for /services/web-development/ style URLs.
	if ( '' === get_option( 'permalink_structure' ) ) {
		update_option( 'permalink_structure', '/%postname%/' );
		$log[] = __( 'Permalinks set to "Post name".', 'daberau' );
	}

	// Pages.
	$d     = 'daberau_default';
	$pages = array(
		'home'                 => array( __( 'Home', 'daberau' ), '', '' ),
		'services'             => array( __( 'Services', 'daberau' ), 'page-templates/template-services.php', '' ),
		'about-us'             => array( __( 'About Us', 'daberau' ), 'page-templates/template-about.php', '' ),
		'how-we-work'          => array( __( 'How We Work', 'daberau' ), 'page-templates/template-how-we-work.php', '' ),
		'faq'                  => array( __( 'FAQ', 'daberau' ), 'page-templates/template-faq.php', '' ),
		'contact'              => array( __( 'Contact', 'daberau' ), 'page-templates/template-contact.php', '' ),
		'privacy-policy'       => array( $d( 'privacy.h1' ), 'page-templates/template-legal.php', daberau_legal_html( $d( 'privacy' ) ) ),
		'terms-and-conditions' => array( $d( 'terms.h1' ), 'page-templates/template-legal.php', daberau_legal_html( $d( 'terms' ) ) ),
	);
	$ids   = array();
	$order = 0;
	foreach ( $pages as $slug => $page ) {
		$existing = get_page_by_path( $slug );
		// WordPress creates a draft "Privacy Policy" page on install; reuse and fill it.
		if ( $existing && 'privacy-policy' === $slug && 'draft' === $existing->post_status ) {
			wp_update_post( array( 'ID' => $existing->ID, 'post_status' => 'publish', 'post_content' => $page[2], 'post_title' => $page[0] ) );
			update_post_meta( $existing->ID, '_wp_page_template', $page[1] );
			$log[] = sprintf( __( 'Page filled: %s', 'daberau' ), $page[0] );
		}
		if ( $existing ) {
			$ids[ $slug ] = $existing->ID;
			continue;
		}
		$id = wp_insert_post(
			array(
				'post_type'    => 'page',
				'post_status'  => 'publish',
				'post_title'   => $page[0],
				'post_name'    => $slug,
				'post_content' => $page[2],
				'menu_order'   => $order++,
			)
		);
		if ( $id && ! is_wp_error( $id ) ) {
			if ( $page[1] ) {
				update_post_meta( $id, '_wp_page_template', $page[1] );
			}
			$ids[ $slug ] = $id;
			$log[]        = sprintf( /* translators: %s: page title */ __( 'Page created: %s', 'daberau' ), $page[0] );
		}
	}
	if ( ! empty( $ids['home'] ) && 'page' !== get_option( 'show_on_front' ) ) {
		update_option( 'show_on_front', 'page' );
		update_option( 'page_on_front', $ids['home'] );
		$log[] = __( 'Home page set as the front page.', 'daberau' );
	}
	if ( ! empty( $ids['privacy-policy'] ) ) {
		update_option( 'wp_page_for_privacy_policy', $ids['privacy-policy'] );
	}

	// Services.
	foreach ( $d( 'services', array() ) as $i => $s ) {
		if ( get_page_by_path( $s['slug'], OBJECT, 'daberau_service' ) ) {
			continue;
		}
		$id = wp_insert_post(
			array(
				'post_type'   => 'daberau_service',
				'post_status' => 'publish',
				'post_title'  => $s['name'],
				'post_name'   => $s['slug'],
				'menu_order'  => $i,
			)
		);
		if ( $id && ! is_wp_error( $id ) ) {
			daberau_seed_image( $id, 'images/services/' . $s['slug'] . '.webp', $s['image']['alt'] );
			$log[] = sprintf( /* translators: %s: service name */ __( 'Service created: %s', 'daberau' ), $s['name'] );
		}
	}

	// FAQs.
	$groups = array();
	foreach ( $d( 'faqPage.categories', array() ) as $cat ) {
		$groups[] = array( $cat['title'], $cat['id'], $cat['items'] );
	}
	$groups[] = array( __( 'Contact page', 'daberau' ), 'contact-page', $d( 'contactPage.faq.items', array() ) );
	$groups[] = array( __( 'Services page', 'daberau' ), 'services-page', $d( 'servicesOverview.faqs', array() ) );
	foreach ( $groups as $group ) {
		list( $name, $slug, $items ) = $group;
		if ( get_term_by( 'slug', $slug, 'daberau_faq_group' ) ) {
			continue;
		}
		$term = wp_insert_term( $name, 'daberau_faq_group', array( 'slug' => $slug ) );
		if ( is_wp_error( $term ) ) {
			continue;
		}
		foreach ( $items as $i => $item ) {
			$id = wp_insert_post(
				array(
					'post_type'    => 'daberau_faq',
					'post_status'  => 'publish',
					'post_title'   => $item['q'],
					'post_content' => $item['a'],
					'menu_order'   => $i,
				)
			);
			if ( $id && ! is_wp_error( $id ) ) {
				wp_set_object_terms( $id, (int) $term['term_id'], 'daberau_faq_group' );
			}
		}
		$log[] = sprintf( /* translators: %s: group name */ __( 'FAQ group created: %s', 'daberau' ), $name );
	}

	// Menus.
	$menus = array(
		'primary'        => array( __( 'Header', 'daberau' ), array( 'about-us', 'how-we-work', 'contact' ) ),
		'footer_company' => array( __( 'Footer: Company', 'daberau' ), array( 'about-us', 'contact' ) ),
		'footer_help'    => array( __( 'Footer: Help', 'daberau' ), array( 'faq', 'how-we-work' ) ),
		'footer_legal'   => array( __( 'Footer: Legal', 'daberau' ), array( 'privacy-policy', 'terms-and-conditions' ) ),
	);
	$locations = get_theme_mod( 'nav_menu_locations', array() );
	foreach ( $menus as $location => $menu ) {
		if ( ! empty( $locations[ $location ] ) || wp_get_nav_menu_object( $menu[0] ) ) {
			continue;
		}
		$menu_id = wp_create_nav_menu( $menu[0] );
		if ( is_wp_error( $menu_id ) ) {
			continue;
		}
		foreach ( $menu[1] as $slug ) {
			if ( empty( $ids[ $slug ] ) ) {
				continue;
			}
			wp_update_nav_menu_item(
				$menu_id,
				0,
				array(
					'menu-item-object-id' => $ids[ $slug ],
					'menu-item-object'    => 'page',
					'menu-item-type'      => 'post_type',
					'menu-item-status'    => 'publish',
				)
			);
		}
		$locations[ $location ] = $menu_id;
		$log[]                  = sprintf( /* translators: %s: menu name */ __( 'Menu created: %s', 'daberau' ), $menu[0] );
	}
	set_theme_mod( 'nav_menu_locations', $locations );

	kses_init_filters();
	flush_rewrite_rules();
	update_option( 'daberau_seeded', DABERAU_VERSION );
	return $log;
}

/**
 * Imports a bundled image into the Media Library and sets it as the featured image.
 *
 * @param int    $post_id Post.
 * @param string $asset   Path inside assets/.
 * @param string $alt     Alt text.
 */
function daberau_seed_image( $post_id, $asset, $alt ) {
	$source = DABERAU_DIR . '/assets/' . $asset;
	if ( ! file_exists( $source ) ) {
		return;
	}
	require_once ABSPATH . 'wp-admin/includes/file.php';
	require_once ABSPATH . 'wp-admin/includes/media.php';
	require_once ABSPATH . 'wp-admin/includes/image.php';
	$tmp = wp_tempnam( wp_basename( $source ) );
	if ( ! $tmp || ! copy( $source, $tmp ) ) {
		return;
	}
	$id = media_handle_sideload( array( 'name' => wp_basename( $source ), 'tmp_name' => $tmp ), $post_id );
	if ( is_wp_error( $id ) ) {
		wp_delete_file( $tmp );
		return;
	}
	update_post_meta( $id, '_wp_attachment_image_alt', $alt );
	set_post_thumbnail( $post_id, $id );
}

/**
 * Legal document as editable HTML: intro, then an H2 per section.
 *
 * @param array $doc Document from defaults.json.
 */
function daberau_legal_html( $doc ) {
	$email = daberau_default( 'site.email' );
	$fmt   = function ( $text ) use ( $email ) {
		return str_replace( esc_html( $email ), '<a href="mailto:' . esc_attr( $email ) . '">' . esc_html( $email ) . '</a>', esc_html( $text ) );
	};
	$html = '<p>' . $fmt( $doc['intro'] ) . "</p>\n\n";
	foreach ( $doc['sections'] as $section ) {
		$html .= '<h2 id="' . esc_attr( $section['id'] ) . '">' . esc_html( $section['title'] ) . "</h2>\n";
		foreach ( $section['body'] as $block ) {
			if ( is_string( $block ) ) {
				$html .= '<p>' . $fmt( $block ) . "</p>\n";
			} else {
				$html .= "<ul>\n";
				foreach ( $block['list'] as $item ) {
					$html .= '<li>' . $fmt( $item ) . "</li>\n";
				}
				$html .= "</ul>\n";
			}
		}
		if ( 'cookies' === $section['id'] ) {
			$html .= "<p>[daberau_cookie_settings]</p>\n";
		}
		$html .= "\n";
	}
	return $html;
}

/* Appearance → Daberau setup. */
add_action(
	'admin_menu',
	function () {
		add_theme_page( __( 'Daberau setup', 'daberau' ), __( 'Daberau setup', 'daberau' ), 'manage_options', 'daberau-setup', 'daberau_setup_page' );
	}
);

/** Renders the setup page. */
function daberau_setup_page() {
	$log = null;
	if ( isset( $_POST['daberau_seed'] ) && check_admin_referer( 'daberau_seed' ) ) {
		$log = daberau_seed();
	}
	echo '<div class="wrap"><h1>' . esc_html__( 'Daberau setup', 'daberau' ) . '</h1>';
	echo '<p>' . esc_html__( 'Creates any missing pages, services, FAQs and menus with the default content. Existing content is never changed.', 'daberau' ) . '</p>';
	if ( null !== $log ) {
		echo '<div class="notice notice-success"><p>' . ( $log ? implode( '<br>', array_map( 'esc_html', $log ) ) : esc_html__( 'Everything is already in place.', 'daberau' ) ) . '</p></div>';
	}
	echo '<form method="post">';
	wp_nonce_field( 'daberau_seed' );
	submit_button( __( 'Create missing content', 'daberau' ), 'primary', 'daberau_seed' );
	echo '</form>';
	echo '<h2>' . esc_html__( 'Where to edit', 'daberau' ) . '</h2><ul style="list-style:disc;padding-left:20px">';
	$links = array(
		array( admin_url( 'edit.php?post_type=page' ), __( 'Pages: open a page and use the "Page content (Daberau)" box', 'daberau' ) ),
		array( admin_url( 'edit.php?post_type=daberau_service' ), __( 'Services: one entry per service page', 'daberau' ) ),
		array( admin_url( 'edit.php?post_type=daberau_faq' ), __( 'FAQs, grouped by FAQ Group', 'daberau' ) ),
		array( admin_url( 'customize.php?autofocus[panel]=daberau' ), __( 'Customizer → Daberau: phone, email, WhatsApp, address, footer, social links', 'daberau' ) ),
		array( admin_url( 'nav-menus.php' ), __( 'Menus: header and footer links', 'daberau' ) ),
		array( admin_url( 'edit.php?post_type=daberau_inquiry' ), __( 'Inquiries: requests sent through the contact form', 'daberau' ) ),
	);
	foreach ( $links as $l ) {
		echo '<li><a href="' . esc_url( $l[0] ) . '">' . esc_html( $l[1] ) . '</a></li>';
	}
	echo '</ul></div>';
}
