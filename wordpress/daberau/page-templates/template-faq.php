<?php
/**
 * Template Name: FAQ
 *
 * Questions come from FAQs (one section per FAQ Group).
 *
 * @package Daberau
 */

defined( 'ABSPATH' ) || exit;

$groups = array();
$all    = array();
foreach ( daberau_faq_groups() as $term ) {
	$items = daberau_faqs( $term->slug );
	if ( $items ) {
		$groups[] = array( $term, $items );
		$all      = array_merge( $all, $items );
	}
}

add_action(
	'wp_footer',
	function () use ( $all ) {
		$entities = array();
		foreach ( $all as $q ) {
			$entities[] = array( '@type' => 'Question', 'name' => $q['q'], 'acceptedAnswer' => array( '@type' => 'Answer', 'text' => wp_strip_all_tags( $q['a'] ) ) );
		}
		daberau_json_ld( array( '@context' => 'https://schema.org', '@type' => 'FAQPage', 'mainEntity' => $entities ) );
	}
);

get_header();

$f = daberau_fields();

ob_start();
?>
<nav aria-label="<?php esc_attr_e( 'FAQ categories', 'daberau' ); ?>">
	<ul class="flex flex-wrap gap-2">
		<?php foreach ( $groups as $g ) : ?>
			<li><a href="#<?php echo esc_attr( $g[0]->slug ); ?>" class="inline-flex rounded-full border border-neutral-300 bg-white px-4 py-2 text-[15px] font-medium text-neutral-700 hover:border-neutral-400 hover:text-ink"><?php echo esc_html( $g[0]->name ); ?></a></li>
		<?php endforeach; ?>
	</ul>
</nav>
<?php
$chips = ob_get_clean();

get_template_part(
	'template-parts/page-hero',
	null,
	array(
		'crumbs'  => array( array( get_the_title() ) ),
		'title'   => $f['hero_h1'],
		'sub'     => $f['hero_sub'],
		'actions' => $chips,
	)
);
?>

<?php daberau_section_open(); ?>
	<div class="mx-auto max-w-3xl space-y-12">
		<?php foreach ( $groups as $g ) : ?>
			<section id="<?php echo esc_attr( $g[0]->slug ); ?>" aria-labelledby="<?php echo esc_attr( $g[0]->slug ); ?>-h">
				<h2 id="<?php echo esc_attr( $g[0]->slug ); ?>-h" class="mb-4 text-[24px] font-bold text-ink"><?php echo esc_html( $g[0]->name ); ?></h2>
				<?php get_template_part( 'template-parts/faq-accordion', null, array( 'items' => $g[1], 'html' => true ) ); ?>
			</section>
		<?php endforeach; ?>

		<div class="flex flex-col items-start gap-4 rounded-card border border-neutral-200 bg-neutral-50 p-6 sm:flex-row sm:items-center sm:justify-between">
			<p class="text-lg font-semibold text-ink"><?php echo esc_html( $f['bottom'] ); ?></p>
			<?php if ( daberau_whatsapp_on() ) : ?>
				<?php echo daberau_button( daberau_whatsapp_url(), daberau_mod( 'whatsapp_label' ), 'secondary', 'md', array( 'external' => true, 'icon' => daberau_whatsapp_icon( 'h-5 w-5 text-[#128C7E]' ) ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			<?php else : ?>
				<?php echo daberau_button( 'mailto:' . daberau_mod( 'email' ), daberau_default( 'microcopy.emailUs' ), 'secondary', 'md', array( 'icon' => daberau_icon( 'mail', 'h-5 w-5 text-brand' ) ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			<?php endif; ?>
		</div>
	</div>
<?php daberau_section_close(); ?>

<?php
get_footer();
