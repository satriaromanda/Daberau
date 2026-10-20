<?php
/**
 * Accessible accordion. Answers are in the HTML (and readable without JavaScript); JS collapses them.
 *
 * Args: items ([ [q, a] ]; "a" is HTML when html is true), html (bool), level (h2|h3).
 *
 * @package Daberau
 */

defined( 'ABSPATH' ) || exit;

$GLOBALS['daberau_faq_uid'] = isset( $GLOBALS['daberau_faq_uid'] ) ? $GLOBALS['daberau_faq_uid'] + 1 : 1;
$uid   = $GLOBALS['daberau_faq_uid'];
$level = isset( $args['level'] ) ? $args['level'] : 'h3';
$html  = ! empty( $args['html'] );
?>
<div data-reveal data-accordion class="space-y-3">
	<?php foreach ( $args['items'] as $i => $item ) : ?>
		<?php
		$btn   = 'faq-' . $uid . '-btn-' . $i;
		$panel = 'faq-' . $uid . '-panel-' . $i;
		?>
		<div class="faq-item rounded-card border border-neutral-200 bg-white transition-[border-color,box-shadow] duration-300">
			<<?php echo tag_escape( $level ); ?> class="m-0">
				<button id="<?php echo esc_attr( $btn ); ?>" type="button" aria-expanded="true" aria-controls="<?php echo esc_attr( $panel ); ?>" class="faq-btn group flex w-full items-center justify-between gap-4 rounded-card px-5 py-4 text-left text-[16px] font-semibold text-ink focus-visible:-outline-offset-2 md:px-6 md:py-5 md:text-[17px]">
					<span class="faq-q transition-colors"><?php echo esc_html( $item['q'] ); ?></span>
					<span aria-hidden="true" class="faq-icon inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300"><?php echo daberau_icon( 'plus', 'h-4 w-4' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
				</button>
			</<?php echo tag_escape( $level ); ?>>
			<div id="<?php echo esc_attr( $panel ); ?>" role="region" aria-labelledby="<?php echo esc_attr( $btn ); ?>" class="faq-panel grid transition-[grid-template-rows,visibility] duration-300 ease-out">
				<div class="overflow-hidden">
					<div class="faq-answer px-5 pb-5 leading-relaxed text-neutral-600 md:px-6"><?php echo $html ? wp_kses_post( $item['a'] ) : '<p>' . daberau_linkify( $item['a'] ) . '</p>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></div>
				</div>
			</div>
		</div>
	<?php endforeach; ?>
</div>
