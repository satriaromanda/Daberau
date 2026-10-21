<?php
/**
 * Service page. Edit it in Services → (service) → "Page content (Daberau)".
 * Section headings shared by all services are in Customizer → Daberau → Service page headings.
 *
 * @package Daberau
 */

defined( 'ABSPATH' ) || exit;

$post_obj = get_queried_object();
$f        = daberau_fields( $post_obj, 'service' );
$card     = daberau_service_card( $post_obj );
$eb       = daberau_default( 'eyebrows.serviceDetail' );

add_action(
	'wp_footer',
	function () use ( $card ) {
		daberau_json_ld( array( '@context' => 'https://schema.org', '@type' => 'Service', 'name' => $card['name'], 'description' => $card['short'], 'url' => $card['url'], 'provider' => array( '@type' => 'Organization', 'name' => get_bloginfo( 'name' ) ) ) );
	}
);

get_header();

ob_start();
?>
<span class="inline-flex items-center gap-3">
	<?php get_template_part( 'template-parts/icon-tile', null, array( 'icon' => $f['icon'], 'size' => 'sm' ) ); ?>
	<span class="text-[15px] font-semibold text-ink"><?php echo esc_html( $card['name'] ); ?></span>
</span>
<?php
$eyebrow = ob_get_clean();
$actions = daberau_button( daberau_url( 'form' ), $f['cta'], 'primary', 'lg' ) . ( $f['micro'] ? '<p class="mt-3 text-sm text-neutral-600">' . esc_html( $f['micro'] ) . '</p>' : '' );

get_template_part(
	'template-parts/page-hero',
	null,
	array(
		'crumbs'    => array( array( daberau_default( 'nav.servicesLabel' ), daberau_url( 'services' ) ), array( $card['name'] ) ),
		'eyebrow'   => $eyebrow,
		'title'     => $f['h1'],
		'sub'       => $f['sub'],
		'actions'   => $actions,
		'image'     => $card['image'],
		'image_alt' => $card['alt'],
	)
);
?>

