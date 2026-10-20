<?php
/**
 * Connected step cards. Desktop: one row with arrow connectors. Mobile: a numbered vertical timeline.
 *
 * Args: steps ([ [icon?, title, body] ]).
 *
 * @package Daberau
 */

defined( 'ABSPATH' ) || exit;

$steps = $args['steps'];
$total = count( $steps );
$cols  = $total >= 5 ? 'lg:grid-cols-5' : ( 3 === $total ? 'lg:grid-cols-3' : 'lg:grid-cols-4' );
?>
<ol class="relative grid gap-4 lg:gap-5 <?php echo esc_attr( $cols ); ?>">
	<span aria-hidden="true" class="absolute bottom-6 left-[27px] top-6 w-px bg-gradient-to-b from-brand/40 via-brand/20 to-transparent lg:hidden"></span>
	<?php foreach ( $steps as $i => $s ) : ?>
		<?php $num = str_pad( (string) ( $i + 1 ), 2, '0', STR_PAD_LEFT ); ?>
		<li data-reveal<?php echo daberau_delay( $i * 90 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?> class="relative pl-16 lg:pl-0">
			<span aria-hidden="true" class="absolute left-0 top-5 inline-flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-brand text-[15px] font-extrabold text-white shadow-sm lg:hidden"><?php echo esc_html( $num ); ?></span>
			<div class="flex h-full flex-col rounded-card border border-neutral-200 bg-white p-6">
				<div class="flex items-center justify-between gap-3">
					<span class="text-[13px] font-bold uppercase tracking-wider text-brand"><?php echo esc_html( sprintf( /* translators: %s: step number */ __( 'Step %s', 'daberau' ), $num ) ); ?></span>
					<?php if ( ! empty( $s['icon'] ) ) : ?>
						<?php get_template_part( 'template-parts/icon-tile', null, array( 'icon' => $s['icon'], 'size' => 'sm' ) ); ?>
					<?php else : ?>
						<span aria-hidden="true" class="hidden h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-sm font-extrabold text-brand lg:inline-flex"><?php echo (int) ( $i + 1 ); ?></span>
					<?php endif; ?>
				</div>
				<h3 class="mt-5 text-[18px] font-bold leading-snug text-ink"><?php echo esc_html( $s['title'] ); ?></h3>
				<p class="mt-2 text-[15px] leading-relaxed text-neutral-600"><?php echo esc_html( $s['body'] ); ?></p>
			</div>
			<?php if ( $i < $total - 1 ) : ?>
				<span aria-hidden="true" class="absolute -right-[26px] top-1/2 z-20 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white text-brand shadow-sm lg:inline-flex"><?php echo daberau_icon( 'arrow-right', 'h-4 w-4' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
			<?php endif; ?>
		</li>
	<?php endforeach; ?>
</ol>
