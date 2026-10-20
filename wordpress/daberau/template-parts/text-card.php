<?php
/**
 * Static card with a title and body (optional number badge or icon). No hover effect: it is not clickable.
 *
 * Args: title, body, number (int|null), icon (string|null), delay (ms), tag (div|li).
 *
 * @package Daberau
 */

defined( 'ABSPATH' ) || exit;

$args = wp_parse_args( $args, array( 'title' => '', 'body' => '', 'number' => null, 'icon' => null, 'delay' => 0, 'tag' => 'div' ) );
$tag  = tag_escape( $args['tag'] );
?>
<<?php echo $tag; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?> data-reveal<?php echo daberau_delay( $args['delay'] ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?> class="rounded-card border border-neutral-200 bg-white p-6 md:p-7">
	<?php if ( null !== $args['number'] ) : ?>
		<span aria-hidden="true" class="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-lg font-extrabold text-brand"><?php echo (int) $args['number']; ?></span>
	<?php elseif ( $args['icon'] ) : ?>
		<div class="mb-6"><?php get_template_part( 'template-parts/icon-tile', null, array( 'icon' => $args['icon'] ) ); ?></div>
	<?php endif; ?>
	<h3 class="text-pretty text-[19px] font-bold leading-snug text-ink md:text-[21px]"><?php echo esc_html( $args['title'] ); ?></h3>
	<p class="mt-2.5 leading-relaxed text-neutral-600 md:text-[17px]"><?php echo daberau_linkify( $args['body'] ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></p>
</<?php echo $tag; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
