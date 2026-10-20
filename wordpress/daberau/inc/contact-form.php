<?php
/**
 * Contact form endpoint: POST /wp-json/daberau/v1/contact
 *
 * Validates with the same rules as the browser, saves the request under "Inquiries", and emails it to the
 * address set in Customizer → Daberau → Contact details. Spam protection uses a honeypot field and a
 * per-IP rate limit instead of a nonce, so the form keeps working behind page caches.
 *
 * @package Daberau
 */

defined( 'ABSPATH' ) || exit;

add_action(
	'rest_api_init',
	function () {
		register_rest_route(
			'daberau/v1',
			'/contact',
			array(
				'methods'             => 'POST',
				'callback'            => 'daberau_handle_contact',
				'permission_callback' => '__return_true',
			)
		);
	}
);

/**
 * Validates a submission. Returns field => message for invalid fields.
 *
 * @param array      $v    Values.
 * @param array|null $file Uploaded file from $_FILES.
 */
function daberau_validate_contact( $v, $file ) {
	$e = daberau_default( 'leadForm.fields' );
	$errors = array();
	if ( '' === trim( $v['name'] ) ) {
		$errors['name'] = $e['name']['error'];
	}
	if ( ! preg_match( '/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/', trim( $v['email'] ) ) || ! is_email( trim( $v['email'] ) ) ) {
		$errors['email'] = $e['email']['error'];
	}
	if ( strlen( preg_replace( '/\D/', '', $v['whatsapp'] ) ) < 10 ) {
		$errors['whatsapp'] = $e['whatsapp']['error'];
	}
	$services = wp_list_pluck( $e['service']['options'], 'value' );
	if ( ! in_array( $v['service'], $services, true ) ) {
		$errors['service'] = $e['service']['error'];
	}
	if ( '' === trim( $v['message'] ) ) {
		$errors['message'] = $e['message']['error'];
	}
	if ( $file && ! empty( $file['size'] ) && $file['size'] > 10 * MB_IN_BYTES ) {
		$errors['attachment'] = $e['attachment']['error'];
	}
	if ( empty( $v['consent'] ) ) {
		$errors['consent'] = $e['consent']['error'];
	}
	return $errors;
}

/**
 * REST callback. Without JavaScript the form posts here directly; send the visitor back to the page.
 *
 * @param WP_REST_Request $request Request.
 */
function daberau_handle_contact( WP_REST_Request $request ) {
	$response = daberau_process_contact( $request );
	if ( '1' === (string) $request->get_param( 'nojs' ) ) {
		$back = wp_validate_redirect( (string) $request->get_param( 'page' ), home_url( '/' ) );
		$ok   = 200 === $response->get_status();
		wp_safe_redirect( add_query_arg( 'sent', $ok ? '1' : '0', $back ) . '#contact-form', 303 );
		exit;
	}
	return $response;
}

/**
 * Validates, stores and emails a submission.
 *
 * @param WP_REST_Request $request Request.
 * @return WP_REST_Response
 */
