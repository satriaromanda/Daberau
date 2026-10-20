<?php
/**
 * Cookie consent banner and preferences dialog. Choices are stored in the browser (localStorage).
 *
 * @package Daberau
 */

defined( 'ABSPATH' ) || exit;

$c = daberau_default( 'cookies' );
?>
<div role="region" aria-label="<?php esc_attr_e( 'Cookie consent', 'daberau' ); ?>" hidden data-cookie-banner class="fixed inset-x-3 bottom-3 z-[45] rounded-card border border-neutral-200 bg-white p-5 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.25)] sm:inset-x-auto sm:bottom-6 sm:left-6 sm:max-w-md">
	<div class="flex gap-3">
		<?php echo daberau_icon( 'cookie', 'mt-0.5 h-5 w-5 shrink-0 text-neutral-500' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		<p class="text-[15px] leading-relaxed text-ink">
			<?php echo esc_html( $c['banner'] ); ?>
			<a href="<?php echo esc_url( daberau_url( 'privacy' ) . '#cookies' ); ?>" class="font-medium text-brand underline underline-offset-2 hover:text-brand-700"><?php esc_html_e( 'Privacy Policy', 'daberau' ); ?></a>
		</p>
	</div>
	<div class="mt-4 flex flex-col gap-2 sm:flex-row">
		<button type="button" data-cookie-accept class="btn inline-flex min-h-11 items-center justify-center rounded-btn bg-brand px-5 py-2 text-[15px] font-semibold text-white transition-colors hover:bg-brand-700 sm:flex-1"><?php echo esc_html( $c['acceptAll'] ); ?></button>
		<button type="button" data-cookie-manage class="btn inline-flex min-h-11 items-center justify-center rounded-btn border border-neutral-300 bg-white px-5 py-2 text-[15px] font-semibold text-ink transition-colors hover:border-ink sm:flex-1"><?php echo esc_html( $c['manage'] ); ?></button>
	</div>
</div>

<div hidden data-cookie-modal class="fixed inset-0 z-[60] flex items-end justify-center bg-black/40 p-3 sm:items-center sm:p-6">
	<div role="dialog" aria-modal="true" aria-labelledby="cookie-title" class="w-full max-w-md rounded-card border border-neutral-200 bg-white p-6">
		<div class="flex items-center justify-between">
			<h2 id="cookie-title" class="text-lg font-bold text-ink"><?php echo esc_html( $c['modalTitle'] ); ?></h2>
			<button type="button" data-cookie-close aria-label="<?php esc_attr_e( 'Close', 'daberau' ); ?>" class="inline-flex h-10 w-10 items-center justify-center rounded-btn hover:bg-neutral-100"><?php echo daberau_icon( 'x', 'h-5 w-5' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></button>
		</div>
		<ul class="mt-4 divide-y divide-neutral-200 rounded-card border border-neutral-200">
			<?php foreach ( $c['categories'] as $cat ) : ?>
				<li class="flex items-center justify-between gap-4 px-4 py-3.5">
					<span id="ck-<?php echo esc_attr( $cat['id'] ); ?>" class="font-medium text-ink"><?php echo esc_html( $cat['label'] ); ?><?php if ( ! empty( $cat['locked'] ) ) : ?> <span class="font-normal text-neutral-600"><?php echo esc_html( $cat['lockedLabel'] ); ?></span><?php endif; ?></span>
					<button type="button" role="switch" aria-checked="<?php echo ! empty( $cat['locked'] ) ? 'true' : 'false'; ?>" aria-labelledby="ck-<?php echo esc_attr( $cat['id'] ); ?>" data-cookie-switch="<?php echo esc_attr( $cat['id'] ); ?>" <?php disabled( ! empty( $cat['locked'] ) ); ?> class="cookie-switch relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors disabled:cursor-not-allowed">
						<span class="cookie-knob inline-block h-5 w-5 rounded-full bg-white shadow transition-transform"></span>
					</button>
				</li>
			<?php endforeach; ?>
		</ul>
		<div class="mt-5">
			<button type="button" data-cookie-save class="btn inline-flex min-h-11 w-full items-center justify-center rounded-btn bg-brand px-5 py-2 text-[15px] font-semibold text-white transition-colors hover:bg-brand-700"><?php echo esc_html( $c['save'] ); ?></button>
		</div>
	</div>
</div>
