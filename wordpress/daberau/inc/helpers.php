<?php
/**
 * Small rendering and data helpers shared by all templates.
 *
 * @package Daberau
 */

defined( 'ABSPATH' ) || exit;

/**
 * Default content exported from the design source (inc/defaults.json).
 *
 * @param string|null $path Dot path, e.g. "home.hero.h1".
 * @param mixed       $fallback Returned when the path doesn't exist.
 * @return mixed
 */
function daberau_default( $path = null, $fallback = '' ) {
	static $data = null;
	if ( null === $data ) {
		$json = file_get_contents( DABERAU_DIR . '/inc/defaults.json' ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
		$data = json_decode( (string) $json, true );
		$data = is_array( $data ) ? $data : array();
	}
	if ( null === $path ) {
		return $data;
	}
	$node = $data;
	foreach ( explode( '.', $path ) as $key ) {
		if ( is_array( $node ) && array_key_exists( $key, $node ) ) {
			$node = $node[ $key ];
		} else {
			return $fallback;
		}
	}
	return $node;
}

/**
 * Inline SVG icon (Lucide). Decorative by default.
 *
 * @param string $name  Icon key from inc/icons.php.
 * @param string $class CSS classes.
 * @param array  $args  Optional: stroke (float), label (string, makes the icon non-decorative).
 */
function daberau_icon( $name, $class = 'h-5 w-5', $args = array() ) {
	static $icons = null;
	if ( null === $icons ) {
		$icons = require DABERAU_DIR . '/inc/icons.php';
	}
	if ( empty( $icons['ui'][ $name ] ) ) {
		return '';
	}
	$stroke = isset( $args['stroke'] ) ? (float) $args['stroke'] : 2;
	$a11y   = ! empty( $args['label'] ) ? 'role="img" aria-label="' . esc_attr( $args['label'] ) . '"' : 'aria-hidden="true"';
	return sprintf(
		'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="%s" stroke-linecap="round" stroke-linejoin="round" class="%s" %s focusable="false">%s</svg>',
		esc_attr( $stroke ),
		esc_attr( $class ),
		$a11y,
		$icons['ui'][ $name ] // Trusted, generated markup.
	);
}

/**
 * Official brand logo (Simple Icons) in its brand color, or a generic code icon.
 *
 * @param string $name  Product name, e.g. "Next.js".
 * @param string $class CSS classes.
 */
function daberau_brand_logo( $name, $class = 'h-6 w-6' ) {
	static $icons = null;
	if ( null === $icons ) {
		$icons = require DABERAU_DIR . '/inc/icons.php';
	}
	$key = strtolower( trim( $name ) );
	if ( empty( $icons['brands'][ $key ] ) ) {
		return daberau_icon( 'code', $class . ' text-neutral-500' );
	}
	$icon = $icons['brands'][ $key ];
	return sprintf(
		'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="%s" fill="#%s" aria-hidden="true" focusable="false"><path d="%s"/></svg>',
		esc_attr( $class ),
		esc_attr( $icon['hex'] ),
		esc_attr( $icon['path'] )
	);
}

/**
 * Escapes a heading and renders *marked words* in brand red.
 *
 * @param string $text e.g. "Does this sound like *your business?*".
 */
function daberau_accent( $text ) {
	return preg_replace( '/\*([^*]+)\*/', '<span class="text-brand">$1</span>', esc_html( $text ) );
}

/**
 * Escapes text and links the company email address.
 *
 * @param string $text Plain text.
 */
function daberau_linkify( $text ) {
	$email = sanitize_email( daberau_mod( 'email' ) );
	$html  = esc_html( $text );
	if ( $email ) {
		$html = str_replace(
			esc_html( $email ),
			'<a href="mailto:' . esc_attr( $email ) . '" class="font-medium text-brand underline underline-offset-2 hover:text-brand-700">' . esc_html( $email ) . '</a>',
			$html
		);
	}
	return $html;
}

/**
 * Parses "one item per line" text, optionally split into columns with "|".
 *
 * @param string|array $value Raw field value (or an already-parsed array).
 * @param string[]     $keys  Column names; empty to return plain strings.
 * @return array
 */
function daberau_lines( $value, $keys = array() ) {
	if ( is_array( $value ) ) {
		return $value;
	}
	$out = array();
	foreach ( preg_split( '/\r\n|\r|\n/', (string) $value ) as $line ) {
		$line = trim( $line );
		if ( '' === $line ) {
			continue;
		}
		if ( ! $keys ) {
			$out[] = $line;
			continue;
		}
		$cols = array_map( 'trim', explode( '|', $line, count( $keys ) ) );
		$row  = array();
		foreach ( $keys as $i => $key ) {
			$row[ $key ] = isset( $cols[ $i ] ) ? $cols[ $i ] : '';
		}
		$out[] = $row;
	}
	return $out;
}

/**
 * Turns an array of rows into "a | b | c" lines (inverse of daberau_lines).
 *
 * @param array    $rows Rows (arrays) or strings.
 * @param string[] $keys Column names to read from each row.
 */
function daberau_to_lines( $rows, $keys = array() ) {
	$lines = array();
	foreach ( (array) $rows as $row ) {
		if ( ! $keys || ! is_array( $row ) ) {
			$lines[] = is_array( $row ) ? implode( ' | ', $row ) : (string) $row;
			continue;
		}
		$cols = array();
		foreach ( $keys as $key ) {
			$cols[] = isset( $row[ $key ] ) ? $row[ $key ] : '';
		}
		$lines[] = rtrim( implode( ' | ', $cols ), ' |' );
	}
	return implode( "\n", $lines );
}

/**
 * Daberau page types: kind => [ template file, slugs recognised without a template ].
 *
 * Pages are matched by their template first, then by URL slug. That way existing pages
 * (e.g. a "Contact" page from a previous theme) get the Daberau layout without any setup.
 */
function daberau_page_kinds() {
	return array(
		'services'    => array( 'page-templates/template-services.php', array( 'services', 'layanan' ) ),
		'about'       => array( 'page-templates/template-about.php', array( 'about-us', 'about', 'tentang-kami' ) ),
		'how-we-work' => array( 'page-templates/template-how-we-work.php', array( 'how-we-work', 'cara-kerja' ) ),
		'faq'         => array( 'page-templates/template-faq.php', array( 'faq', 'faqs' ) ),
		'contact'     => array( 'page-templates/template-contact.php', array( 'contact', 'contact-us', 'kontak', 'hubungi-kami' ) ),
		'legal'       => array( 'page-templates/template-legal.php', array( 'privacy-policy', 'terms-and-conditions', 'terms', 'kebijakan-privasi', 'syarat-dan-ketentuan' ) ),
	);
}

/**
 * Daberau page type of a page ('' when it is a normal page).
 *
 * @param int|WP_Post|null $post Page.
 */
function daberau_page_kind( $post = null ) {
	$post = get_post( $post );
	if ( ! $post || 'page' !== $post->post_type ) {
		return '';
	}
	$template = get_page_template_slug( $post );
	foreach ( daberau_page_kinds() as $kind => $def ) {
		if ( $template === $def[0] ) {
			return $kind;
		}
	}
	foreach ( daberau_page_kinds() as $kind => $def ) {
		if ( in_array( $post->post_name, $def[1], true ) ) {
			return $kind;
		}
	}
	return '';
}

/**
 * The published page for a page type, if any.
 *
 * @param string $kind Page type.
 * @param string $slug Prefer this slug (used for the two legal pages).
 * @return WP_Post|null
 */
function daberau_find_page( $kind, $slug = '' ) {
	static $cache = array();
	$key = $kind . '|' . $slug;
	if ( array_key_exists( $key, $cache ) ) {
		return $cache[ $key ];
	}
	$def   = daberau_page_kinds()[ $kind ];
	$found = null;
	$slugs = $slug ? array( $slug ) : $def[1];
	if ( ! $slug ) {
		$pages = get_pages(
			array(
				'meta_key'   => '_wp_page_template', // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_key
				'meta_value' => $def[0], // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_value
				'number'     => 1,
			)
		);
		$found = $pages ? $pages[0] : null;
	}
	foreach ( $slugs as $s ) {
		if ( $found ) {
			break;
		}
		$page = get_page_by_path( $s );
		if ( $page && 'publish' === $page->post_status ) {
			$found = $page;
		}
	}
	$cache[ $key ] = $found;
	return $found;
}

/** Common page URLs. */
function daberau_url( $key ) {
	if ( 'form' === $key ) {
		return daberau_url( 'contact' ) . '#contact-form';
	}
	$map = array(
		'services'    => array( 'services', '', 'services' ),
		'about'       => array( 'about', '', 'about-us' ),
		'how-we-work' => array( 'how-we-work', '', 'how-we-work' ),
		'faq'         => array( 'faq', '', 'faq' ),
		'contact'     => array( 'contact', '', 'contact' ),
		'privacy'     => array( 'legal', 'privacy-policy', 'privacy-policy' ),
		'terms'       => array( 'legal', 'terms-and-conditions', 'terms-and-conditions' ),
	);
	if ( ! isset( $map[ $key ] ) ) {
		return home_url( '/' );
	}
	$page = daberau_find_page( $map[ $key ][0], $map[ $key ][1] );
	if ( ! $page && 'terms' === $key ) {
		$page = daberau_find_page( 'legal', 'terms' );
	}
	return $page ? get_permalink( $page ) : home_url( '/' . $map[ $key ][2] . '/' );
}

/** WhatsApp chat URL with the prefilled message (and the business number once it is set). */
function daberau_whatsapp_url() {
	$number  = preg_replace( '/\D+/', '', (string) daberau_mod( 'whatsapp_number' ) );
	$message = rawurlencode( (string) daberau_mod( 'whatsapp_message' ) );
	return $number ? "https://wa.me/{$number}?text={$message}" : "https://wa.me/?text={$message}";
}

/** Theme asset URL. */
function daberau_asset( $path ) {
	return DABERAU_URI . '/assets/' . ltrim( $path, '/' );
}

/**
 * Button or link styled as a button.
 *
 * @param string $href    URL.
 * @param string $label   Label (escaped here).
 * @param string $variant primary|secondary|inverse.
 * @param string $size    md|lg|sm.
 * @param array  $args    Optional: class, external (bool), icon (html prepended), attrs (static attribute string).
 */
function daberau_button( $href, $label, $variant = 'primary', $size = 'md', $args = array() ) {
	$variants = array(
		'primary'   => 'bg-brand text-white hover:bg-brand-700',
		'secondary' => 'border border-neutral-300 bg-white text-ink hover:border-ink',
		'inverse'   => 'border border-white/30 bg-transparent text-white hover:bg-white/10',
	);
	$sizes    = array(
		'sm' => 'min-h-9 px-3.5 py-1.5 text-sm',
		'md' => 'min-h-11 px-5 py-2 text-[15px]',
		'lg' => 'min-h-12 px-6 py-2.5 text-base',
	);
	$class    = 'btn inline-flex items-center justify-center gap-2 rounded-btn font-semibold text-center leading-snug transition-colors duration-200 sm:whitespace-nowrap ' . $variants[ $variant ] . ' ' . $sizes[ $size ] . ( empty( $args['class'] ) ? '' : ' ' . $args['class'] );
	$external = ! empty( $args['external'] ) ? ' target="_blank" rel="noopener noreferrer"' : '';
	$icon     = isset( $args['icon'] ) ? $args['icon'] : '';
	$attrs    = isset( $args['attrs'] ) ? ' ' . $args['attrs'] : '';
	return '<a href="' . esc_url( $href ) . '" class="' . esc_attr( $class ) . '"' . $external . $attrs . '>' . $icon . esc_html( $label ) . '</a>';
}

/** Inline style for staggered scroll reveal. */
function daberau_delay( $ms ) {
	return ' style="--reveal-delay:' . (int) $ms . 'ms"';
}

/**
 * Section headline + subheadline with an eyebrow label.
 *
 * @param array $args id, eyebrow, title, sub, class.
 */
function daberau_section_heading( $args ) {
	$args = wp_parse_args( $args, array( 'id' => '', 'eyebrow' => '', 'title' => '', 'sub' => '', 'class' => '' ) );
	get_template_part( 'template-parts/section-heading', null, $args );
}

/**
 * Opening tag of a standard section (white or muted) and its inner container.
 *
 * @param string $labelled_by Heading id.
 * @param string $tone        white|muted.
 * @param string $extra       Extra attributes (e.g. id="…").
 */
function daberau_section_open( $labelled_by = '', $tone = 'white', $extra = '' ) {
	$bg = 'muted' === $tone ? 'bg-neutral-50 border-y border-neutral-200/70' : 'bg-white';
	printf(
		'<section %s class="py-16 md:py-24 %s" %s><div class="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">',
		$labelled_by ? 'aria-labelledby="' . esc_attr( $labelled_by ) . '"' : '',
		esc_attr( $bg ),
		$extra // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- static attributes from templates.
	);
}

/** Closes daberau_section_open(). */
function daberau_section_close() {
	echo '</div></section>';
}

/**
 * Splits document HTML at each <h2> into an intro and numbered sections.
 *
 * @param string $html Rendered post content.
 * @return array { intro: string, sections: [ { id, title, html } ] }
 */
function daberau_legal_sections( $html ) {
	$parts = preg_split( '/(<h2\b[^>]*>.*?<\/h2>)/is', $html, -1, PREG_SPLIT_DELIM_CAPTURE );
	$doc   = array( 'intro' => array_shift( $parts ), 'sections' => array() );
	$used  = array();
	for ( $i = 0; $i < count( $parts ); $i += 2 ) { // phpcs:ignore Generic.CodeAnalysis.ForLoopWithTestFunctionCall.NotAllowed
		$title = trim( wp_strip_all_tags( $parts[ $i ] ) );
		$id    = preg_match( '/\bid="([^"]+)"/', $parts[ $i ], $m ) ? sanitize_title( $m[1] ) : sanitize_title( $title );
		$id    = $id ? $id : 'section-' . ( count( $doc['sections'] ) + 1 );
		while ( isset( $used[ $id ] ) ) {
			$id .= '-2';
		}
		$used[ $id ]       = true;
		$doc['sections'][] = array(
			'id'    => $id,
			'title' => $title,
			'html'  => isset( $parts[ $i + 1 ] ) ? $parts[ $i + 1 ] : '',
		);
	}
	return $doc;
}

// [daberau_cookie_settings] — button that reopens the cookie preferences dialog.
add_shortcode(
	'daberau_cookie_settings',
	function () {
		return '<button type="button" data-cookie-open class="btn inline-flex min-h-9 items-center justify-center rounded-btn border border-neutral-300 bg-white px-3.5 py-1.5 text-sm font-semibold text-ink transition-colors hover:border-ink">' . esc_html( daberau_default( 'legalUi.managePrefs' ) ) . '</button>';
	}
);
