<?php
/**
 * Industry photo, or a branded tile (red network background + icon) until a photo is set.
 *
 * Args: industry (from daberau_industries()).
 *
 * @package Daberau
 */

defined( 'ABSPATH' ) || exit;

$ind = $args['industry'];
?>
<?php if ( $ind['image'] ) : ?>
	<img src="<?php echo esc_url( $ind['image'] ); ?>" alt="<?php echo esc_attr( $ind['alt'] ); ?>" width="1200" height="900" loading="lazy" decoding="async" class="h-full w-full object-cover">
<?php else : ?>
	<div class="relative isolate flex h-full w-full items-center justify-center overflow-hidden bg-ink">
		<img src="<?php echo esc_url( daberau_asset( 'images/cta-bg.webp' ) ); ?>" alt="" width="1440" height="540" loading="lazy" decoding="async" class="absolute inset-0 -z-10 h-full w-full object-cover object-[25%_center]">
		<span aria-hidden="true" class="absolute inset-0 -z-10 bg-gradient-to-br from-black/10 via-black/30 to-black/60"></span>
		<span class="inline-flex h-24 w-24 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/25 backdrop-blur-sm md:h-28 md:w-28">
			<?php echo daberau_icon( $ind['icon'], 'h-11 w-11 md:h-12 md:w-12', array( 'stroke' => 1.6 ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		</span>
	</div>
<?php endif; ?>
