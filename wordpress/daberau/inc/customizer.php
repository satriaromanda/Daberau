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
		// Site-wide elements that can be switched off.
		'show_prefooter'   => array( 'display', __( 'Show the pre-footer call to action ("Have an IT project…")', 'daberau' ), '1', 'checkbox' ),
		'show_sticky_cta'  => array( 'display', __( 'Show the sticky button at the bottom on phones', 'daberau' ), '1', 'checkbox' ),
		'show_cookies'     => array( 'display', __( 'Show the cookie banner', 'daberau' ), '1', 'checkbox' ),
		// WhatsApp (optional, off by default).
		'whatsapp_enabled' => array( 'whatsapp', __( 'Show WhatsApp buttons', 'daberau' ), '', 'checkbox' ),
		'whatsapp_number'  => array( 'whatsapp', __( 'WhatsApp number (digits with country code, e.g. 6281234567890)', 'daberau' ), '', 'text' ),
		'whatsapp_message' => array( 'whatsapp', __( 'Prefilled message', 'daberau' ), $d( 'whatsapp.prefill' ), 'textarea' ),
		'whatsapp_label'   => array( 'whatsapp', __( 'Button label', 'daberau' ), $d( 'whatsapp.label' ), 'text' ),
		// Header & CTAs.
		'cta_label'        => array( 'header', __( 'Header button label', 'daberau' ), $d( 'microcopy.ctaPrimary' ), 'text' ),
		'sticky_label'     => array( 'header', __( 'Mobile sticky button label', 'daberau' ), $d( 'nav.stickyCta.label' ), 'text' ),
		'prefooter_title'  => array( 'header', __( 'Pre-footer CTA headline', 'daberau' ), $d( 'preFooter.title' ), 'text' ),
		'prefooter_body'   => array( 'header', __( 'Pre-footer CTA text', 'daberau' ), $d( 'preFooter.body' ), 'textarea' ),
		'prefooter_image'  => array( 'header', __( 'Pre-footer CTA background image (wide; text sits on the left)', 'daberau' ), daberau_asset( 'images/cta-bg.webp' ), 'image' ),
		// Footer.
		'tagline'          => array( 'footer', __( 'Footer tagline', 'daberau' ), $d( 'site.tagline' ), 'text' ),
		'legal_name'       => array( 'footer', __( 'Legal company name', 'daberau' ), $d( 'site.legalName' ), 'text' ),
		'copyright'        => array( 'footer', __( 'Copyright line', 'daberau' ), $d( 'site.copyright' ), 'text' ),
		'linkedin'         => array( 'footer', __( 'LinkedIn URL', 'daberau' ), '', 'url' ),
		'instagram'        => array( 'footer', __( 'Instagram URL', 'daberau' ), '', 'url' ),
		'facebook'         => array( 'footer', __( 'Facebook URL', 'daberau' ), '', 'url' ),
		'youtube'          => array( 'footer', __( 'YouTube URL', 'daberau' ), '', 'url' ),
		// Email delivery (optional SMTP; leave empty to use the server's own mail).
		'smtp_host'        => array( 'email', __( 'SMTP server (Hostinger: smtp.hostinger.com)', 'daberau' ), '', 'text' ),
		'smtp_port'        => array( 'email', __( 'Port (465 for SSL, 587 for TLS)', 'daberau' ), '465', 'text' ),
		'smtp_secure'      => array( 'email', __( 'Encryption', 'daberau' ), 'ssl', 'select', array( 'ssl' => 'SSL', 'tls' => 'TLS', 'none' => __( 'None', 'daberau' ) ) ),
		'smtp_user'        => array( 'email', __( 'Mailbox (e.g. cs@daberau-me.com). Emails are sent from this address.', 'daberau' ), '', 'email' ),
		'smtp_pass'        => array( 'email', __( 'Mailbox password', 'daberau' ), '', 'password' ),
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
	// Checkboxes and selects may legitimately be empty (switched off / no encryption).
	if ( isset( $settings[ $key ] ) && in_array( $settings[ $key ][3], array( 'select', 'checkbox' ), true ) ) {
		return null === $value ? $default : $value;
	}
	return ( '' === $value || null === $value ) ? $default : $value;
}