function daberau_process_contact( WP_REST_Request $request ) {
	// Honeypot: real visitors never see or fill this field. Pretend success to bots.
	if ( '' !== (string) $request->get_param( 'website' ) ) {
		return new WP_REST_Response( array( 'ok' => true ), 200 );
	}

	// Rate limit: 5 submissions per 10 minutes per IP address.
	$ip   = isset( $_SERVER['REMOTE_ADDR'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) ) : '';
	$key  = 'daberau_rl_' . md5( $ip );
	$hits = (int) get_transient( $key );
	if ( $hits >= 5 ) {
		return new WP_REST_Response( array( 'ok' => false, 'code' => 'rate_limited' ), 429 );
	}
	set_transient( $key, $hits + 1, 10 * MINUTE_IN_SECONDS );

	$v = array();
	foreach ( array( 'name', 'company', 'email', 'whatsapp', 'service', 'budget', 'timeline' ) as $k ) {
		$v[ $k ] = sanitize_text_field( (string) $request->get_param( $k ) );
	}
	$v['message'] = sanitize_textarea_field( (string) $request->get_param( 'message' ) );
	$v['consent'] = in_array( $request->get_param( 'consent' ), array( '1', 'on', 'true', true, 1 ), true );
	$v['page']    = esc_url_raw( (string) $request->get_param( 'page' ) );

	$files  = $request->get_file_params();
	$file   = ( ! empty( $files['attachment'] ) && UPLOAD_ERR_NO_FILE !== $files['attachment']['error'] ) ? $files['attachment'] : null;
	$errors = daberau_validate_contact( $v, $file );
	if ( $errors ) {
		return new WP_REST_Response( array( 'ok' => false, 'errors' => $errors ), 422 );
	}

	$attachment_path = '';
	$attachment_url  = '';
	if ( $file ) {
		$saved = daberau_store_attachment( $file );
		if ( is_wp_error( $saved ) ) {
			return new WP_REST_Response( array( 'ok' => false, 'errors' => array( 'attachment' => $saved->get_error_message() ) ), 422 );
		}
		$attachment_path = $saved['file'];
		$attachment_url  = $saved['url'];
	}

	$title   = $v['name'] . ( $v['company'] ? ' — ' . $v['company'] : '' );
	$post_id = wp_insert_post(
		array(
			'post_type'   => 'daberau_inquiry',
			'post_status' => 'private',
			'post_title'  => $title,
		),
		true
	);
	if ( ! is_wp_error( $post_id ) ) {
		foreach ( array( 'name', 'company', 'email', 'whatsapp', 'service', 'budget', 'timeline', 'message', 'page' ) as $k ) {
			update_post_meta( $post_id, '_inquiry_' . $k, $v[ $k ] );
		}
		if ( $attachment_url ) {
			update_post_meta( $post_id, '_inquiry_attachment', $attachment_url );
		}
	}

	// Email the team.
	$labels = daberau_inquiry_labels();
	$lines  = array();
	foreach ( array( 'name', 'company', 'email', 'whatsapp', 'service', 'budget', 'timeline', 'message', 'page' ) as $k ) {
		if ( '' !== $v[ $k ] ) {
			$lines[] = $labels[ $k ] . ":\n" . $v[ $k ];
		}
	}
	if ( ! is_wp_error( $post_id ) ) {
		$lines[] = __( 'View in WordPress:', 'daberau' ) . "\n" . admin_url( 'post.php?post=' . $post_id . '&action=edit' );
	}
	$to      = sanitize_email( daberau_mod( 'inquiry_email' ) );
	$to      = $to ? $to : get_option( 'admin_email' );
	/* translators: 1: name, 2: service */
	$subject = sprintf( __( 'New inquiry: %1$s (%2$s)', 'daberau' ), $title, $v['service'] );
	$headers = array( 'Reply-To: ' . $v['name'] . ' <' . $v['email'] . '>' );
	$sent    = wp_mail( $to, $subject, implode( "\n\n", $lines ), $headers, $attachment_path ? array( $attachment_path ) : array() );

	// The request is saved even if email delivery fails; only report failure when nothing was stored.
	if ( is_wp_error( $post_id ) && ! $sent ) {
		return new WP_REST_Response( array( 'ok' => false, 'code' => 'send_failed' ), 500 );
	}
	return new WP_REST_Response( array( 'ok' => true ), 200 );
}

/**
 * Stores an attachment in uploads/daberau-inquiries with a random name (not in the Media Library).
 *
 * @param array $file Entry from $_FILES.
 * @return array|WP_Error [ file, url ]
 */
function daberau_store_attachment( $file ) {
	require_once ABSPATH . 'wp-admin/includes/file.php';
	$mimes = array(
		'pdf'          => 'application/pdf',
		'docx'         => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		'jpg|jpeg|jpe' => 'image/jpeg',
		'png'          => 'image/png',
		'gif'          => 'image/gif',
		'webp'         => 'image/webp',
	);
	$subdir = function ( $dirs ) {
		$dirs['subdir'] = '/daberau-inquiries';
		$dirs['path']   = $dirs['basedir'] . $dirs['subdir'];
		$dirs['url']    = $dirs['baseurl'] . $dirs['subdir'];
		return $dirs;
	};
	$rename = function ( $dir, $name, $ext ) {
		return wp_generate_password( 16, false ) . '-' . sanitize_file_name( $name );
	};
	add_filter( 'upload_dir', $subdir );
	$result = wp_handle_upload(
		$file,
		array(
			'test_form'                => false,
			'mimes'                    => $mimes,
			'unique_filename_callback' => $rename,
		)
	);
	remove_filter( 'upload_dir', $subdir );

	if ( isset( $result['error'] ) ) {
		return new WP_Error( 'upload', daberau_default( 'leadForm.fields.attachment.hint' ) );
	}
	// Keep the folder from being listed.
	$index = dirname( $result['file'] ) . '/index.php';
	if ( ! file_exists( $index ) ) {
		file_put_contents( $index, "<?php\n// Silence is golden.\n" ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_file_put_contents
	}
	return array( 'file' => $result['file'], 'url' => $result['url'] );
}
