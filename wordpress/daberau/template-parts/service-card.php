<?php
/**
 * Service card. The whole card is clickable through a stretched title link; the description stays selectable.
 * This is the one card type with a hover effect, because it is the one card that links somewhere.
 *
 * Args: service (from daberau_service_card), scope (bool), index (int).
 *
 * @package Daberau
 */

defined( 'ABSPATH' ) || exit;

$s     = $args['service'];
$index = isset( $args['index'] ) ? (int) $args['index'] : 0;
?>
<article data-reveal data-needs="<?php echo esc_attr( implode( ' ', $s['needs'] ) ); ?>"<?php echo daberau_delay( ( $index % 3 ) * 90 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?> class="card-interactive group relative flex h-full flex-col overflow-hidden rounded-card border border-neutral-200 bg-white">
	<div class="aspect-[16/10] overflow-hidden border-b border-neutral-200 bg-neutral-100">
		<?php if ( $s['image'] ) : ?>
			<img src="<?php echo esc_url( $s['image'] ); ?>" alt="<?php echo esc_attr( $s['alt'] ); ?>" width="800" height="500" loading="lazy" decoding="async" class="card-photo h-full w-full object-cover">
		<?php endif; ?>
	</div>
	<div class="flex flex-1 flex-col p-6 md:p-7">
		<span class="relative -mt-[52px] mb-1 inline-flex w-fit rounded-full bg-white ring-4 ring-white md:-mt-14">
			<?php get_template_part( 'template-parts/icon-tile', null, array( 'icon' => $s['icon'] ) ); ?>
		</span>
		<h3 class="mt-4 text-[19px] font-bold leading-snug text-ink md:text-[21px]">
			<a href="<?php echo esc_url( $s['url'] ); ?>" class="after:absolute after:inset-0 after:rounded-card focus-visible:outline-none"><?php echo esc_html( $s['name'] ); ?></a>
		</h3>
		<p class="relative z-10 mt-2.5 leading-relaxed text-neutral-600 md:text-[17px]"><?php echo esc_html( $s['short'] ); ?></p>
		<?php if ( ! empty( $args['scope'] ) && $s['scope'] ) : ?>
			<ul class="relative z-10 mt-4 space-y-2">
				<?php foreach ( $s['scope'] as $item ) : ?>
					<li class="flex items-start gap-2 text-[15px] text-neutral-700"><?php echo daberau_icon( 'check', 'mt-0.5 h-4 w-4 shrink-0 text-brand' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?><?php echo esc_html( $item ); ?></li>
				<?php endforeach; ?>
			</ul>
		<?php endif; ?>
		<span class="mt-auto inline-flex items-center gap-3 pt-6 text-[15px] font-semibold text-ink" aria-hidden="true">
			<span class="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink text-white transition-colors duration-300 group-hover:bg-brand"><?php echo daberau_icon( 'arrow-up-right', 'h-4 w-4' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
			<span class="transition-colors group-hover:text-brand"><?php esc_html_e( 'Learn more', 'daberau' ); ?></span>
		</span>
	</div>
	<span aria-hidden="true" class="pointer-events-none absolute inset-0 rounded-card ring-brand group-has-[a:focus-visible]:ring-2"></span>
</article>
