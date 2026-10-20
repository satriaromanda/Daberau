<?php
/**
 * Technologies or tools shown with their real logos.
 *
 * Args: items (string[]), cols (CSS grid classes).
 *
 * @package Daberau
 */

defined( 'ABSPATH' ) || exit;

$cols = isset( $args['cols'] ) ? $args['cols'] : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6';
?>
<ul data-reveal class="grid gap-3 <?php echo esc_attr( $cols ); ?>">
	<?php foreach ( $args['items'] as $name ) : ?>
		<li class="flex h-16 items-center justify-center gap-2.5 rounded-card border border-neutral-200 bg-white px-3 text-[15px] font-semibold text-neutral-800">
			<?php echo daberau_brand_logo( $name, 'h-6 w-6 shrink-0' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			<?php echo esc_html( $name ); ?>
		</li>
	<?php endforeach; ?>
</ul>
