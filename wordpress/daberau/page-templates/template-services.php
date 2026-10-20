<?php
/**
 * Template Name: Services overview
 *
 * @package Daberau
 */

defined( 'ABSPATH' ) || exit;

get_header();

$f        = daberau_fields();
$o        = daberau_default( 'servicesOverview' );
$promo    = daberau_default( 'nav.megaPromo' );
$services = array_map( 'daberau_service_card', daberau_services() );

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

<?php daberau_section_open( 'grid-title' ); ?>
	<?php daberau_section_heading( array( 'id' => 'grid-title', 'eyebrow' => $f['grid_eyebrow'], 'title' => $f['grid_title'], 'sub' => $f['grid_sub'] ) ); ?>
	<div data-services-filter>
		<div role="group" aria-label="<?php esc_attr_e( 'Filter services by what you need', 'daberau' ); ?>" class="flex flex-wrap gap-2">
			<?php foreach ( $o['filters'] as $filter ) : ?>
				<button type="button" aria-pressed="false" data-filter="<?php echo esc_attr( $filter['id'] ); ?>" class="filter-chip rounded-full border border-neutral-300 bg-white px-4 py-2 text-[15px] font-medium text-neutral-700 transition-colors hover:border-neutral-400 hover:text-ink"><?php echo esc_html( $filter['label'] ); ?></button>
			<?php endforeach; ?>
		</div>
		<p class="sr-only" aria-live="polite" data-filter-status></p>
		<div hidden data-not-sure class="mt-6 flex flex-col gap-3 rounded-card border border-neutral-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
			<p class="text-[15px] text-ink"><span class="font-bold"><?php echo esc_html( $promo['title'] ); ?></span> <?php echo esc_html( $promo['body'] ); ?></p>
			<a href="<?php echo esc_url( daberau_url( 'form' ) ); ?>" class="inline-flex shrink-0 items-center gap-1 font-semibold text-brand hover:text-brand-700"><?php echo esc_html( str_replace( ' →', '', $promo['cta']['label'] ) ); ?> <?php echo daberau_icon( 'arrow-right', 'h-4 w-4' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></a>
		</div>
		<div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			<?php foreach ( $services as $i => $s ) : ?>
				<?php get_template_part( 'template-parts/service-card', null, array( 'service' => $s, 'index' => $i, 'scope' => true ) ); ?>
			<?php endforeach; ?>
		</div>
	</div>
<?php daberau_section_close(); ?>

<?php daberau_section_open( 'bundled-title', 'muted' ); ?>
	<div data-reveal class="flex flex-col gap-6 rounded-card border border-neutral-200 bg-white p-8 md:flex-row md:items-center md:justify-between md:p-10">
		<div class="flex gap-5">
			<span class="hidden h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand sm:inline-flex"><?php echo daberau_icon( 'layers', 'h-6 w-6' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
			<div>
				<h2 id="bundled-title" class="text-[24px] font-bold text-ink md:text-[28px]"><?php echo daberau_accent( $f['bundled_title'] ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></h2>
				<p class="mt-2 max-w-xl text-lg text-neutral-600"><?php echo esc_html( $f['bundled_sub'] ); ?></p>
			</div>
		</div>
		<?php echo daberau_button( daberau_url( 'form' ), daberau_mod( 'cta_label' ), 'primary', 'lg', array( 'class' => 'shrink-0' ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	</div>
<?php daberau_section_close(); ?>

<?php daberau_section_open( 'tech-title' ); ?>
	<?php daberau_section_heading( array( 'id' => 'tech-title', 'eyebrow' => $f['tech_eyebrow'], 'title' => $f['tech_title'], 'sub' => $f['tech_sub'] ) ); ?>
	<?php get_template_part( 'template-parts/tech-chips', null, array( 'items' => daberau_lines( $f['tech_items'] ) ) ); ?>
<?php daberau_section_close(); ?>

<?php $faqs = daberau_faqs( 'services-page' ); ?>
<?php if ( $faqs ) : ?>
	<?php daberau_section_open( 'faq-title', 'muted' ); ?>
		<?php daberau_section_heading( array( 'id' => 'faq-title', 'eyebrow' => $f['faq_eyebrow'], 'title' => $f['faq_title'], 'sub' => $f['faq_sub'] ) ); ?>
		<div class="mx-auto max-w-3xl"><?php get_template_part( 'template-parts/faq-accordion', null, array( 'items' => $faqs, 'html' => true ) ); ?></div>
	<?php daberau_section_close(); ?>
<?php endif; ?>

<?php
get_footer();
