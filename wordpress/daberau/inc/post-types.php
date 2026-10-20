<?php
/**
 * Services, FAQs and contact-form inquiries.
 *
 * @package Daberau
 */

defined( 'ABSPATH' ) || exit;

add_action(
	'init',
	function () {
		register_post_type(
			'daberau_service',
			array(
				'labels'        => array(
					'name'          => __( 'Services', 'daberau' ),
					'singular_name' => __( 'Service', 'daberau' ),
					'add_new'       => __( 'Add New Service', 'daberau' ),
					'add_new_item'  => __( 'Add New Service', 'daberau' ),
					'edit_item'     => __( 'Edit Service', 'daberau' ),
					'all_items'     => __( 'All Services', 'daberau' ),
				),
				'public'        => true,
				'has_archive'   => false,
				'show_in_rest'  => false,
				'menu_icon'     => 'dashicons-screenoptions',
				'menu_position' => 21,
				'supports'      => array( 'title', 'thumbnail', 'page-attributes' ),
				'rewrite'       => array( 'slug' => 'services', 'with_front' => false ),
			)
		);

		register_post_type(
			'daberau_faq',
			array(
				'labels'              => array(
					'name'          => __( 'FAQs', 'daberau' ),
					'singular_name' => __( 'FAQ', 'daberau' ),
					'add_new'       => __( 'Add New Question', 'daberau' ),
					'add_new_item'  => __( 'Add New Question', 'daberau' ),
					'edit_item'     => __( 'Edit Question', 'daberau' ),
					'all_items'     => __( 'All FAQs', 'daberau' ),
				),
				'public'              => false,
				'show_ui'             => true,
				'show_in_rest'        => false,
				'exclude_from_search' => true,
				'menu_icon'           => 'dashicons-editor-help',
				'menu_position'       => 22,
				'supports'            => array( 'title', 'editor', 'page-attributes' ),
			)
		);

		register_taxonomy(
			'daberau_faq_group',
			'daberau_faq',
			array(
				'labels'            => array(
					'name'          => __( 'FAQ Groups', 'daberau' ),
					'singular_name' => __( 'FAQ Group', 'daberau' ),
				),
				'public'            => false,
				'show_ui'           => true,
				'show_admin_column' => true,
				'hierarchical'      => true,
				'description'       => __( 'Groups appear as sections on the FAQ page, in the order they were created. "Contact page" and "Services page" groups show on those pages instead.', 'daberau' ),
			)
		);

		register_post_type(
			'daberau_inquiry',
			array(
				'labels'          => array(
					'name'          => __( 'Inquiries', 'daberau' ),
					'singular_name' => __( 'Inquiry', 'daberau' ),
					'edit_item'     => __( 'Inquiry', 'daberau' ),
					'all_items'     => __( 'All Inquiries', 'daberau' ),
				),
				'public'          => false,
				'show_ui'         => true,
				'show_in_rest'    => false,
				'menu_icon'       => 'dashicons-email-alt',
				'menu_position'   => 23,
				'supports'        => array( 'title' ),
				'capability_type' => 'post',
				'capabilities'    => array( 'create_posts' => 'do_not_allow' ),
				'map_meta_cap'    => true,
			)
		);
	}
);

/** FAQ group slugs that belong to other pages, not the FAQ page. */
function daberau_page_faq_groups() {
	return array( 'contact-page', 'services-page' );
}

/**
 * FAQs in a group as [ [ 'q' => …, 'a' => html ] ].
 *
 * @param string $group Group slug.
 */
function daberau_faqs( $group ) {
	$posts = get_posts(
		array(
			'post_type'      => 'daberau_faq',
			'posts_per_page' => 100,
			'orderby'        => array( 'menu_order' => 'ASC', 'ID' => 'ASC' ),
			'no_found_rows'  => true,
			'tax_query'      => array( // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_tax_query
				array(
					'taxonomy' => 'daberau_faq_group',
					'field'    => 'slug',
					'terms'    => $group,
				),
			),
		)
	);
	$out   = array();
	foreach ( $posts as $p ) {
		$out[] = array( 'q' => get_the_title( $p ), 'a' => daberau_faq_answer( $p->post_content ) );
	}
	return $out;
}

