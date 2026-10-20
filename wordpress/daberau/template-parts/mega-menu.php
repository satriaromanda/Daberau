<?php
/**
 * Services mega menu (desktop).
 *
 * @package Daberau
 */

defined( 'ABSPATH' ) || exit;

$services = $args['services'];
$promo    = daberau_default( 'nav.megaPromo' );
$first    = $services ? $services[0] : null;
?>
<div id="services-menu" hidden data-mega-panel class="absolute inset-x-0 top-full border-b border-neutral-200 bg-white shadow-[0_16px_32px_-16px_rgba(0,0,0,0.12)]">
	<div class="mx-auto grid max-w-[1200px] grid-cols-[1.15fr_1fr_0.95fr] gap-8 px-8 py-8">
		<ul aria-label="<?php esc_attr_e( 'Services', 'daberau' ); ?>" class="space-y-1">
			<?php foreach ( $services as $i => $s ) : ?>
				<?php $current = is_singular( 'daberau_service' ) && get_queried_object_id() === $s['id']; ?>
				<li>
					<a href="<?php echo esc_url( $s['url'] ); ?>" data-menu-item data-preview-name="<?php echo esc_attr( $s['name'] ); ?>" data-preview-short="<?php echo esc_attr( $s['short'] ); ?>" data-preview-url="<?php echo esc_url( $s['url'] ); ?>" <?php echo $current ? 'aria-current="page"' : ''; ?> class="mega-item flex items-center gap-3 rounded-btn px-3 py-2.5 text-[15px] font-semibold text-neutral-700 transition-colors hover:bg-neutral-50 aria-[current=page]:text-brand<?php echo 0 === $i ? ' is-active' : ''; ?>">
						<?php get_template_part( 'template-parts/icon-tile', null, array( 'icon' => $s['icon'], 'size' => 'sm' ) ); ?>
						<?php echo esc_html( $s['name'] ); ?>
					</a>
				</li>
			<?php endforeach; ?>
		</ul>
		<div class="flex flex-col border-l border-neutral-200 pl-8" aria-live="polite">
			<?php if ( $first ) : ?>
				<p class="text-sm font-semibold uppercase tracking-wider text-neutral-500" data-preview="name"><?php echo esc_html( $first['name'] ); ?></p>
				<p class="mt-3 text-lg leading-relaxed text-ink" data-preview="short"><?php echo esc_html( $first['short'] ); ?></p>
				<a href="<?php echo esc_url( $first['url'] ); ?>" tabindex="-1" data-preview="url" class="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand hover:text-brand-700">
					<?php esc_html_e( 'Learn more', 'daberau' ); ?> <?php echo daberau_icon( 'arrow-right', 'h-4 w-4' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				</a>
			<?php endif; ?>
			<a href="<?php echo esc_url( daberau_url( 'services' ) ); ?>" data-menu-item class="mt-auto inline-flex w-fit items-center gap-1 rounded-btn pt-6 text-[15px] font-semibold text-ink hover:text-brand">
				<?php echo esc_html( daberau_default( 'nav.allServices.label' ) ); ?> <?php echo daberau_icon( 'arrow-right', 'h-4 w-4' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			</a>
		</div>
		<div class="rounded-card border border-neutral-200 bg-neutral-50 p-6">
			<p class="text-lg font-bold text-ink"><?php echo esc_html( $promo['title'] ); ?></p>
			<p class="mt-2 leading-relaxed text-neutral-600"><?php echo esc_html( $promo['body'] ); ?></p>
			<?php echo daberau_button( daberau_url( 'form' ), $promo['cta']['label'], 'primary', 'md', array( 'class' => 'mt-5', 'attrs' => 'data-menu-item' ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		</div>
	</div>
</div>
