<?php
/**
 * Editable content fields for pages and services, shown as a "Page content" meta box.
 *
 * Every field falls back to the default copy (inc/defaults.json) when left empty, so a fresh install
 * looks complete and editors only change what they need. "Lines" fields take one item per line, with
 * columns separated by "|". Wrap words in *asterisks* in headlines to show them in brand red.
 *
 * @package Daberau
 */

defined( 'ABSPATH' ) || exit;

/** Icon keys editors can use in "icon" columns. */
function daberau_icon_keys() {
	return 'globe, smartphone, pen, cloud, wrench, compass, search-x, spreadsheet, server-crash, signpost, messages, file-text, code, rocket, life-buoy, users, receipt, chart, shield, store, factory, truck, stethoscope, graduation, landmark';
}

/** Field helpers: [ label, type, default, hint ]. */
function daberau_f_text( $label, $default ) {
	return array( $label, 'text', $default, '' );
}
function daberau_f_area( $label, $default ) {
	return array( $label, 'textarea', $default, '' );
}
function daberau_f_lines( $label, $rows, $keys = array() ) {
	$hint = $keys ? sprintf( /* translators: %s: column names */ __( 'One per line. Columns: %s', 'daberau' ), implode( ' | ', $keys ) ) : __( 'One per line.', 'daberau' );
	if ( in_array( 'icon', $keys, true ) ) {
		$hint .= ' — ' . __( 'icons:', 'daberau' ) . ' ' . daberau_icon_keys();
	}
	return array( $label, 'lines', daberau_to_lines( $rows, $keys ), $hint );
}
function daberau_f_image( $label, $default ) {
	return array( $label, 'image', $default, __( 'Image URL. Use "Choose image" to pick from the Media Library.', 'daberau' ) );
}
function daberau_f_seo( $title, $description ) {
	return array(
		'meta_title'       => daberau_f_text( __( 'SEO title', 'daberau' ), $title ),
		'meta_description' => daberau_f_area( __( 'SEO description', 'daberau' ), $description ),
	);
}

/**
 * Sections each page type can show or hide: schema => [ section key => label ].
 * Each becomes a "show_{key}" checkbox (on by default) at the top of the "Page content" box.
 */
function daberau_section_toggles() {
	return array(
		'home'        => array( 'pain' => __( 'Pain points', 'daberau' ), 'services' => __( 'Services', 'daberau' ), 'industries' => __( 'Industries', 'daberau' ), 'why' => __( 'Why Daberau', 'daberau' ), 'process' => __( 'Process', 'daberau' ) ),
		'services'    => array( 'grid' => __( 'Service grid', 'daberau' ), 'bundled' => __( 'Bundled services', 'daberau' ), 'tech' => __( 'Tech stack', 'daberau' ), 'faq' => __( 'FAQ', 'daberau' ) ),
		'industries'  => array( 'closing' => __( '"Don\'t see your industry?"', 'daberau' ) ),
		'about'       => array( 'story' => __( 'Our story', 'daberau' ), 'vm' => __( 'Vision & mission', 'daberau' ), 'values' => __( 'Values', 'daberau' ), 'team' => __( 'Team', 'daberau' ), 'numbers' => __( 'Numbers', 'daberau' ) ),
		'how-we-work' => array( 'stages' => __( 'Stages', 'daberau' ), 'models' => __( 'Engagement models', 'daberau' ), 'warranty' => __( 'Warranty & SLA', 'daberau' ), 'tools' => __( 'Tools', 'daberau' ) ),
		'contact'     => array( 'options' => __( 'Contact options', 'daberau' ), 'map' => __( 'Map', 'daberau' ), 'faq' => __( 'FAQ', 'daberau' ) ),
		'service'     => array( 'problem' => __( 'Problem', 'daberau' ), 'deliver' => __( 'What we deliver', 'daberau' ), 'benefits' => __( 'Benefits', 'daberau' ), 'process' => __( 'Process', 'daberau' ), 'tech' => __( 'Tech stack', 'daberau' ), 'faq' => __( 'FAQ', 'daberau' ), 'related' => __( 'Related services', 'daberau' ) ),
	);
}

/**
 * Field schema for a page or service: [ group title => [ key => field ] ], with the
 * "Show sections" checkboxes first.
 *
 * @param string  $schema Schema key.
 * @param WP_Post $post   Post being edited (used for per-post defaults).
 */
