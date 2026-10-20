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
			'email'    => __( 'Email delivery', 'daberau' ),
		);
		foreach ( $sections as $id => $title ) {
			$wp_customize->add_section( 'daberau_' . $id, array( 'title' => $title, 'panel' => 'daberau' ) );
		}
		$wp_customize->get_section( 'daberau_services' )->description = __( 'Shared by all service pages. Wrap words in *asterisks* to show them in brand red.', 'daberau' );
		$wp_customize->get_section( 'daberau_email' )->description    = __( 'Only needed if contact form emails don\'t arrive. Enter the mailbox you created in your hosting panel, then use Appearance → Daberau setup → Send test email. No plugin needed.', 'daberau' );

		$sanitizers = array(
			'text'     => 'sanitize_text_field',
			'textarea' => 'sanitize_textarea_field',
			'email'    => 'sanitize_email',
			'url'      => 'esc_url_raw',
			'image'    => 'esc_url_raw',
			'select'   => 'sanitize_key',
			'password' => 'daberau_sanitize_password',
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
				'type'    => in_array( $type, array( 'textarea', 'url', 'email', 'password', 'select' ), true ) ? $type : 'text',
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
