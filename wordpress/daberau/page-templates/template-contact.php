<?php
/**
 * Template Name: Contact
 *
 * @package Daberau
 */

defined( 'ABSPATH' ) || exit;

get_header();

$f       = daberau_fields();
$c       = daberau_default( 'contactPage' );
$address = daberau_mod( 'address' );
$phone   = daberau_mod( 'phone' );
$email   = daberau_mod( 'email' );
$tel     = 'tel:' . preg_replace( '/[^\d+]/', '', $phone );
$maps    = 'https://www.google.com/maps/search/?api=1&query=' . rawurlencode( $address );
$embed   = 'https://www.google.com/maps?q=' . rawurlencode( $address ) . '&output=embed';
$icons   = array( 'form' => 'file-text', 'email' => 'mail', 'whatsapp' => 'message-circle', 'support' => 'headset' );
$wa      = daberau_default( 'whatsapp' );
$options = $c['options'];
// With WhatsApp switched on, the "Prefer email?" card becomes a WhatsApp card.
if ( daberau_whatsapp_on() ) {
	foreach ( $options as $k => $o ) {
		if ( 'email' === $o['kind'] ) {
			$options[ $k ] = array( 'title' => $wa['contactOption']['title'], 'body' => $wa['contactOption']['body'], 'cta' => array( 'label' => daberau_mod( 'whatsapp_label' ) ), 'kind' => 'whatsapp' );
		}
	}
}

get_template_part(
	'template-parts/page-hero',
	null,
	array(
		'crumbs' => array( array( get_the_title() ) ),
		'title'  => $f['hero_h1'],
		'sub'    => $f['hero_sub'],
	)
);
?>