function daberau_schema( $schema, $post = null ) {
	$groups  = daberau_schema_groups( $schema, $post );
	$toggles = daberau_section_toggles();
	if ( empty( $toggles[ $schema ] ) ) {
		return $groups;
	}
	$fields = array();
	foreach ( $toggles[ $schema ] as $key => $label ) {
		$fields[ 'show_' . $key ] = array( $label, 'toggle', '1', '' );
	}
	return array_merge( array( __( 'Show sections', 'daberau' ) => $fields ), $groups );
}

/**
 * Whether a section is switched on in the "Show sections" box.
 *
 * @param array  $f   Values from daberau_fields().
 * @param string $key Section key.
 */
function daberau_show( $f, $key ) {
	return ! isset( $f[ 'show_' . $key ] ) || '0' !== (string) $f[ 'show_' . $key ];
}

/**
 * Content fields for a page or service, grouped.
 *
 * @param string  $schema Schema key.
 * @param WP_Post $post   Post being edited.
 */
function daberau_schema_groups( $schema, $post = null ) {
	$d  = 'daberau_default';
	$eb = $d( 'eyebrows' );
	switch ( $schema ) {
		case 'home':
			$h = $d( 'home' );
			return array(
				__( 'Hero', 'daberau' )             => array(
					'hero_eyebrow'   => daberau_f_text( __( 'Label above headline', 'daberau' ), $h['hero']['eyebrow'] ),
					'hero_h1'        => daberau_f_text( __( 'Headline (H1)', 'daberau' ), $h['hero']['h1'] ),
					'hero_sub'       => daberau_f_area( __( 'Subheadline', 'daberau' ), $h['hero']['sub'] ),
					'hero_primary'   => daberau_f_text( __( 'Primary button label', 'daberau' ), $h['hero']['primary']['label'] ),
					'hero_secondary' => daberau_f_text( __( 'Secondary button label', 'daberau' ), $h['hero']['secondary']['label'] ),
					'hero_micro'     => daberau_f_text( __( 'Text under buttons', 'daberau' ), $h['hero']['micro'] ),
					'hero_image'     => daberau_f_image( __( 'Hero image', 'daberau' ), daberau_asset( 'images/hero-dashboard.webp' ) ),
					'hero_image_alt' => daberau_f_text( __( 'Hero image description (alt text)', 'daberau' ), $h['hero']['image']['alt'] ),
				),
				__( 'Pain points', 'daberau' )      => array(
					'pain_eyebrow' => daberau_f_text( __( 'Label', 'daberau' ), $eb['home']['pain'] ),
					'pain_title'   => daberau_f_text( __( 'Headline', 'daberau' ), $h['pain']['title'] ),
					'pain_sub'     => daberau_f_text( __( 'Subheadline', 'daberau' ), $h['pain']['sub'] ),
					'pain_cards'   => daberau_f_lines( __( 'Cards', 'daberau' ), $h['pain']['cards'], array( 'icon', 'title', 'body' ) ),
					'pain_closing' => daberau_f_text( __( 'Closing line', 'daberau' ), $h['pain']['closing'] ),
				),
				__( 'Services', 'daberau' )         => array(
					'services_eyebrow' => daberau_f_text( __( 'Label', 'daberau' ), $eb['home']['services'] ),
					'services_title'   => daberau_f_text( __( 'Headline', 'daberau' ), $h['services']['title'] ),
					'services_sub'     => daberau_f_area( __( 'Subheadline', 'daberau' ), $h['services']['sub'] ),
					'services_cta'     => daberau_f_text( __( 'Button label', 'daberau' ), $h['services']['cta']['label'] ),
				),
				__( 'Industries', 'daberau' )       => array(
					'industries_eyebrow' => daberau_f_text( __( 'Label', 'daberau' ), $eb['home']['industries'] ),
					'industries_title'   => daberau_f_text( __( 'Headline (industries come from Industries)', 'daberau' ), $d( 'industriesPage.home.title' ) ),
					'industries_sub'     => daberau_f_text( __( 'Subheadline', 'daberau' ), $d( 'industriesPage.home.sub' ) ),
					'industries_link'    => daberau_f_text( __( 'Link label', 'daberau' ), $d( 'industriesPage.home.link' ) ),
				),
				__( 'Why Daberau', 'daberau' )      => array(
					'why_eyebrow' => daberau_f_text( __( 'Label', 'daberau' ), $eb['home']['why'] ),
					'why_title'   => daberau_f_text( __( 'Headline', 'daberau' ), $h['why']['title'] ),
					'why_sub'     => daberau_f_area( __( 'Subheadline', 'daberau' ), $h['why']['sub'] ),
					'why_points'  => daberau_f_lines( __( 'Points', 'daberau' ), $h['why']['points'], array( 'icon', 'title', 'body' ) ),
				),
				__( 'Process', 'daberau' )          => array(
					'process_eyebrow' => daberau_f_text( __( 'Label', 'daberau' ), $eb['home']['process'] ),
					'process_title'   => daberau_f_text( __( 'Headline', 'daberau' ), $h['process']['title'] ),
					'process_sub'     => daberau_f_area( __( 'Subheadline', 'daberau' ), $h['process']['sub'] ),
					'process_steps'   => daberau_f_lines( __( 'Steps', 'daberau' ), $d( 'processSteps' ), array( 'icon', 'title', 'body' ) ),
					'process_link'    => daberau_f_text( __( 'Link label', 'daberau' ), $h['process']['link']['label'] ),
				),
				__( 'SEO', 'daberau' )              => daberau_f_seo( $d( 'meta.home.title' ), $d( 'meta.home.description' ) ),
			);

		case 'services':
			$o = $d( 'servicesOverview' );
			return array(
				__( 'Hero', 'daberau' )        => array(
					'hero_h1'  => daberau_f_text( __( 'Headline (H1)', 'daberau' ), $o['hero']['h1'] ),
					'hero_sub' => daberau_f_area( __( 'Subheadline', 'daberau' ), $o['hero']['sub'] ),
				),
				__( 'Service grid', 'daberau' ) => array(
					'grid_eyebrow' => daberau_f_text( __( 'Label', 'daberau' ), $eb['servicesOverview']['grid'] ),
					'grid_title'   => daberau_f_text( __( 'Headline', 'daberau' ), $o['grid']['title'] ),
					'grid_sub'     => daberau_f_text( __( 'Subheadline', 'daberau' ), $o['grid']['sub'] ),
				),
				__( 'Bundled services', 'daberau' ) => array(
					'bundled_title' => daberau_f_text( __( 'Headline', 'daberau' ), $o['bundled']['title'] ),
					'bundled_sub'   => daberau_f_area( __( 'Text', 'daberau' ), $o['bundled']['sub'] ),
				),
				__( 'Tech stack', 'daberau' )   => array(
					'tech_eyebrow' => daberau_f_text( __( 'Label', 'daberau' ), $eb['servicesOverview']['tech'] ),
					'tech_title'   => daberau_f_text( __( 'Headline', 'daberau' ), $o['tech']['title'] ),
					'tech_sub'     => daberau_f_text( __( 'Subheadline', 'daberau' ), $o['tech']['sub'] ),
					'tech_items'   => daberau_f_lines( __( 'Technologies', 'daberau' ), $o['tech']['items'] ),
				),
				__( 'FAQ', 'daberau' )          => array(
					'faq_eyebrow' => daberau_f_text( __( 'Label', 'daberau' ), $eb['servicesOverview']['faq'] ),
					'faq_title'   => daberau_f_text( __( 'Headline', 'daberau' ), $o['faqTitle'] ),
					'faq_sub'     => daberau_f_text( __( 'Subheadline (questions come from FAQs → "Services page")', 'daberau' ), $o['faqSub'] ),
				),
				__( 'SEO', 'daberau' )          => daberau_f_seo( $d( 'meta.services.title' ), $d( 'meta.services.description' ) ),
			);

		case 'industries':
			$p = $d( 'industriesPage' );
			return array(
				__( 'Hero', 'daberau' )    => array(
					'hero_h1'  => daberau_f_text( __( 'Headline (H1)', 'daberau' ), $p['h1'] ),
					'hero_sub' => daberau_f_area( __( 'Subheadline', 'daberau' ), $p['sub'] ),
				),
				__( 'Labels', 'daberau' )  => array(
					'label_challenges' => daberau_f_text( __( 'Challenges label', 'daberau' ), $p['labels']['challenges'] ),
					'label_services'   => daberau_f_text( __( 'Services label', 'daberau' ), $p['labels']['services'] ),
					'label_cta'        => daberau_f_text( __( 'Link label ([industry] = industry name)', 'daberau' ), $p['labels']['cta'] ),
				),
				__( 'Closing', 'daberau' ) => array(
					'closing_title' => daberau_f_text( __( 'Headline', 'daberau' ), $p['closing']['title'] ),
					'closing_body'  => daberau_f_area( __( 'Text', 'daberau' ), $p['closing']['body'] ),
				),
				__( 'SEO', 'daberau' )     => daberau_f_seo( $p['meta']['title'], $p['meta']['description'] ),
			);

		case 'industry':
			$i = daberau_default_industry( $post ? $post->post_name : '' );
			return array(
				__( 'Industry', 'daberau' ) => array(
					'icon'       => array( __( 'Icon', 'daberau' ), 'text', $i['icon'], __( 'One of:', 'daberau' ) . ' ' . daberau_icon_keys() ),
					'title'      => daberau_f_text( __( 'Headline', 'daberau' ), $i['title'] ),
					'body'       => daberau_f_area( __( 'Description', 'daberau' ), $i['body'] ),
					'challenges' => daberau_f_lines( __( 'Challenges', 'daberau' ), $i['challenges'], array( 'title', 'body' ) ),
					'services'   => array( __( 'Services (slugs)', 'daberau' ), 'lines', implode( "\n", $i['services'] ), __( 'One per line, e.g. web-development, app-development, ui-ux-design, cloud-infrastructure, it-support, it-consulting', 'daberau' ) ),
				),
			);

		case 'about':
			$a = $d( 'about' );
			return array(
				__( 'Hero', 'daberau' )             => array(
					'hero_h1'        => daberau_f_text( __( 'Headline (H1)', 'daberau' ), $a['hero']['h1'] ),
					'hero_sub'       => daberau_f_area( __( 'Subheadline', 'daberau' ), $a['hero']['sub'] ),
					'hero_image'     => daberau_f_image( __( 'Hero photo', 'daberau' ), daberau_asset( 'images/services/it-consulting.webp' ) ),
					'hero_image_alt' => daberau_f_text( __( 'Photo description (alt text)', 'daberau' ), $a['heroImage']['alt'] ),
				),
				__( 'Our story', 'daberau' )        => array(
					'story_eyebrow'    => daberau_f_text( __( 'Label', 'daberau' ), $eb['about']['story'] ),
					'story_title'      => daberau_f_text( __( 'Headline', 'daberau' ), $a['story']['title'] ),
					'story_sub'        => daberau_f_text( __( 'Subheadline', 'daberau' ), $a['story']['sub'] ),
					'story_paragraphs' => daberau_f_lines( __( 'Paragraphs', 'daberau' ), array( $a['story']['opening'], $a['story']['middle'], $a['story']['closing'] ) ),
				),
				__( 'Vision & mission', 'daberau' ) => array(
					'vm_eyebrow'    => daberau_f_text( __( 'Label', 'daberau' ), $eb['about']['visionMission'] ),
					'vm_title'      => daberau_f_text( __( 'Headline', 'daberau' ), $a['visionMission']['title'] ),
					'vm_sub'        => daberau_f_text( __( 'Subheadline', 'daberau' ), $a['visionMission']['sub'] ),
					'vision'        => daberau_f_area( __( 'Vision', 'daberau' ), $a['vision']['body'] ),
					'mission_items' => daberau_f_lines( __( 'Mission', 'daberau' ), $a['mission']['items'] ),
				),
				__( 'Values', 'daberau' )           => array(
					'values_eyebrow' => daberau_f_text( __( 'Label', 'daberau' ), $eb['about']['values'] ),
					'values_title'   => daberau_f_text( __( 'Headline', 'daberau' ), $a['values']['title'] ),
					'values_sub'     => daberau_f_text( __( 'Subheadline', 'daberau' ), $a['values']['sub'] ),
					'values_items'   => daberau_f_lines( __( 'Values', 'daberau' ), $a['values']['items'], array( 'title', 'body' ) ),
				),
				__( 'Team', 'daberau' )             => array(
					'team_eyebrow' => daberau_f_text( __( 'Label', 'daberau' ), $eb['about']['team'] ),
					'team_title'   => daberau_f_text( __( 'Headline', 'daberau' ), $a['team']['title'] ),
					'team_sub'     => daberau_f_text( __( 'Subheadline', 'daberau' ), $a['team']['sub'] ),
					'team_members' => daberau_f_lines( __( 'Roles', 'daberau' ), $a['team']['members'], array( 'role', 'focus' ) ),
				),
				__( 'Numbers', 'daberau' )          => array(
					'numbers_eyebrow' => daberau_f_text( __( 'Label', 'daberau' ), $eb['about']['numbers'] ),
					'numbers_title'   => daberau_f_text( __( 'Headline', 'daberau' ), $a['numbers']['title'] ),
					'numbers_sub'     => daberau_f_text( __( 'Subheadline', 'daberau' ), $a['numbers']['sub'] ),
					'numbers_stats'   => daberau_f_lines( __( 'Stats', 'daberau' ), $d( 'stats' ), array( 'value', 'label' ) ),
				),
				__( 'SEO', 'daberau' )              => daberau_f_seo( $a['meta']['title'], $a['meta']['description'] ),
			);

		case 'how-we-work':
			$h      = $d( 'howWeWork' );
			$stages = array();
			foreach ( $d( 'processSteps' ) as $i => $step ) {
				$stages[] = array_merge( $step, $h['stages'][ $i ] );
			}
			return array(
				__( 'Hero', 'daberau' )             => array(
					'hero_h1'  => daberau_f_text( __( 'Headline (H1)', 'daberau' ), $h['h1'] ),
					'hero_sub' => daberau_f_area( __( 'Subheadline', 'daberau' ), $h['sub'] ),
				),
				__( 'Stages', 'daberau' )           => array(
					'stages_eyebrow' => daberau_f_text( __( 'Label', 'daberau' ), $eb['howWeWork']['stages'] ),
					'stages_title'   => daberau_f_text( __( 'Headline', 'daberau' ), $h['stagesTitle'] ),
					'stages'         => daberau_f_lines( __( 'Stages', 'daberau' ), $stages, array( 'icon', 'title', 'body', 'happens', 'get', 'time', 'role' ) ),
				),
				__( 'Engagement models', 'daberau' ) => array(
					'models_eyebrow' => daberau_f_text( __( 'Label', 'daberau' ), $eb['howWeWork']['models'] ),
					'models_title'   => daberau_f_text( __( 'Headline', 'daberau' ), $h['engagement']['title'] ),
					'models_sub'     => daberau_f_text( __( 'Subheadline', 'daberau' ), $h['engagement']['sub'] ),
					'models_items'   => daberau_f_lines( __( 'Models', 'daberau' ), $h['engagement']['items'], array( 'title', 'body' ) ),
				),
				__( 'Warranty & SLA', 'daberau' )   => array(
					'warranty_eyebrow' => daberau_f_text( __( 'Label', 'daberau' ), $eb['howWeWork']['warranty'] ),
					'warranty_title'   => daberau_f_text( __( 'Headline', 'daberau' ), $h['warranty']['title'] ),
					'warranty_sub'     => daberau_f_text( __( 'Subheadline', 'daberau' ), $h['warranty']['sub'] ),
					'warranty_items'   => daberau_f_lines( __( 'Items', 'daberau' ), $h['warranty']['items'], array( 'title', 'body' ) ),
				),
				__( 'Tools', 'daberau' )            => array(
					'tools_eyebrow' => daberau_f_text( __( 'Label', 'daberau' ), $eb['howWeWork']['tools'] ),
					'tools_title'   => daberau_f_text( __( 'Headline', 'daberau' ), $h['tools']['title'] ),
					'tools_sub'     => daberau_f_text( __( 'Subheadline', 'daberau' ), $h['tools']['sub'] ),
					'tools_items'   => daberau_f_lines( __( 'Tools', 'daberau' ), $h['tools']['items'] ),
				),
				__( 'SEO', 'daberau' )              => daberau_f_seo( $h['meta']['title'], $h['meta']['description'] ),
			);

		case 'contact':
			$c = $d( 'contactPage' );
			return array(
				__( 'Hero', 'daberau' )            => array(
					'hero_h1'  => daberau_f_text( __( 'Headline (H1)', 'daberau' ), $c['hero']['h1'] ),
					'hero_sub' => daberau_f_area( __( 'Subheadline', 'daberau' ), $c['hero']['sub'] ),
				),
				__( 'Contact options', 'daberau' ) => array(
					'options_eyebrow' => daberau_f_text( __( 'Label', 'daberau' ), $eb['contact']['options'] ),
					'options_title'   => daberau_f_text( __( 'Headline', 'daberau' ), $c['optionsHeading']['title'] ),
					'options_sub'     => daberau_f_text( __( 'Subheadline', 'daberau' ), $c['optionsHeading']['sub'] ),
				),
				__( 'Form', 'daberau' )            => array(
					'form_eyebrow' => daberau_f_text( __( 'Label', 'daberau' ), $eb['contact']['form'] ),
					'form_title'   => daberau_f_text( __( 'Headline', 'daberau' ), $c['formTitle'] ),
					'form_sub'     => daberau_f_text( __( 'Subheadline', 'daberau' ), $c['formSub'] ),
				),
				__( 'Map & FAQ', 'daberau' )       => array(
					'map_eyebrow' => daberau_f_text( __( 'Map label', 'daberau' ), $eb['contact']['map'] ),
					'map_title'   => daberau_f_text( __( 'Map headline', 'daberau' ), $c['map']['title'] ),
					'faq_eyebrow' => daberau_f_text( __( 'FAQ label', 'daberau' ), $eb['contact']['faq'] ),
					'faq_title'   => daberau_f_text( __( 'FAQ headline', 'daberau' ), $c['faq']['title'] ),
					'faq_sub'     => daberau_f_text( __( 'FAQ subheadline (questions come from FAQs → "Contact page")', 'daberau' ), $c['faq']['sub'] ),
				),
				__( 'SEO', 'daberau' )             => daberau_f_seo( $c['meta']['title'], $c['meta']['description'] ),
			);

		case 'faq':
			$f = $d( 'faqPage' );
			return array(
				__( 'Page', 'daberau' ) => array(
					'hero_h1'  => daberau_f_text( __( 'Headline (H1)', 'daberau' ), $f['h1'] ),
					'hero_sub' => daberau_f_area( __( 'Subheadline', 'daberau' ), $f['sub'] ),
					'bottom'   => daberau_f_text( __( 'Text above the contact button', 'daberau' ), $f['bottom'] ),
				),
				__( 'SEO', 'daberau' )  => daberau_f_seo( $f['meta']['title'], $f['meta']['description'] ),
			);

		case 'legal':
			$doc = ( $post && in_array( $post->post_name, array( 'terms-and-conditions', 'terms', 'syarat-dan-ketentuan' ), true ) ) ? $d( 'terms' ) : $d( 'privacy' );
			return array(
				__( 'Legal page', 'daberau' ) => array(
					'last_updated' => daberau_f_text( __( 'Last updated', 'daberau' ), $doc['lastUpdated'] ),
					'effective'    => daberau_f_text( __( 'Effective date', 'daberau' ), $doc['effective'] ),
					'in_short'     => daberau_f_lines( __( '"In short" summary', 'daberau' ), $doc['inShort'] ),
				),
				__( 'SEO', 'daberau' )        => daberau_f_seo( $doc['meta']['title'], $doc['meta']['description'] ),
			);

		case 'service':
			$s = daberau_default_service( $post ? $post->post_name : '' );
			return array(
				__( 'Card & hero', 'daberau' ) => array(
					'short'    => daberau_f_area( __( 'Short description (cards and menu)', 'daberau' ), $s['short'] ),
					'icon'     => array( __( 'Icon', 'daberau' ), 'text', $s['icon'], __( 'One of:', 'daberau' ) . ' ' . daberau_icon_keys() ),
					'scope'    => daberau_f_lines( __( 'Scope bullets (Services page cards)', 'daberau' ), $s['scope'] ),
					'needs'    => array( __( 'Need filters', 'daberau' ), 'text', implode( ', ', $s['needs'] ), 'found-online, automate, stable' ),
					'h1'       => daberau_f_text( __( 'Page headline (H1)', 'daberau' ), $s['hero']['h1'] ),
					'sub'      => daberau_f_area( __( 'Page subheadline', 'daberau' ), $s['hero']['sub'] ),
					'cta'      => daberau_f_text( __( 'Hero button label', 'daberau' ), $s['hero']['cta']['label'] ),
					'micro'    => daberau_f_text( __( 'Text under hero button', 'daberau' ), isset( $s['hero']['micro'] ) ? $s['hero']['micro'] : '' ),
				),
				__( 'Sections', 'daberau' )    => array(
					'problem_title' => daberau_f_text( __( 'Problem headline', 'daberau' ), $s['problem']['title'] ),
					'problem'       => daberau_f_lines( __( 'Problems', 'daberau' ), $s['problem']['points'] ),
					'deliver'       => daberau_f_lines( __( 'What we deliver', 'daberau' ), $s['deliver'] ),
					'benefits'      => daberau_f_lines( __( 'Benefits', 'daberau' ), $s['benefits'], array( 'title', 'body' ) ),
					'process'       => daberau_f_lines( __( 'Process steps', 'daberau' ), $s['process'], array( 'title', 'body' ) ),
					'tech'          => daberau_f_lines( __( 'Tech stack', 'daberau' ), $s['techStack'] ),
					'faqs'          => daberau_f_lines( __( 'FAQs', 'daberau' ), $s['faqs'], array( 'q', 'a' ) ),
					'related'       => daberau_f_lines( __( 'Related services (slugs)', 'daberau' ), $s['related'] ),
				),
				__( 'SEO', 'daberau' )         => daberau_f_seo( $s['meta']['title'], $s['meta']['description'] ),
			);
	}
	return array();
}

