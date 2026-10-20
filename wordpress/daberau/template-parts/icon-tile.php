<?php
/**
 * Round icon badge: light brand tint with a brand-colored glyph.
 *
 * @package Daberau
 */

defined( 'ABSPATH' ) || exit;

$sm = isset( $args['size'] ) && 'sm' === $args['size'];
?>
<span class="inline-flex <?php echo $sm ? 'h-9 w-9' : 'h-14 w-14'; ?> shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand transition-colors duration-300<?php echo empty( $args['hover'] ) ? '' : ' group-hover:bg-brand group-hover:text-white'; ?>">
	<?php echo daberau_icon( $args['icon'], $sm ? 'h-[18px] w-[18px]' : 'h-7 w-7', array( 'stroke' => $sm ? 1.8 : 2.2 ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
</span>