<?php if ( daberau_show( $f, 'options' ) ) : ?>
<section aria-labelledby="options-title" class="bg-white pt-12 md:pt-16">
	<div class="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
		<?php daberau_section_heading( array( 'id' => 'options-title', 'eyebrow' => $f['options_eyebrow'], 'title' => $f['options_title'], 'sub' => $f['options_sub'] ) ); ?>
		<ul class="grid gap-4 md:grid-cols-3">
			<?php foreach ( $options as $i => $o ) : ?>
				<?php
				$is_wa = 'whatsapp' === $o['kind'];
				$hrefs = array( 'whatsapp' => daberau_whatsapp_url(), 'email' => 'mailto:' . $email, 'support' => $tel, 'form' => '#contact-form' );
				$href  = $hrefs[ $o['kind'] ];
				?>
				<li data-reveal<?php echo daberau_delay( $i * 90 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?> class="flex flex-col rounded-card border border-neutral-200 bg-white p-6 md:p-7">
					<span class="inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand"><?php echo daberau_icon( $icons[ $o['kind'] ], 'h-7 w-7', array( 'stroke' => 2.2 ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
					<h3 class="mt-6 text-[19px] font-bold text-ink"><?php echo esc_html( $o['title'] ); ?></h3>
					<p class="mt-1.5 flex-1 leading-relaxed text-neutral-600"><?php echo esc_html( $o['body'] ); ?></p>
					<?php
					echo daberau_button( // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
						$href,
						$o['cta']['label'],
						'form' === $o['kind'] ? 'primary' : 'secondary',
						'md',
						array(
							'class'    => 'mt-5 self-start',
							'external' => $is_wa,
							'icon'     => $is_wa ? daberau_whatsapp_icon( 'h-4 w-4 text-[#128C7E]' ) : '',
						)
					);
					?>
				</li>
			<?php endforeach; ?>
		</ul>
	</div>
</section>
<?php endif; ?>

<?php daberau_section_open( 'form-title', 'white', 'id="contact-form"' ); ?>
	<?php daberau_section_heading( array( 'id' => 'form-title', 'eyebrow' => $f['form_eyebrow'], 'title' => $f['form_title'], 'sub' => $f['form_sub'] ) ); ?>
	<div class="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-12">
		<div><?php get_template_part( 'template-parts/contact-form' ); ?></div>
		<aside aria-labelledby="info-title">
			<div class="rounded-card border border-neutral-200 bg-neutral-50 p-6 md:p-8 lg:sticky lg:top-28">
				<h2 id="info-title" class="text-lg font-bold text-ink"><?php echo esc_html( $c['info']['title'] ); ?></h2>
				<dl class="mt-5 space-y-5 text-[15px]">
					<?php
					$rows = array_filter( array(
						array( 'map-pin', $c['info']['labels']['address'], esc_html( $address ) . '<a href="' . esc_url( $maps ) . '" target="_blank" rel="noopener noreferrer" class="mt-1 block font-semibold text-brand hover:text-brand-700">' . esc_html( $c['info']['mapsLink'] ) . ' →</a>' ),
						array( 'mail', $c['info']['labels']['email'], '<a href="mailto:' . esc_attr( $email ) . '" class="hover:text-brand">' . esc_html( $email ) . '</a>' ),
						array( 'phone', $c['info']['labels']['phone'], '<a href="' . esc_attr( $tel ) . '" class="hover:text-brand">' . esc_html( $phone ) . '</a>' ),
						daberau_whatsapp_on() ? array( 'message-circle', $wa['infoLabel'], '<a href="' . esc_url( daberau_whatsapp_url() ) . '" target="_blank" rel="noopener noreferrer" class="font-semibold text-brand hover:text-brand-700">' . esc_html( daberau_mod( 'whatsapp_label' ) ) . ' →</a>' ) : null,
						array( 'clock', $c['info']['labels']['hours'], esc_html( daberau_mod( 'hours_long' ) ) ),
					) );
					foreach ( $rows as $row ) :
						?>
						<div class="flex gap-3">
							<?php echo daberau_icon( $row[0], 'mt-0.5 h-5 w-5 shrink-0 text-neutral-500' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
							<div>
								<dt class="text-sm font-semibold text-neutral-600"><?php echo esc_html( $row[1] ); ?></dt>
								<dd class="mt-0.5 text-ink"><?php echo $row[2]; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- escaped above. ?></dd>
							</div>
						</div>
					<?php endforeach; ?>
				</dl>
				<p class="mt-6 border-t border-neutral-200 pt-5 text-sm text-neutral-600"><?php echo esc_html( $c['info']['micro'] ); ?></p>
			</div>
		</aside>
	</div>
<?php daberau_section_close(); ?>

<?php if ( daberau_show( $f, 'map' ) ) : ?>
<?php daberau_section_open( 'map-title', 'muted' ); ?>
	<?php daberau_section_heading( array( 'id' => 'map-title', 'eyebrow' => $f['map_eyebrow'], 'title' => $f['map_title'], 'sub' => $address ) ); ?>
	<div class="aspect-[4/3] overflow-hidden rounded-card border border-neutral-200 bg-neutral-100 md:aspect-[21/8]">
		<iframe title="<?php echo esc_attr( $c['map']['label'] ); ?>" src="<?php echo esc_url( $embed ); ?>" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="h-full w-full border-0"></iframe>
	</div>
	<div class="mt-5 flex justify-center">
		<?php echo daberau_button( $maps, $c['info']['mapsLink'], 'secondary', 'md', array( 'external' => true ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	</div>
<?php daberau_section_close(); ?>
<?php endif; ?>

<?php $faqs = daberau_faqs( 'contact-page' ); ?>
<?php if ( $faqs && daberau_show( $f, 'faq' ) ) : ?>
	<?php daberau_section_open( 'faq-title' ); ?>
		<?php daberau_section_heading( array( 'id' => 'faq-title', 'eyebrow' => $f['faq_eyebrow'], 'title' => $f['faq_title'], 'sub' => $f['faq_sub'] ) ); ?>
		<div class="mx-auto max-w-3xl"><?php get_template_part( 'template-parts/faq-accordion', null, array( 'items' => $faqs, 'html' => true ) ); ?></div>
	<?php daberau_section_close(); ?>
<?php endif; ?>

<?php
get_footer();