/**
 * Default content for a service by slug (empty structure if unknown).
 *
 * @param string $slug Service slug.
 */
function daberau_default_service( $slug ) {
	foreach ( daberau_default( 'services', array() ) as $service ) {
		if ( $service['slug'] === $slug ) {
			return $service;
		}
	}
	return array(
		'short'     => '',
		'icon'      => 'globe',
		'scope'     => array(),
		'needs'     => array(),
		'hero'      => array( 'h1' => '', 'sub' => '', 'cta' => array( 'label' => daberau_default( 'microcopy.ctaPrimary' ) ) ),
		'problem'   => array( 'title' => 'Does this *sound like you?*', 'points' => array() ),
		'deliver'   => array(),
		'benefits'  => array(),
		'process'   => array(),
		'techStack' => array(),
		'faqs'      => array(),
		'related'   => array(),
		'meta'      => array( 'title' => '', 'description' => '' ),
	);
}

/**
 * Default content for an industry by slug.
 *
 * @param string $slug Industry slug.
 */
function daberau_default_industry( $slug ) {
	foreach ( daberau_default( 'industries', array() ) as $industry ) {
		if ( $industry['slug'] === $slug ) {
			return $industry;
		}
	}
	return array( 'icon' => 'globe', 'title' => '', 'body' => '', 'challenges' => array(), 'services' => array() );
}

