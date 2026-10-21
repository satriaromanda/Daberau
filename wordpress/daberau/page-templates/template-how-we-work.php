<?php
/**
 * Template Name: How we work
 *
 * @package Daberau
 */

defined( 'ABSPATH' ) || exit;

get_header();

$f      = daberau_fields();
$labels = daberau_default( 'howWeWork.labels' );

get_template_part(
	'template-parts/page-hero',
	null,
	array(
		'crumbs'  => array( array( get_the_title() ) ),
		'title'   => $f['hero_h1'],
		'sub'     => $f['hero_sub'],
		'actions' => daberau_button( daberau_url( 'form' ), daberau_mod( 'cta_label' ), 'primary', 'lg' ),
	)
);
?>

<?php if ( daberau_show( $f, 'stages' ) ) : ?>
<?php daberau_section_open( 'stages-title' ); ?>
	<?php daberau_section_heading( array( 'id' => 'stages-title', 'eyebrow' => $f['stages_eyebrow'], 'title' => $f['stages_title'] ) ); ?>
	<ol class="space-y-6">
		<?php foreach ( daberau_lines( $f['stages'], array( 'icon', 'title', 'body', 'happens', 'get', 'time', 'role' ) ) as $i => $st ) : ?>
			<li data-reveal class="relative grid gap-6 overflow-hidden rounded-card border border-neutral-200 bg-white p-6 md:p-8 lg:grid-cols-[300px_1fr]">
				<div class="flex gap-4">
					<?php if ( $st['icon'] ) : ?>
						<?php get_template_part( 'template-parts/icon-tile', null, array( 'icon' => $st['icon'] ) ); ?>
					<?php endif; ?>
					<div>
						<p class="text-[13px] font-bold uppercase tracking-wider text-brand"><?php echo esc_html( sprintf( /* translators: %s: step number */ __( 'Step %s', 'daberau' ), str_pad( (string) ( $i + 1 ), 2, '0', STR_PAD_LEFT ) ) ); ?></p>
						<h3 class="mt-1 text-[22px] font-bold text-ink"><?php echo esc_html( $st['title'] ); ?></h3>
						<p class="mt-1 text-neutral-600"><?php echo esc_html( $st['body'] ); ?></p>
					</div>
				</div>
				<dl class="grid gap-x-8 gap-y-5 sm:grid-cols-2">
					<?php foreach ( array( 'happens', 'get', 'time', 'role' ) as $key ) : ?>
						<div>
							<dt class="text-sm font-bold uppercase tracking-wider text-neutral-500"><?php echo esc_html( $labels[ $key ] ); ?></dt>
							<dd class="mt-1.5 leading-relaxed text-ink"><?php echo esc_html( $st[ $key ] ); ?></dd>
						</div>
					<?php endforeach; ?>
				</dl>
			</li>
		<?php endforeach; ?>
	</ol>
<?php daberau_section_close(); ?>
<?php endif; ?>

<?php if ( daberau_show( $f, 'models' ) ) : ?>
<?php daberau_section_open( 'models-title', 'muted' ); ?>
	<?php daberau_section_heading( array( 'id' => 'models-title', 'eyebrow' => $f['models_eyebrow'], 'title' => $f['models_title'], 'sub' => $f['models_sub'] ) ); ?>
	<ul class="grid gap-4 md:grid-cols-3">
		<?php foreach ( daberau_lines( $f['models_items'], array( 'title', 'body' ) ) as $i => $m ) : ?>
			<?php get_template_part( 'template-parts/text-card', null, array( 'tag' => 'li', 'title' => $m['title'], 'body' => $m['body'], 'delay' => $i * 90 ) ); ?>
		<?php endforeach; ?>
	</ul>
<?php daberau_section_close(); ?>
<?php endif; ?>

<?php if ( daberau_show( $f, 'warranty' ) ) : ?>
<?php daberau_section_open( 'warranty-title' ); ?>
	<?php daberau_section_heading( array( 'id' => 'warranty-title', 'eyebrow' => $f['warranty_eyebrow'], 'title' => $f['warranty_title'], 'sub' => $f['warranty_sub'] ) ); ?>
	<ul class="grid gap-4 md:grid-cols-3">
		<?php foreach ( daberau_lines( $f['warranty_items'], array( 'title', 'body' ) ) as $i => $w ) : ?>
			<li data-reveal<?php echo daberau_delay( $i * 90 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?> class="flex gap-4 rounded-card border border-neutral-200 bg-white p-6">
				<span class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand"><?php echo daberau_icon( 'shield-check', 'h-5 w-5' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
				<div>
					<h3 class="font-bold text-ink"><?php echo esc_html( $w['title'] ); ?></h3>
					<p class="mt-1.5 leading-relaxed text-neutral-600"><?php echo esc_html( $w['body'] ); ?></p>
				</div>
			</li>
		<?php endforeach; ?>
	</ul>
<?php daberau_section_close(); ?>
<?php endif; ?>

<?php if ( daberau_show( $f, 'tools' ) ) : ?>
<?php daberau_section_open( 'tools-title', 'muted' ); ?>
	<?php daberau_section_heading( array( 'id' => 'tools-title', 'eyebrow' => $f['tools_eyebrow'], 'title' => $f['tools_title'], 'sub' => $f['tools_sub'] ) ); ?>
	<?php get_template_part( 'template-parts/tech-chips', null, array( 'items' => daberau_lines( $f['tools_items'] ), 'cols' => 'grid-cols-2 sm:grid-cols-4' ) ); ?>
<?php daberau_section_close(); ?>
<?php endif; ?>

<?php
get_footer();