<?php if ( daberau_show( $f, 'problem' ) ) : ?>
<?php daberau_section_open( 'problem-title' ); ?>
	<?php daberau_section_heading( array( 'id' => 'problem-title', 'eyebrow' => $eb['problem'], 'title' => $f['problem_title'], 'sub' => daberau_mod( 'svc_problem_sub' ) ) ); ?>
	<ul class="grid gap-4 lg:grid-cols-3">
		<?php foreach ( daberau_lines( $f['problem'] ) as $i => $p ) : ?>
			<li data-reveal<?php echo daberau_delay( $i * 90 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?> class="flex gap-4 rounded-card border border-neutral-200 bg-white p-6">
				<span class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-600"><?php echo daberau_icon( 'alert-circle', 'h-5 w-5' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
				<span class="pt-1.5 text-[17px] leading-relaxed text-ink"><?php echo esc_html( $p ); ?></span>
			</li>
		<?php endforeach; ?>
	</ul>
<?php daberau_section_close(); ?>
<?php endif; ?>

<?php if ( daberau_show( $f, 'deliver' ) ) : ?>
<?php daberau_section_open( 'deliver-title', 'muted' ); ?>
	<?php daberau_section_heading( array( 'id' => 'deliver-title', 'eyebrow' => $eb['deliver'], 'title' => daberau_mod( 'svc_deliver_title' ), 'sub' => daberau_mod( 'svc_deliver_sub' ) ) ); ?>
	<ul class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
		<?php foreach ( daberau_lines( $f['deliver'] ) as $i => $d ) : ?>
			<li data-reveal<?php echo daberau_delay( ( $i % 3 ) * 70 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?> class="flex items-center gap-3 rounded-card border border-neutral-200 bg-white px-5 py-4 font-semibold text-ink">
				<span class="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand"><?php echo daberau_icon( 'check', 'h-4 w-4' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
				<?php echo esc_html( $d ); ?>
			</li>
		<?php endforeach; ?>
	</ul>
<?php daberau_section_close(); ?>
<?php endif; ?>

<?php if ( daberau_show( $f, 'benefits' ) ) : ?>
<?php daberau_section_open( 'benefits-title' ); ?>
	<?php daberau_section_heading( array( 'id' => 'benefits-title', 'eyebrow' => $eb['benefits'], 'title' => daberau_mod( 'svc_benefits_title' ), 'sub' => daberau_mod( 'svc_benefits_sub' ) ) ); ?>
	<ul class="grid gap-4 md:grid-cols-3">
		<?php foreach ( daberau_lines( $f['benefits'], array( 'title', 'body' ) ) as $i => $b ) : ?>
			<?php get_template_part( 'template-parts/text-card', null, array( 'tag' => 'li', 'number' => $i + 1, 'title' => $b['title'], 'body' => $b['body'], 'delay' => $i * 90 ) ); ?>
		<?php endforeach; ?>
	</ul>
<?php daberau_section_close(); ?>
<?php endif; ?>

<?php if ( daberau_show( $f, 'process' ) ) : ?>
<?php daberau_section_open( 'process-title', 'muted' ); ?>
	<?php daberau_section_heading( array( 'id' => 'process-title', 'eyebrow' => $eb['process'], 'title' => daberau_mod( 'svc_process_title' ), 'sub' => daberau_mod( 'svc_process_sub' ) ) ); ?>
	<?php get_template_part( 'template-parts/process-steps', null, array( 'steps' => daberau_lines( $f['process'], array( 'title', 'body' ) ) ) ); ?>
<?php daberau_section_close(); ?>
<?php endif; ?>

<?php $tech = daberau_lines( $f['tech'] ); ?>
<?php if ( $tech && daberau_show( $f, 'tech' ) ) : ?>
	<?php daberau_section_open( 'tech-title' ); ?>
		<?php daberau_section_heading( array( 'id' => 'tech-title', 'eyebrow' => $eb['tech'], 'title' => daberau_mod( 'svc_tech_title' ), 'sub' => daberau_mod( 'svc_tech_sub' ) ) ); ?>
		<?php get_template_part( 'template-parts/tech-chips', null, array( 'items' => $tech ) ); ?>
	<?php daberau_section_close(); ?>
<?php endif; ?>

<?php $faqs = daberau_lines( $f['faqs'], array( 'q', 'a' ) ); ?>
<?php if ( $faqs && daberau_show( $f, 'faq' ) ) : ?>
	<?php daberau_section_open( 'faq-title', 'muted' ); ?>
		<?php daberau_section_heading( array( 'id' => 'faq-title', 'eyebrow' => $eb['faq'], 'title' => daberau_mod( 'svc_faq_title' ), 'sub' => daberau_mod( 'svc_faq_sub' ) ) ); ?>
		<div class="mx-auto max-w-3xl"><?php get_template_part( 'template-parts/faq-accordion', null, array( 'items' => $faqs ) ); ?></div>
	<?php daberau_section_close(); ?>
<?php endif; ?>

<?php
$related = array();
foreach ( daberau_lines( $f['related'] ) as $slug ) {
	$rel = get_page_by_path( sanitize_title( $slug ), OBJECT, 'daberau_service' );
	if ( $rel && 'publish' === $rel->post_status && $rel->ID !== $post_obj->ID ) {
		$related[] = daberau_service_card( $rel );
	}
}
?>
<?php if ( $related && daberau_show( $f, 'related' ) ) : ?>
	<?php daberau_section_open( 'related-title' ); ?>
		<?php daberau_section_heading( array( 'id' => 'related-title', 'eyebrow' => $eb['related'], 'title' => daberau_mod( 'svc_related_title' ), 'sub' => daberau_mod( 'svc_related_sub' ) ) ); ?>
		<div class="grid gap-4 md:grid-cols-3">
			<?php foreach ( $related as $i => $s ) : ?>
				<?php get_template_part( 'template-parts/service-card', null, array( 'service' => $s, 'index' => $i ) ); ?>
			<?php endforeach; ?>
		</div>
	<?php daberau_section_close(); ?>
<?php endif; ?>

<?php
get_footer();
