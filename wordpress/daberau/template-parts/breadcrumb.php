<?php
/**
 * Breadcrumb trail with BreadcrumbList structured data.
 *
 * @package Daberau
 */

defined( 'ABSPATH' ) || exit;

$all   = array_merge( array( array( __( 'Home', 'daberau' ), home_url( '/' ) ) ), $args['crumbs'] );
$count = count( $all );
$items = array();
foreach ( $all as $i => $c ) {
	$item = array( '@type' => 'ListItem', 'position' => $i + 1, 'name' => $c[0] );
	$url  = isset( $c[1] ) ? $c[1] : ( $i === $count - 1 ? get_permalink() : '' );
	if ( $url ) {
		$item['item'] = $url;
	}
	$items[] = $item;
}
?>
<nav aria-label="<?php esc_attr_e( 'Breadcrumb', 'daberau' ); ?>" class="mb-6">
	<ol class="flex flex-wrap items-center gap-1 text-sm text-neutral-600">
		<?php foreach ( $all as $i => $c ) : ?>
			<?php $last = $i === $count - 1; ?>
			<li class="flex items-center gap-1">
				<?php if ( ! $last && ! empty( $c[1] ) ) : ?>
					<a href="<?php echo esc_url( $c[1] ); ?>" class="rounded underline-offset-2 hover:text-ink hover:underline"><?php echo esc_html( $c[0] ); ?></a>
				<?php else : ?>
					<span <?php echo $last ? 'aria-current="page" class="font-medium text-ink"' : ''; ?>><?php echo esc_html( $c[0] ); ?></span>
				<?php endif; ?>
				<?php if ( ! $last ) : ?>
					<?php echo daberau_icon( 'chevron-right', 'h-3.5 w-3.5 text-neutral-400' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				<?php endif; ?>
			</li>
		<?php endforeach; ?>
	</ol>
	<?php daberau_json_ld( array( '@context' => 'https://schema.org', '@type' => 'BreadcrumbList', 'itemListElement' => $items ) ); ?>
</nav>