/**
 * Which schema applies to a post.
 *
 * @param WP_Post $post Post.
 */
function daberau_schema_key( $post ) {
	if ( 'daberau_service' === $post->post_type ) {
		return 'service';
	}
	if ( 'daberau_industry' === $post->post_type ) {
		return 'industry';
	}
	if ( 'page' !== $post->post_type ) {
		return '';
	}
	if ( (int) get_option( 'page_on_front' ) === $post->ID ) {
		return 'home';
	}
	return daberau_page_kind( $post );
}

/**
 * All field values for a post (saved value, or default when empty).
 *
 * @param int|WP_Post|null $post   Post (defaults to current).
 * @param string|null      $schema Force a schema key.
 * @return array key => string
 */
function daberau_fields( $post = null, $schema = null ) {
	$post   = get_post( $post );
	$schema = $schema ? $schema : ( $post ? daberau_schema_key( $post ) : '' );
	$values = array();
	foreach ( daberau_schema( $schema, $post ) as $fields ) {
		foreach ( $fields as $key => $field ) {
			$saved          = $post ? get_post_meta( $post->ID, '_daberau_' . $key, true ) : '';
			$values[ $key ] = ( '' === $saved || null === $saved ) ? $field[2] : $saved;
		}
	}
	return $values;
}