/** Answer HTML: paragraphs, safe tags, and a linked company email. */
function daberau_faq_answer( $content ) {
	$html  = wp_kses_post( wpautop( trim( $content ) ) );
	$email = sanitize_email( daberau_mod( 'email' ) );
	if ( $email && false === strpos( $html, 'mailto:' ) ) {
		$html = str_replace( $email, '<a href="mailto:' . esc_attr( $email ) . '">' . esc_html( $email ) . '</a>', $html );
	}
	return $html;
}

/** FAQ page groups (term objects) in creation order. */
function daberau_faq_groups() {
	$terms = get_terms(
		array(
			'taxonomy'   => 'daberau_faq_group',
			'hide_empty' => true,
			'orderby'    => 'term_id',
			'exclude'    => array_filter(
				array_map(
					function ( $slug ) {
						$t = get_term_by( 'slug', $slug, 'daberau_faq_group' );
						return $t ? $t->term_id : 0;
					},
					daberau_page_faq_groups()
				)
			),
		)
	);
	return is_wp_error( $terms ) ? array() : $terms;
}

/* Inquiry details meta box (read-only). */
add_action(
	'add_meta_boxes_daberau_inquiry',
	function () {
		add_meta_box(
			'daberau_inquiry_details',
			__( 'Details', 'daberau' ),
			function ( $post ) {
				$labels = daberau_inquiry_labels();
				echo '<table class="widefat striped"><tbody>';
				foreach ( $labels as $key => $label ) {
					$value = get_post_meta( $post->ID, '_inquiry_' . $key, true );
					if ( '' === $value ) {
						continue;
					}
					if ( 'email' === $key ) {
						$value = '<a href="mailto:' . esc_attr( $value ) . '">' . esc_html( $value ) . '</a>';
					} elseif ( 'attachment' === $key ) {
						$value = '<a href="' . esc_url( $value ) . '" target="_blank" rel="noopener">' . esc_html( wp_basename( $value ) ) . '</a>';
					} else {
						$value = nl2br( esc_html( $value ) );
					}
					echo '<tr><th style="width:180px">' . esc_html( $label ) . '</th><td>' . $value . '</td></tr>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- escaped above.
				}
				echo '</tbody></table>';
			},
			'daberau_inquiry',
			'normal',
			'high'
		);
	}
);

/** Inquiry field labels. */
function daberau_inquiry_labels() {
	$f = daberau_default( 'leadForm.fields' );
	return array(
		'name'       => $f['name']['label'],
		'company'    => $f['company']['label'],
		'email'      => $f['email']['label'],
		'whatsapp'   => $f['whatsapp']['label'],
		'service'    => $f['service']['label'],
		'budget'     => $f['budget']['label'],
		'timeline'   => $f['timeline']['label'],
		'message'    => $f['message']['label'],
		'attachment' => __( 'Attachment', 'daberau' ),
		'page'       => __( 'Sent from', 'daberau' ),
	);
}

add_filter(
	'manage_daberau_inquiry_posts_columns',
	function ( $cols ) {
		return array(
			'cb'      => $cols['cb'],
			'title'   => __( 'Name', 'daberau' ),
			'email'   => __( 'Email', 'daberau' ),
			'service' => __( 'Service', 'daberau' ),
			'date'    => $cols['date'],
		);
	}
);
add_action(
	'manage_daberau_inquiry_posts_custom_column',
	function ( $col, $post_id ) {
		if ( in_array( $col, array( 'email', 'service' ), true ) ) {
			echo esc_html( get_post_meta( $post_id, '_inquiry_' . $col, true ) );
		}
	},
	10,
	2
);

/* Services list: show the short description. */
add_filter(
	'manage_daberau_service_posts_columns',
	function ( $cols ) {
		$cols['short'] = __( 'Short description', 'daberau' );
		return $cols;
	}
);
add_action(
	'manage_daberau_service_posts_custom_column',
	function ( $col, $post_id ) {
		if ( 'short' === $col ) {
			$f = daberau_fields( $post_id, 'service' );
			echo esc_html( $f['short'] );
		}
	},
	10,
	2
);
