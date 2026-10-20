<?php
/**
 * Customizer settings (Appearance → Customize → Daberau …) for site-wide content.
 *
 * @package Daberau
 */

defined( 'ABSPATH' ) || exit;

/**
 * All Customizer settings: key => [ section, label, default, type ].
 */
function daberau_customizer_settings() {
	$d = 'daberau_default';
	$t = $d( 'serviceTemplate' );
	return array(
		// Contact details.
		'phone'            => array( 'contact', __( 'Phone (display)', 'daberau' ), $d( 'site.phone' ), 'text' ),
		'email'            => array( 'contact', __( 'Email', 'daberau' ), $d( 'site.email' ), 'email' ),
		'inquiry_email'    => array( 'contact', __( 'Send contact form inquiries to', 'daberau' ), $d( 'site.email' ), 'email' ),
		'address'          => array( 'contact', __( 'Office address', 'daberau' ), $d( 'site.address' ), 'textarea' ),
		'hours'            => array( 'contact', __( 'Business hours (short)', 'daberau' ), $d( 'site.hours' ), 'text' ),
		'hours_long'       => array( 'contact', __( 'Business hours (long)', 'daberau' ), $d( 'site.hoursLong' ), 'text' ),
		'whatsapp_number'  => array( 'contact', __( 'WhatsApp number (digits with country code, e.g. 6281234567890)', 'daberau' ), '', 'text' ),
		'whatsapp_message' => array( 'contact', __( 'WhatsApp prefilled message', 'daberau' ), $d( 'microcopy.whatsappPrefill' ), 'textarea' ),
		// Header & CTAs.
		'cta_label'        => array( 'header', __( 'Header button label', 'daberau' ), $d( 'microcopy.ctaPrimary' ), 'text' ),
		'sticky_label'     => array( 'header', __( 'Mobile sticky button label', 'daberau' ), $d( 'nav.stickyCta.label' ), 'text' ),
		'prefooter_title'  => array( 'header', __( 'Pre-footer CTA headline', 'daberau' ), $d( 'preFooter.title' ), 'text' ),
		'prefooter_body'   => array( 'header', __( 'Pre-footer CTA text', 'daberau' ), $d( 'preFooter.body' ), 'textarea' ),
		// Footer.
		'tagline'          => array( 'footer', __( 'Footer tagline', 'daberau' ), $d( 'site.tagline' ), 'text' ),
		'legal_name'       => array( 'footer', __( 'Legal company name', 'daberau' ), $d( 'site.legalName' ), 'text' ),
		'copyright'        => array( 'footer', __( 'Copyright line', 'daberau' ), $d( 'site.copyright' ), 'text' ),
		'linkedin'         => array( 'footer', __( 'LinkedIn URL', 'daberau' ), '', 'url' ),
		'instagram'        => array( 'footer', __( 'Instagram URL', 'daberau' ), '', 'url' ),
		'facebook'         => array( 'footer', __( 'Facebook URL', 'daberau' ), '', 'url' ),
		'youtube'          => array( 'footer', __( 'YouTube URL', 'daberau' ), '', 'url' ),
		// Shared service page headings (*word* = brand red).
		'svc_problem_sub'   => array( 'services', __( 'Problem: subheadline', 'daberau' ), $t['problemSub'], 'text' ),
		'svc_deliver_title' => array( 'services', __( 'Deliverables: headline', 'daberau' ), $t['deliver']['title'], 'text' ),
		'svc_deliver_sub'   => array( 'services', __( 'Deliverables: subheadline', 'daberau' ), $t['deliver']['sub'], 'text' ),
		'svc_benefits_title' => array( 'services', __( 'Benefits: headline', 'daberau' ), $t['benefits']['title'], 'text' ),
		'svc_benefits_sub'  => array( 'services', __( 'Benefits: subheadline', 'daberau' ), $t['benefits']['sub'], 'text' ),
		'svc_process_title' => array( 'services', __( 'Process: headline', 'daberau' ), $t['process']['title'], 'text' ),
		'svc_process_sub'   => array( 'services', __( 'Process: subheadline', 'daberau' ), $t['process']['sub'], 'text' ),
		'svc_tech_title'    => array( 'services', __( 'Tech stack: headline', 'daberau' ), $t['tech']['title'], 'text' ),
		'svc_tech_sub'      => array( 'services', __( 'Tech stack: subheadline', 'daberau' ), $t['tech']['sub'], 'text' ),
		'svc_faq_title'     => array( 'services', __( 'FAQ: headline', 'daberau' ), $t['faq']['title'], 'text' ),
		'svc_faq_sub'       => array( 'services', __( 'FAQ: subheadline', 'daberau' ), $t['faq']['sub'], 'text' ),
		'svc_related_title' => array( 'services', __( 'Related services: headline', 'daberau' ), $t['related']['title'], 'text' ),
		'svc_related_sub'   => array( 'services', __( 'Related services: subheadline', 'daberau' ), $t['related']['sub'], 'text' ),
	);
}

/**
 * Value of a Customizer setting (or its default).
 *
 * @param string $key Setting key without prefix.
 */
function daberau_mod( $key ) {
	static $settings = null;
	if ( null === $settings ) {
		$settings = daberau_customizer_settings();
	}
	$default = isset( $settings[ $key ] ) ? $settings[ $key ][2] : '';
	$value   = get_theme_mod( 'daberau_' . $key, $default );
	return ( '' === $value || null === $value ) ? $default : $value;
}

add_action(
	'customize_register',
	function ( WP_Customize_Manager $wp_customize ) {
		$wp_customize->add_panel( 'daberau', array( 'title' => __( 'Daberau', 'daberau' ), 'priority' => 30 ) );
		$sections = array(
			'contact'  => __( 'Contact details & WhatsApp', 'daberau' ),
			'header'   => __( 'Header & calls to action', 'daberau' ),
			'footer'   => __( 'Footer & social links', 'daberau' ),
			'services' => __( 'Service page headings', 'daberau' ),
		);
		foreach ( $sections as $id => $title ) {
			$wp_customize->add_section( 'daberau_' . $id, array( 'title' => $title, 'panel' => 'daberau' ) );
		}
		$wp_customize->get_section( 'daberau_services' )->description = __( 'Shared by all service pages. Wrap words in *asterisks* to show them in brand red.', 'daberau' );

		$sanitizers = array(
			'text'     => 'sanitize_text_field',
			'textarea' => 'sanitize_textarea_field',
			'email'    => 'sanitize_email',
			'url'      => 'esc_url_raw',
		);
		foreach ( daberau_customizer_settings() as $key => $s ) {
			list( $section, $label, $default, $type ) = $s;
			$wp_customize->add_setting(
				'daberau_' . $key,
				array(
					'default'           => $default,
					'sanitize_callback' => $sanitizers[ $type ],
				)
			);
			$wp_customize->add_control(
				'daberau_' . $key,
				array(
					'label'   => $label,
					'section' => 'daberau_' . $section,
					'type'    => 'textarea' === $type ? 'textarea' : ( 'url' === $type ? 'url' : ( 'email' === $type ? 'email' : 'text' ) ),
				)
			);
		}
	}
);