/* ---------------------------------------------------------------------------
 * Meta box
 * ------------------------------------------------------------------------- */

add_action(
	'add_meta_boxes',
	function ( $post_type, $post ) {
		if ( ! in_array( $post_type, array( 'page', 'daberau_service', 'daberau_industry' ), true ) || ! daberau_schema_key( $post ) ) {
			return;
		}
		add_meta_box( 'daberau_fields', __( 'Page content (Daberau)', 'daberau' ), 'daberau_render_fields_box', $post_type, 'normal', 'high' );
	},
	10,
	2
);

/**
 * Renders the meta box.
 *
 * @param WP_Post $post Post.
 */
function daberau_render_fields_box( $post ) {
	$schema = daberau_schema( daberau_schema_key( $post ), $post );
	$values = daberau_fields( $post );
	wp_nonce_field( 'daberau_fields', 'daberau_fields_nonce' );
	echo '<p class="description">' . esc_html__( 'Empty fields use the default text. Wrap words in *asterisks* in headlines to show them in brand red.', 'daberau' ) . '</p>';
	foreach ( $schema as $group => $fields ) {
		echo '<details class="daberau-group" open><summary><strong>' . esc_html( $group ) . '</strong></summary><table class="form-table" role="presentation"><tbody>';
		foreach ( $fields as $key => $field ) {
			list( $label, $type, , $hint ) = $field;
			$id    = 'daberau_' . $key;
			$value = $values[ $key ];
			echo '<tr><th scope="row"><label for="' . esc_attr( $id ) . '">' . esc_html( $label ) . '</label></th><td>';
			if ( 'toggle' === $type ) {
				echo '<input type="hidden" name="' . esc_attr( $id ) . '" value="0"><label><input type="checkbox" id="' . esc_attr( $id ) . '" name="' . esc_attr( $id ) . '" value="1"' . checked( '0' !== (string) $value, true, false ) . '> ' . esc_html__( 'Show', 'daberau' ) . '</label>';
			} elseif ( 'text' === $type ) {
				echo '<input type="text" class="large-text" id="' . esc_attr( $id ) . '" name="' . esc_attr( $id ) . '" value="' . esc_attr( $value ) . '">';
			} elseif ( 'image' === $type ) {
				echo '<input type="url" class="large-text" id="' . esc_attr( $id ) . '" name="' . esc_attr( $id ) . '" value="' . esc_attr( $value ) . '"> ';
				echo '<button type="button" class="button daberau-pick-image" data-target="' . esc_attr( $id ) . '">' . esc_html__( 'Choose image', 'daberau' ) . '</button>';
			} else {
				$rows = 'lines' === $type ? max( 4, substr_count( $value, "\n" ) + 2 ) : 3;
				echo '<textarea class="large-text" rows="' . (int) $rows . '" id="' . esc_attr( $id ) . '" name="' . esc_attr( $id ) . '">' . esc_textarea( $value ) . '</textarea>';
			}
			if ( $hint ) {
				echo '<p class="description">' . esc_html( $hint ) . '</p>';
			}
			echo '</td></tr>';
		}
		echo '</tbody></table></details>';
	}
}

