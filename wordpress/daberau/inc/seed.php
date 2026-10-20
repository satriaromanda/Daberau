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

	// Pages. Existing pages with a matching URL (e.g. /contact/ from a previous theme) are reused, not duplicated.
	$d     = 'daberau_default';
	$pages = array(
		'home'                 => array( __( 'Home', 'daberau' ), '', '', '' ),
		'services'             => array( __( 'Services', 'daberau' ), 'page-templates/template-services.php', '', 'services' ),
		'about-us'             => array( __( 'About Us', 'daberau' ), 'page-templates/template-about.php', '', 'about' ),
		'how-we-work'          => array( __( 'How We Work', 'daberau' ), 'page-templates/template-how-we-work.php', '', 'how-we-work' ),
		'faq'                  => array( __( 'FAQ', 'daberau' ), 'page-templates/template-faq.php', '', 'faq' ),
		'contact'              => array( __( 'Contact', 'daberau' ), 'page-templates/template-contact.php', '', 'contact' ),
		'privacy-policy'       => array( $d( 'privacy.h1' ), 'page-templates/template-legal.php', daberau_legal_html( $d( 'privacy' ) ), '' ),
		'terms-and-conditions' => array( $d( 'terms.h1' ), 'page-templates/template-legal.php', daberau_legal_html( $d( 'terms' ) ), '' ),
	);
	$ids   = array();
	$order = 0;
	foreach ( $pages as $slug => $page ) {
		$existing = get_page_by_path( $slug );
		if ( ! $existing && 'home' === $slug && 'page' === get_option( 'show_on_front' ) ) {
			$existing = get_post( (int) get_option( 'page_on_front' ) );
		}
		if ( ! $existing && $page[3] ) {
			$existing = daberau_find_page( $page[3] );
		}
		if ( ! $existing && 'terms-and-conditions' === $slug ) {
			$existing = get_page_by_path( 'terms' );
		}
		if ( $existing && 'trash' === $existing->post_status ) {
			$existing = null;
		}
		if ( $existing ) {
			$update = array();
			// WordPress creates a draft "Privacy Policy" page on install; publish it.
			if ( 'privacy-policy' === $slug && 'draft' === $existing->post_status ) {
				$update['post_status'] = 'publish';
				$update['post_title']  = $page[0];
			}
			// Legal pages are the only ones that show the editor content; fill them when empty.
			if ( $page[2] && ( '' === trim( $existing->post_content ) || isset( $update['post_status'] ) ) ) {
				$update['post_content'] = $page[2];
			}
			if ( $update ) {
				wp_update_post( array_merge( array( 'ID' => $existing->ID ), $update ) );
				/* translators: %s: page title */
				$log[] = sprintf( __( 'Page filled: %s', 'daberau' ), $page[0] );
			}
			if ( $page[1] ) {
				update_post_meta( $existing->ID, '_wp_page_template', $page[1] );
			}
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

	$log = array_merge( $log, daberau_seed_menus( $ids, false ) );

	kses_init_filters();
	flush_rewrite_rules();
	update_option( 'daberau_seeded', DABERAU_VERSION );
	return $log;
}

/**
 * Creates the Daberau header and footer menus and assigns them.
 *
 * @param array $ids   Page IDs by slug.
 * @param bool  $force Replace menus already assigned (e.g. ones carried over from the previous theme).
 */
function daberau_seed_menus( $ids, $force ) {
	$log   = array();
	$menus = array(
		'primary'        => array( __( 'Daberau Header', 'daberau' ), array( 'about-us', 'how-we-work', 'contact' ) ),
		'footer_company' => array( __( 'Daberau Footer: Company', 'daberau' ), array( 'about-us', 'contact' ) ),
		'footer_help'    => array( __( 'Daberau Footer: Help', 'daberau' ), array( 'faq', 'how-we-work' ) ),
		'footer_legal'   => array( __( 'Daberau Footer: Legal', 'daberau' ), array( 'privacy-policy', 'terms-and-conditions' ) ),
	);
	$locations = get_theme_mod( 'nav_menu_locations', array() );
	foreach ( $menus as $location => $menu ) {
		if ( ! $force && ! empty( $locations[ $location ] ) ) {
			continue;
		}
		$existing = wp_get_nav_menu_object( $menu[0] );
		if ( $existing ) {
			wp_delete_nav_menu( $existing->term_id );
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
		/* translators: %s: menu name */
		$log[] = sprintf( __( 'Menu created: %s', 'daberau' ), $menu[0] );
	}
	set_theme_mod( 'nav_menu_locations', $locations );
	return $log;
}

/** Page IDs of the Daberau pages, by default slug. */
function daberau_page_ids() {
	$ids = array();
	foreach ( array( 'services' => 'services', 'about-us' => 'about', 'how-we-work' => 'how-we-work', 'faq' => 'faq', 'contact' => 'contact' ) as $slug => $kind ) {
		$page = daberau_find_page( $kind );
		if ( $page ) {
			$ids[ $slug ] = $page->ID;
		}
	}
	foreach ( array( 'privacy-policy', 'terms-and-conditions' ) as $slug ) {
		$page = daberau_find_page( 'legal', $slug );
		if ( $page ) {
			$ids[ $slug ] = $page->ID;
		}
	}
	return $ids;
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
	$notice = null;
	$class  = 'success';
	if ( isset( $_POST['daberau_seed'] ) && check_admin_referer( 'daberau_setup' ) ) {
		$log    = daberau_seed();
		$notice = $log ? implode( '<br>', array_map( 'esc_html', $log ) ) : esc_html__( 'Everything is already in place.', 'daberau' );
	} elseif ( isset( $_POST['daberau_menus'] ) && check_admin_referer( 'daberau_setup' ) ) {
		$log    = daberau_seed_menus( daberau_page_ids(), true );
		$notice = implode( '<br>', array_map( 'esc_html', $log ) );
	} elseif ( isset( $_POST['daberau_test_email'] ) && check_admin_referer( 'daberau_setup' ) ) {
		$error = '';
		$catch = function ( $e ) use ( &$error ) {
			$error = $e->get_error_message();
		};
		add_action( 'wp_mail_failed', $catch );
		$to   = daberau_mod( 'inquiry_email' );
		$sent = wp_mail( $to, __( 'Daberau website: test email', 'daberau' ), __( 'If you can read this, contact form emails will arrive.', 'daberau' ) );
		remove_action( 'wp_mail_failed', $catch );
		/* translators: %s: email address */
		$notice = $sent ? esc_html( sprintf( __( 'Test email sent to %s. Check the inbox (and spam folder).', 'daberau' ), $to ) )
			: esc_html__( 'The test email could not be sent.', 'daberau' ) . ( $error ? ' ' . esc_html( $error ) : '' ) . ' ' . esc_html__( 'Fill in the SMTP fields in Customize → Daberau → Email delivery and try again.', 'daberau' );
		$class  = $sent ? 'success' : 'error';
	}

	echo '<div class="wrap"><h1>' . esc_html__( 'Daberau setup', 'daberau' ) . '</h1>';
	if ( null !== $notice ) {
		echo '<div class="notice notice-' . esc_attr( $class ) . '"><p>' . $notice . '</p></div>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- escaped above.
	}

	// Pages.
	echo '<h2>' . esc_html__( '1. Pages', 'daberau' ) . '</h2>';
	echo '<p>' . esc_html__( 'Each Daberau page is matched by its template or its URL. Matched pages use the Daberau layout automatically.', 'daberau' ) . '</p>';
	echo '<table class="widefat striped" style="max-width:760px"><thead><tr><th>' . esc_html__( 'Page', 'daberau' ) . '</th><th>' . esc_html__( 'Status', 'daberau' ) . '</th></tr></thead><tbody>';
	$front = 'page' === get_option( 'show_on_front' ) ? get_post( (int) get_option( 'page_on_front' ) ) : null;
	$rows  = array(
		array( __( 'Home (front page)', 'daberau' ), $front ),
		array( __( 'Services', 'daberau' ), daberau_find_page( 'services' ) ),
		array( __( 'About Us', 'daberau' ), daberau_find_page( 'about' ) ),
		array( __( 'How We Work', 'daberau' ), daberau_find_page( 'how-we-work' ) ),
		array( __( 'FAQ', 'daberau' ), daberau_find_page( 'faq' ) ),
		array( __( 'Contact', 'daberau' ), daberau_find_page( 'contact' ) ),
		array( __( 'Privacy Policy', 'daberau' ), daberau_find_page( 'legal', 'privacy-policy' ) ),
		array( __( 'Terms & Conditions', 'daberau' ), daberau_find_page( 'legal', 'terms-and-conditions' ) ),
	);
	foreach ( $rows as $row ) {
		$status = $row[1]
			? '✅ <a href="' . esc_url( get_permalink( $row[1] ) ) . '" target="_blank">' . esc_html( get_permalink( $row[1] ) ) . '</a> · <a href="' . esc_url( get_edit_post_link( $row[1] ) ) . '">' . esc_html__( 'Edit', 'daberau' ) . '</a>'
			: '⚠️ ' . esc_html__( 'Missing: click "Create missing content"', 'daberau' );
		echo '<tr><td>' . esc_html( $row[0] ) . '</td><td>' . $status . '</td></tr>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- escaped above.
	}
	echo '</tbody></table>';

	echo '<form method="post" style="margin-top:16px">';
	wp_nonce_field( 'daberau_setup' );
	echo '<p>';
	submit_button( __( 'Create missing content', 'daberau' ), 'primary', 'daberau_seed', false );
	echo ' <span class="description">' . esc_html__( 'Adds missing pages, services, FAQs and menus. Never changes content you edited.', 'daberau' ) . '</span></p>';

	echo '<h2>' . esc_html__( '2. Menus', 'daberau' ) . '</h2>';
	echo '<p>' . esc_html__( 'If the header shows links from your previous theme, replace them with the Daberau menus (About Us, How We Work, Contact; footer links). You can still edit them later in Appearance → Menus.', 'daberau' ) . '</p><p>';
	submit_button( __( 'Use Daberau menus', 'daberau' ), 'secondary', 'daberau_menus', false );
	echo '</p>';

	echo '<h2>' . esc_html__( '3. Contact form email', 'daberau' ) . '</h2>';
	echo '<p>' . sprintf(
		/* translators: %s: email address */
		esc_html__( 'Inquiries are sent to %s and always saved under Inquiries. Send a test to make sure email arrives. If it doesn\'t, enter your mailbox details in Customize → Daberau → Email delivery (no plugin needed).', 'daberau' ),
		'<strong>' . esc_html( daberau_mod( 'inquiry_email' ) ) . '</strong>'
	) . '</p><p>';
	submit_button( __( 'Send test email', 'daberau' ), 'secondary', 'daberau_test_email', false );
	echo ' <a class="button" href="' . esc_url( admin_url( 'customize.php?autofocus[section]=daberau_email' ) ) . '">' . esc_html__( 'Email delivery settings', 'daberau' ) . '</a></p>';
	echo '</form>';

	echo '<h2>' . esc_html__( 'Where to edit', 'daberau' ) . '</h2><ul style="list-style:disc;padding-left:20px">';
	$links = array(
		array( admin_url( 'edit.php?post_type=page' ), __( 'Pages: open a page and use the "Page content (Daberau)" box', 'daberau' ) ),
		array( admin_url( 'edit.php?post_type=daberau_service' ), __( 'Services: one entry per service page', 'daberau' ) ),
		array( admin_url( 'edit.php?post_type=daberau_faq' ), __( 'FAQs, grouped by FAQ Group', 'daberau' ) ),
		array( admin_url( 'customize.php?autofocus[panel]=daberau' ), __( 'Customizer → Daberau: phone, email, WhatsApp, address, CTA background, footer, social links', 'daberau' ) ),
		array( admin_url( 'nav-menus.php' ), __( 'Menus: header and footer links', 'daberau' ) ),
		array( admin_url( 'edit.php?post_type=daberau_inquiry' ), __( 'Inquiries: requests sent through the contact form', 'daberau' ) ),
	);
	foreach ( $links as $l ) {
		echo '<li><a href="' . esc_url( $l[0] ) . '">' . esc_html( $l[1] ) . '</a></li>';
	}
	echo '</ul><p class="description">' . esc_html__( 'No plugins are required. Page builders (e.g. Elementor) are not needed for Daberau pages.', 'daberau' ) . '</p></div>';
}

// After activation, point the admin to the setup page once.
add_action(
	'admin_notices',
	function () {
		if ( ! current_user_can( 'manage_options' ) || get_option( 'daberau_setup_seen' ) || ( isset( $_GET['page'] ) && 'daberau-setup' === $_GET['page'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
			return;
		}
		echo '<div class="notice notice-info"><p><strong>Daberau:</strong> ' . esc_html__( 'Check that all pages are connected and send a test email.', 'daberau' ) . ' <a class="button button-primary" href="' . esc_url( admin_url( 'themes.php?page=daberau-setup' ) ) . '">' . esc_html__( 'Open Daberau setup', 'daberau' ) . '</a></p></div>';
	}
);
add_action(
	'load-appearance_page_daberau-setup',
	function () {
		update_option( 'daberau_setup_seen', 1, false );
	}
);