add_action(
	'customize_register',
	function ( WP_Customize_Manager $wp_customize ) {
		$wp_customize->add_panel( 'daberau', array( 'title' => __( 'Daberau', 'daberau' ), 'priority' => 30 ) );
		$sections = array(
			'contact'  => __( 'Contact details', 'daberau' ),
			'whatsapp' => __( 'WhatsApp (optional)', 'daberau' ),
			'display'  => __( 'Show / hide', 'daberau' ),
			'header'   => __( 'Header & calls to action', 'daberau' ),
			'footer'   => __( 'Footer & social links', 'daberau' ),
			'services' => __( 'Service page headings', 'daberau' ),
			'email'    => __( 'Email delivery', 'daberau' ),
		);
		foreach ( $sections as $id => $title ) {
			$wp_customize->add_section( 'daberau_' . $id, array( 'title' => $title, 'panel' => 'daberau' ) );
		}
		$wp_customize->get_section( 'daberau_services' )->description = __( 'Shared by all service pages. Wrap words in *asterisks* to show them in brand red.', 'daberau' );
		$wp_customize->get_section( 'daberau_display' )->description  = __( 'Site-wide elements. To hide a section of a single page, open the page and use "Show sections" in the "Page content (Daberau)" box. To remove one card, delete its line in the list field.', 'daberau' );
		$wp_customize->get_section( 'daberau_whatsapp' )->description = __( 'Off by default. When switched on, WhatsApp buttons appear in the header (mobile), pre-footer, contact page, FAQ page and a floating chat button.', 'daberau' );
		$wp_customize->get_section( 'daberau_email' )->description    = __( 'Only needed if contact form emails don\'t arrive. Enter the mailbox you created in your hosting panel, then use Appearance → Daberau setup → Send test email. No plugin needed.', 'daberau' );

		$sanitizers = array(
			'text'     => 'sanitize_text_field',
			'textarea' => 'sanitize_textarea_field',
			'email'    => 'sanitize_email',
			'url'      => 'esc_url_raw',
			'image'    => 'esc_url_raw',
			'select'   => 'sanitize_key',
			'password' => 'daberau_sanitize_password',
			'checkbox' => 'daberau_sanitize_checkbox',
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
			$args = array(
				'label'   => $label,
				'section' => 'daberau_' . $section,
				'type'    => in_array( $type, array( 'textarea', 'url', 'email', 'password', 'select', 'checkbox' ), true ) ? $type : 'text',
			);
			if ( 'select' === $type ) {
				$args['choices'] = $s[4];
			}
			if ( 'image' === $type ) {
				$wp_customize->add_control( new WP_Customize_Image_Control( $wp_customize, 'daberau_' . $key, $args ) );
			} else {
				$wp_customize->add_control( 'daberau_' . $key, $args );
			}
		}
	}
);

/** Checkbox value: '1' or ''. */
function daberau_sanitize_checkbox( $value ) {
	return ( $value && '0' !== $value ) ? '1' : '';
}

/** Keeps a password exactly as typed (only trims surrounding spaces). */
function daberau_sanitize_password( $value ) {
	return trim( (string) $value );
}

/* Email delivery: SMTP when configured, and a From address on the site's own domain. */
add_action(
	'phpmailer_init',
	function ( $mailer ) {
		$host = trim( (string) daberau_mod( 'smtp_host' ) );
		$user = trim( (string) daberau_mod( 'smtp_user' ) );
		if ( ! $host || ! $user ) {
			return;
		}
		$secure = (string) daberau_mod( 'smtp_secure' );
		// phpcs:disable WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase
		$mailer->isSMTP();
		$mailer->Host       = $host;
		$mailer->Port       = (int) daberau_mod( 'smtp_port' );
		$mailer->SMTPAuth   = true;
		$mailer->Username   = $user;
		$mailer->Password   = (string) daberau_mod( 'smtp_pass' );
		$mailer->SMTPSecure = 'none' === $secure ? '' : $secure;
		// phpcs:enable
		$mailer->setFrom( $user, get_bloginfo( 'name' ), false );
	}
);

add_filter(
	'wp_mail_from',
	function ( $from ) {
		// Mail sent "from" an address on the site's own domain is far less likely to land in spam.
		$email = sanitize_email( daberau_mod( 'email' ) );
		$host  = preg_replace( '/^www\./', '', (string) wp_parse_url( home_url(), PHP_URL_HOST ) );
		return ( $email && $host && substr( $email, -strlen( '@' . $host ) ) === '@' . $host ) ? $email : $from;
	}
);

add_filter(
	'wp_mail_from_name',
	function ( $name ) {
		return 'WordPress' === $name ? get_bloginfo( 'name' ) : $name;
	}
);