add_action(
	'save_post',
	function ( $post_id, $post ) {
		if ( ! isset( $_POST['daberau_fields_nonce'] ) || ! wp_verify_nonce( sanitize_key( $_POST['daberau_fields_nonce'] ), 'daberau_fields' ) ) {
			return;
		}
		if ( ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) || ! current_user_can( 'edit_post', $post_id ) ) {
			return;
		}
		foreach ( daberau_schema( daberau_schema_key( $post ), $post ) as $fields ) {
			foreach ( $fields as $key => $field ) {
				$name = 'daberau_' . $key;
				if ( ! isset( $_POST[ $name ] ) ) {
					continue;
				}
				$raw   = wp_unslash( $_POST[ $name ] ); // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized -- sanitized below per type.
				if ( 'toggle' === $field[1] ) {
					$value = '1' === $raw ? '1' : '0';
				} else {
					$value = 'text' === $field[1] ? sanitize_text_field( $raw ) : ( 'image' === $field[1] ? esc_url_raw( $raw ) : sanitize_textarea_field( $raw ) );
				}
				// Store nothing when the value equals the default, so later default updates still apply.
				if ( $value === $field[2] || '' === $value ) {
					delete_post_meta( $post_id, '_daberau_' . $key );
				} else {
					update_post_meta( $post_id, '_daberau_' . $key, $value );
				}
			}
		}
	},
	10,
	2
);

add_action(
	'admin_enqueue_scripts',
	function ( $hook ) {
		if ( 'post.php' !== $hook && 'post-new.php' !== $hook ) {
			return;
		}
		wp_enqueue_media();
		wp_add_inline_style( 'common', '.daberau-group{margin:12px 0;border:1px solid #dcdcde;border-radius:6px;padding:8px 12px}.daberau-group summary{cursor:pointer;padding:4px 0}' );
		wp_add_inline_script(
			'media-editor',
			"document.addEventListener('click',function(e){var b=e.target.closest('.daberau-pick-image');if(!b)return;e.preventDefault();var f=wp.media({title:'Choose image',multiple:false,library:{type:'image'}});f.on('select',function(){var a=f.state().get('selection').first().toJSON();document.getElementById(b.dataset.target).value=a.url;});f.open();});"
		);
	}
);
