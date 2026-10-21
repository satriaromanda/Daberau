<?php
/**
 * Lead form. Validated in the browser (assets/js/main.js) and again on the server (inc/contact-form.php).
 * Without JavaScript it posts normally and returns here with ?sent=1 or ?sent=0.
 *
 * @package Daberau
 */

defined( 'ABSPATH' ) || exit;

$f      = daberau_default( 'leadForm' );
$fields = $f['fields'];
$micro  = daberau_default( 'microcopy' );
$sent   = isset( $_GET['sent'] ) ? sanitize_key( wp_unslash( $_GET['sent'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended

$input_ok = 'field block w-full rounded-btn border border-neutral-300 bg-white px-3.5 text-[16px] text-ink placeholder:text-neutral-500 transition-colors hover:border-neutral-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/25';
$req      = '<span class="text-brand-700" aria-hidden="true"> *</span>';

/**
 * Field label.
 *
 * @param string $key      Field key.
 * @param string $text     Label.
 * @param bool   $required Required marker.
 */
$label = function ( $key, $text, $required = false ) use ( $req ) {
	echo '<label for="cf-' . esc_attr( $key ) . '" class="mb-1.5 block text-[15px] font-semibold text-ink">' . esc_html( $text ) . ( $required ? $req : '' ) . '</label>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
};
$error = function ( $key ) {
	echo '<p id="cf-' . esc_attr( $key ) . '-error" class="field-error mt-2 hidden items-start gap-1.5 text-sm font-medium text-brand-700">' . daberau_icon( 'alert-circle', 'mt-px h-4 w-4 shrink-0' ) . '<span></span></p>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
};
$select = function ( $key, $options, $required = false ) use ( $f, $input_ok ) {
	echo '<div class="relative"><select id="cf-' . esc_attr( $key ) . '" name="' . esc_attr( $key ) . '" class="' . esc_attr( $input_ok ) . ' h-12 appearance-none pr-10"' . ( $required ? ' aria-required="true"' : '' ) . '>';
	echo '<option value="">' . esc_html( $f['selectPlaceholder'] ) . '</option>';
	foreach ( $options as $o ) {
		echo '<option value="' . esc_attr( $o['value'] ) . '">' . esc_html( $o['label'] ) . '</option>';
	}
	echo '</select>' . daberau_icon( 'chevron-down', 'pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-500' ) . '</div>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
};
$success_title = $f['success']['title'];
?>
<div data-form-wrap>
	<div data-form-success tabindex="-1" role="status" <?php echo '1' === $sent ? '' : 'hidden'; ?> class="rounded-card border border-neutral-200 bg-white p-8 text-center focus:outline-none md:p-10">
		<span class="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-success"><?php echo daberau_icon( 'check-circle', 'h-8 w-8' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
		<h2 class="mt-5 text-[24px] font-bold leading-tight text-ink md:text-[28px]" data-success-title data-template="<?php echo esc_attr( $success_title ); ?>"><?php echo esc_html( trim( str_replace( array( ', [Name]', '[Name]' ), '', $success_title ) ) ); ?></h2>
		<p class="mx-auto mt-3 max-w-md leading-relaxed text-neutral-600"><?php echo esc_html( $f['success']['body'] ); ?></p>
		<div class="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
			<?php echo daberau_button( daberau_url( 'services' ), $f['success']['primary']['label'] ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			<?php echo daberau_button( home_url( '/' ), $f['success']['secondary']['label'], 'secondary' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		</div>
	</div>

	<form data-lead-form <?php echo '1' === $sent ? 'hidden' : ''; ?> method="post" action="<?php echo esc_url( rest_url( 'daberau/v1/contact' ) ); ?>" enctype="multipart/form-data" novalidate class="rounded-card border border-neutral-200 bg-white p-6 md:p-8">
		<div data-form-failure tabindex="-1" role="alert" <?php echo '0' === $sent ? '' : 'hidden'; ?> class="mb-6 rounded-card border-2 border-brand-700 bg-brand-50 p-5 focus:outline-none">
			<div class="flex gap-3">
				<?php echo daberau_icon( 'x-circle', 'mt-0.5 h-5 w-5 shrink-0 text-brand-700' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				<div>
					<p class="font-bold text-ink"><?php echo esc_html( $f['failure']['title'] ); ?></p>
					<p class="mt-1 text-[15px] leading-relaxed text-neutral-700"><?php echo esc_html( $f['failure']['body'] ); ?></p>
					<div class="mt-4 flex flex-col gap-2 sm:flex-row">
						<button type="submit" class="btn inline-flex min-h-9 items-center justify-center rounded-btn bg-brand px-3.5 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"><?php echo esc_html( $f['failure']['retry'] ); ?></button>
						<?php if ( daberau_whatsapp_on() ) : ?>
							<?php echo daberau_button( daberau_whatsapp_url(), daberau_mod( 'whatsapp_label' ), 'secondary', 'sm', array( 'external' => true, 'icon' => daberau_whatsapp_icon( 'h-4 w-4 text-[#128C7E]' ) ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
						<?php else : ?>
							<?php echo daberau_button( 'mailto:' . daberau_mod( 'email' ), $micro['emailUs'], 'secondary', 'sm', array( 'icon' => daberau_icon( 'mail', 'h-4 w-4 text-brand' ) ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
						<?php endif; ?>
					</div>
				</div>
			</div>
		</div>

		<div data-error-summary role="alert" hidden class="mb-6 flex gap-3 rounded-card border-2 border-brand-700 bg-brand-50 p-4 text-[15px] font-medium text-ink">
			<?php echo daberau_icon( 'alert-circle', 'mt-0.5 h-5 w-5 shrink-0 text-brand-700' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			<?php echo esc_html( $micro['errorSummary'] ); ?>
		</div>

		<p class="mb-6 text-sm text-neutral-600"><?php echo esc_html( $f['helper'] ); ?></p>

		<input type="hidden" name="nojs" value="1" data-nojs>
		<input type="hidden" name="page" value="<?php echo esc_url( get_permalink() ); ?>">
		<div class="hidden" aria-hidden="true">
			<label for="cf-website"><?php esc_html_e( 'Leave this field empty', 'daberau' ); ?></label>
			<input id="cf-website" type="text" name="website" tabindex="-1" autocomplete="off">
		</div>

		<div class="grid gap-5 sm:grid-cols-2">
			<div>
				<?php $label( 'name', $fields['name']['label'], true ); ?>
				<input id="cf-name" name="name" type="text" autocomplete="name" placeholder="<?php echo esc_attr( $fields['name']['placeholder'] ); ?>" aria-required="true" class="<?php echo esc_attr( $input_ok ); ?> h-12">
				<?php $error( 'name' ); ?>
			</div>
			<div>
				<?php $label( 'company', $fields['company']['label'] ); ?>
				<input id="cf-company" name="company" type="text" autocomplete="organization" placeholder="<?php echo esc_attr( $fields['company']['placeholder'] ); ?>" class="<?php echo esc_attr( $input_ok ); ?> h-12">
			</div>
			<div>
				<?php $label( 'email', $fields['email']['label'], true ); ?>
				<input id="cf-email" name="email" type="email" autocomplete="email" inputmode="email" placeholder="<?php echo esc_attr( $fields['email']['placeholder'] ); ?>" aria-required="true" class="<?php echo esc_attr( $input_ok ); ?> h-12">
				<?php $error( 'email' ); ?>
			</div>
			<div>
				<?php $label( 'phone', $fields['phone']['label'], true ); ?>
				<input id="cf-phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" placeholder="<?php echo esc_attr( $fields['phone']['placeholder'] ); ?>" aria-required="true" class="<?php echo esc_attr( $input_ok ); ?> h-12">
				<?php $error( 'phone' ); ?>
			</div>

			<div class="sm:col-span-2">
				<?php $label( 'service', $fields['service']['label'], true ); ?>
				<?php $select( 'service', $fields['service']['options'], true ); ?>
				<?php $error( 'service' ); ?>
			</div>

			<div>
				<div class="mb-1.5 flex items-center gap-1.5">
					<label for="cf-budget" class="text-[15px] font-semibold text-ink"><?php echo esc_html( $fields['budget']['label'] ); ?></label>
					<span class="group relative inline-flex">
						<button type="button" aria-label="<?php esc_attr_e( 'About the budget field', 'daberau' ); ?>" aria-describedby="cf-budget-tip" class="inline-flex h-6 w-6 items-center justify-center rounded-full text-neutral-500 hover:text-ink"><?php echo daberau_icon( 'info', 'h-4 w-4' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></button>
						<span id="cf-budget-tip" role="tooltip" class="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-60 -translate-x-1/2 rounded-btn bg-ink px-3 py-2 text-sm font-normal leading-snug text-white opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100"><?php echo esc_html( $micro['budgetTooltip'] ); ?></span>
					</span>
				</div>
				<?php $select( 'budget', $fields['budget']['options'] ); ?>
			</div>
			<div>
				<?php $label( 'timeline', $fields['timeline']['label'] ); ?>
				<?php $select( 'timeline', $fields['timeline']['options'] ); ?>
			</div>

			<div class="sm:col-span-2">
				<?php $label( 'message', $fields['message']['label'], true ); ?>
				<textarea id="cf-message" name="message" rows="5" placeholder="<?php echo esc_attr( $fields['message']['placeholder'] ); ?>" aria-required="true" class="<?php echo esc_attr( $input_ok ); ?> resize-y py-3"></textarea>
				<?php $error( 'message' ); ?>
			</div>

			<div class="sm:col-span-2">
				<span id="cf-attachment-label" class="mb-1.5 block text-[15px] font-semibold text-ink"><?php echo esc_html( $fields['attachment']['label'] ); ?></span>
				<div data-dropzone class="flex flex-col gap-3 rounded-btn border border-dashed border-neutral-300 p-4 sm:flex-row sm:items-center">
					<label for="cf-attachment" class="inline-flex min-h-10 w-fit cursor-pointer items-center gap-2 rounded-btn border border-neutral-300 bg-white px-4 text-sm font-semibold text-ink hover:bg-neutral-50 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brand">
						<?php echo daberau_icon( 'paperclip', 'h-4 w-4' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
						<?php echo esc_html( $fields['attachment']['button'] ); ?>
						<input id="cf-attachment" name="attachment" type="file" accept=".pdf,.docx,image/*" class="sr-only" aria-labelledby="cf-attachment-label" aria-describedby="cf-attachment-hint">
					</label>
					<span id="cf-attachment-hint" class="text-sm text-neutral-600" data-file-hint><?php echo esc_html( $fields['attachment']['hint'] ); ?></span>
					<span class="hidden min-w-0 items-center gap-2 text-sm text-ink" data-file-info>
						<span class="truncate font-medium" data-file-name></span>
						<span class="shrink-0 text-neutral-500" data-file-size></span>
						<button type="button" data-file-remove aria-label="<?php echo esc_attr( $fields['attachment']['remove'] ); ?>" class="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-neutral-500 hover:bg-neutral-100 hover:text-ink"><?php echo daberau_icon( 'x', 'h-4 w-4' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></button>
					</span>
				</div>
				<?php $error( 'attachment' ); ?>
			</div>

			<div class="sm:col-span-2">
				<div class="flex items-start gap-3">
					<input id="cf-consent" name="consent" type="checkbox" value="1" aria-required="true" class="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded accent-brand">
					<label for="cf-consent" class="text-[15px] leading-relaxed text-neutral-700">
						<?php echo esc_html( $fields['consent']['before'] ); ?><a href="<?php echo esc_url( daberau_url( 'privacy' ) ); ?>" target="_blank" class="font-medium text-brand underline underline-offset-2 hover:text-brand-700"><?php echo esc_html( $fields['consent']['privacy'] ); ?></a><?php echo esc_html( $fields['consent']['and'] ); ?><a href="<?php echo esc_url( daberau_url( 'terms' ) ); ?>" target="_blank" class="font-medium text-brand underline underline-offset-2 hover:text-brand-700"><?php echo esc_html( $fields['consent']['terms'] ); ?></a><?php echo esc_html( $fields['consent']['after'] ); ?><?php echo $req; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					</label>
				</div>
				<?php $error( 'consent' ); ?>
			</div>
		</div>

		<div class="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
			<button type="submit" data-submit class="btn inline-flex min-h-12 items-center justify-center gap-2 rounded-btn bg-brand px-6 py-2.5 text-base font-semibold text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70 sm:min-w-52">
				<?php echo daberau_icon( 'loader', 'hidden h-5 w-5 animate-spin', array() ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				<span data-submit-label data-idle="<?php echo esc_attr( $f['submit'] ); ?>"><?php echo esc_html( $f['submit'] ); ?></span>
			</button>
			<p class="text-sm text-neutral-600"><?php echo esc_html( $micro['reassurance'] ); ?></p>
		</div>
		<p class="sr-only" aria-live="polite" data-form-live></p>
	</form>
</div>
