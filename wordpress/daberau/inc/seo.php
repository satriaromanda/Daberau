<?php
/**
 * Titles, meta descriptions, social tags and structured data.
 * Steps aside when Yoast SEO or Rank Math is active.
 *
 * @package Daberau
 */

defined( 'ABSPATH' ) || exit;

/** Whether an SEO plugin handles titles and meta tags. */
function daberau_seo_plugin_active() {
	return defined( 'WPSEO_VERSION' ) || class_exists( 'RankMath' ) || defined( 'AIOSEO_VERSION' );
}

/** SEO title and description for the current request: [ title, description ]. */
function daberau_seo() {
	static $seo = null;
	if ( null !== $seo ) {
		return $seo;
	}
	$seo = array( '', '' );
	if ( is_404() ) {
		$seo = array( daberau_default( 'meta.notFound.title' ), daberau_default( 'meta.notFound.description' ) );
	} elseif ( is_singular() ) {
		$post = get_queried_object();
		if ( $post instanceof WP_Post && daberau_schema_key( $post ) ) {
			$f   = daberau_fields( $post );
			$seo = array( $f['meta_title'], $f['meta_description'] );
		} elseif ( $post instanceof WP_Post ) {
			$seo = array( '', has_excerpt( $post ) ? get_the_excerpt( $post ) : wp_trim_words( wp_strip_all_tags( $post->post_content ), 28 ) );
		}
	}
	return $seo;
}

add_filter(
	'pre_get_document_title',
	function ( $title ) {
		if ( daberau_seo_plugin_active() ) {
			return $title;
		}
		$seo = daberau_seo();
		return $seo[0] ? esc_html( $seo[0] ) : $title;
	},
	20
);

add_action(
	'wp_head',
	function () {
		if ( daberau_seo_plugin_active() ) {
			return;
		}
		list( $title, $description ) = daberau_seo();
		$title = $title ? $title : wp_get_document_title();
		$url   = is_singular() ? get_permalink() : home_url( add_query_arg( array() ) );
		$image = daberau_asset( 'images/og-image.png' );
		if ( is_singular() && has_post_thumbnail() ) {
			$image = get_the_post_thumbnail_url( null, 'large' );
		}
		if ( $description ) {
			echo '<meta name="description" content="' . esc_attr( $description ) . '">' . "\n";
		}
		if ( is_singular() ) {
			echo '<link rel="canonical" href="' . esc_url( $url ) . '">' . "\n";
		}
		$og = array(
			'og:type'        => 'website',
			'og:site_name'   => get_bloginfo( 'name' ),
			'og:title'       => $title,
			'og:description' => $description,
			'og:url'         => $url,
			'og:image'       => $image,
		);
		foreach ( array_filter( $og ) as $prop => $content ) {
			echo '<meta property="' . esc_attr( $prop ) . '" content="' . esc_attr( $content ) . '">' . "\n";
		}
		echo '<meta name="twitter:card" content="summary_large_image">' . "\n";
	},
	3
);

// WordPress prints its own canonical for singular pages; avoid a duplicate.
add_action(
	'wp',
	function () {
		if ( ! daberau_seo_plugin_active() ) {
			remove_action( 'wp_head', 'rel_canonical' );
		}
	}
);

/**
 * Prints a JSON-LD script.
 *
 * @param array $data Structured data.
 */
function daberau_json_ld( $data ) {
	echo '<script type="application/ld+json">' . wp_json_encode( $data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE ) . '</script>' . "\n";
}

add_action(
	'wp_footer',
	function () {
		$address = daberau_mod( 'address' );
		daberau_json_ld(
			array(
				'@context'  => 'https://schema.org',
				'@type'     => array( 'Organization', 'LocalBusiness' ),
				'name'      => get_bloginfo( 'name' ),
				'legalName' => daberau_mod( 'legal_name' ),
				'url'       => home_url( '/' ),
				'email'     => daberau_mod( 'email' ),
				'telephone' => daberau_mod( 'phone' ),
				'logo'      => daberau_asset( 'images/logo-daberau.png' ),
				'address'   => array(
					'@type'           => 'PostalAddress',
					'streetAddress'   => $address,
					'addressCountry'  => 'ID',
				),
			)
		);
	}
);
