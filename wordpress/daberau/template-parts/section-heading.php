<?php
/**
 * Section eyebrow, headline (*word* = brand red) and subheadline.
 *
 * @package Daberau
 */

defined( 'ABSPATH' ) || exit;

$align = isset( $args['align'] ) ? $args['align'] : 'center';
?>
<div data-reveal class="mb-10 max-w-3xl md:mb-14 <?php echo 'center' === $align ? 'mx-auto text-center' : ''; ?> <?php echo esc_attr( $args['class'] ); ?>">
	<?php if ( $args['eyebrow'] ) : ?>
		<p class="mb-4 inline-flex items-center gap-2 rounded-full border border-brand/15 bg-brand-50 px-3.5 py-1 text-[13px] font-semibold uppercase tracking-wider text-brand">
			<span aria-hidden="true" class="h-1.5 w-1.5 rounded-full bg-brand"></span>
			<?php echo esc_html( $args['eyebrow'] ); ?>
		</p>
	<?php endif; ?>
	<h2 <?php echo $args['id'] ? 'id="' . esc_attr( $args['id'] ) . '"' : ''; ?> class="text-[30px] font-extrabold leading-[1.12] tracking-tight text-ink md:text-[44px] lg:text-[48px]"><?php echo daberau_accent( $args['title'] ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></h2>
	<?php if ( $args['sub'] ) : ?>
		<p class="mt-4 text-lg leading-relaxed text-neutral-600 md:text-xl"><?php echo esc_html( $args['sub'] ); ?></p>
	<?php endif; ?>
</div>
