<?php
/**
 * Pre-footer CTA, footer, cookie banner, sticky mobile CTA and WhatsApp button.
 *
 * @package Daberau
 */

defined( 'ABSPATH' ) || exit;

$phone   = daberau_mod( 'phone' );
$email   = daberau_mod( 'email' );
$socials = array();
foreach ( array( 'linkedin' => 'LinkedIn', 'instagram' => 'Instagram', 'facebook' => 'Facebook', 'youtube' => 'YouTube' ) as $key => $label ) {
	if ( daberau_mod( $key ) ) {
		$socials[] = array( $key, $label, daberau_mod( $key ) );
	}
}
$columns = array(
	array( __( 'Services', 'daberau' ), array_map( function ( $s ) { return array( 'label' => $s['name'], 'url' => $s['url'], 'external' => false ); }, array_map( 'daberau_service_card', daberau_services() ) ) ),
	array( __( 'Company', 'daberau' ), daberau_default_menu( 'footer_company' ) ),
	array( __( 'Help', 'daberau' ), daberau_default_menu( 'footer_help' ) ),
	array( __( 'Legal', 'daberau' ), daberau_default_menu( 'footer_legal' ) ),
);
?>
</main>

<?php if ( daberau_show_prefooter() ) : ?>
<section aria-labelledby="prefooter-title" class="bg-white pb-16 pt-4 md:pb-24">
	<div class="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
		<div class="relative overflow-hidden rounded-card bg-ink px-6 py-10 text-white md:px-12 md:py-14">
			<span aria-hidden="true" class="absolute inset-y-0 left-0 w-1.5 bg-brand"></span>
			<div class="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
				<div class="max-w-2xl">
					<h2 id="prefooter-title" class="text-[26px] font-bold leading-tight md:text-[32px]"><?php echo daberau_accent( daberau_mod( 'prefooter_title' ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></h2>
					<p class="mt-3 text-lg text-neutral-300"><?php echo esc_html( daberau_mod( 'prefooter_body' ) ); ?></p>
				</div>
				<div class="flex shrink-0 flex-col gap-3 sm:flex-row">
					<?php echo daberau_button( daberau_url( 'form' ), daberau_mod( 'cta_label' ), 'primary', 'lg' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					<?php echo daberau_button( daberau_whatsapp_url(), daberau_default( 'microcopy.chatWhatsApp' ), 'inverse', 'lg', array( 'external' => true, 'icon' => daberau_whatsapp_icon( 'h-5 w-5' ) ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				</div>
			</div>
		</div>
	</div>
</section>
<?php endif; ?>

<footer class="border-t border-neutral-200 bg-neutral-50">
	<div class="mx-auto w-full max-w-[1200px] px-4 py-14 sm:px-6 md:py-16 lg:px-8">
		<div class="grid gap-10 lg:grid-cols-[1.4fr_2.6fr]">
			<div>
				<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="inline-block rounded-md" aria-label="<?php echo esc_attr( sprintf( /* translators: %s: site name */ __( '%s home', 'daberau' ), get_bloginfo( 'name' ) ) ); ?>">
					<?php echo daberau_logo( 'full', 'h-20 w-auto' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				</a>
				<p class="mt-5 max-w-xs text-[15px] font-medium leading-relaxed text-ink"><?php echo esc_html( daberau_mod( 'tagline' ) ); ?></p>
				<ul class="mt-5 space-y-3 text-[15px] text-neutral-600">
					<li class="flex gap-3"><?php echo daberau_icon( 'map-pin', 'mt-0.5 h-4 w-4 shrink-0 text-neutral-500' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?><span><?php echo esc_html( daberau_mod( 'address' ) ); ?></span></li>
					<li class="flex gap-3"><?php echo daberau_icon( 'clock', 'mt-0.5 h-4 w-4 shrink-0 text-neutral-500' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?><span><span class="sr-only"><?php esc_html_e( 'Business hours:', 'daberau' ); ?> </span><?php echo esc_html( daberau_mod( 'hours' ) ); ?></span></li>
					<li class="flex gap-3"><?php echo daberau_icon( 'phone', 'mt-0.5 h-4 w-4 shrink-0 text-neutral-500' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?><a href="tel:<?php echo esc_attr( preg_replace( '/[^\d+]/', '', $phone ) ); ?>" class="hover:text-brand"><?php echo esc_html( $phone ); ?></a></li>
					<li class="flex gap-3"><?php echo daberau_icon( 'mail', 'mt-0.5 h-4 w-4 shrink-0 text-neutral-500' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?><a href="mailto:<?php echo esc_attr( $email ); ?>" class="hover:text-brand"><?php echo esc_html( $email ); ?></a></li>
				</ul>
				<?php if ( $socials ) : ?>
					<ul class="mt-6 flex gap-2" aria-label="<?php esc_attr_e( 'Social media', 'daberau' ); ?>">
						<?php foreach ( $socials as $s ) : ?>
							<li><a href="<?php echo esc_url( $s[2] ); ?>" target="_blank" rel="noopener noreferrer" aria-label="<?php echo esc_attr( $s[1] ); ?>" class="inline-flex h-10 w-10 items-center justify-center rounded-btn border border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:text-brand"><?php echo daberau_icon( $s[0], 'h-[18px] w-[18px]' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></a></li>
						<?php endforeach; ?>
					</ul>
				<?php endif; ?>
			</div>

			<div class="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:grid-cols-[1.3fr_1fr_0.8fr_1fr]">
				<?php foreach ( $columns as $col ) : ?>
					<div>
						<h2 class="text-sm font-bold uppercase tracking-wider text-ink"><?php echo esc_html( $col[0] ); ?></h2>
						<ul class="mt-4 space-y-2.5">
							<?php foreach ( $col[1] as $link ) : ?>
								<li><a href="<?php echo esc_url( $link['url'] ); ?>" class="text-[15px] text-neutral-600 transition-colors hover:text-brand"<?php echo $link['external'] ? ' target="_blank" rel="noopener noreferrer"' : ''; ?>><?php echo esc_html( $link['label'] ); ?></a></li>
							<?php endforeach; ?>
						</ul>
					</div>
				<?php endforeach; ?>
			</div>
		</div>

		<div class="mt-12 flex flex-col gap-3 border-t border-neutral-200 pt-6 text-sm text-neutral-600 md:flex-row md:items-center md:justify-between">
			<p><?php echo esc_html( daberau_mod( 'copyright' ) ); ?> <span aria-hidden="true">·</span> <?php echo esc_html( daberau_mod( 'legal_name' ) ); ?></p>
			<ul class="flex gap-4">
				<?php foreach ( daberau_default_menu( 'footer_legal' ) as $link ) : ?>
					<li><a href="<?php echo esc_url( $link['url'] ); ?>" class="underline-offset-4 hover:text-brand hover:underline"><?php echo esc_html( $link['label'] ); ?></a></li>
				<?php endforeach; ?>
			</ul>
		</div>
	</div>
</footer>

<a href="<?php echo esc_url( daberau_whatsapp_url() ); ?>" target="_blank" rel="noopener noreferrer" aria-label="<?php echo esc_attr( daberau_default( 'microcopy.chatWhatsApp' ) . '. ' . daberau_default( 'microcopy.whatsappTooltip' ) ); ?>" class="wa-fab group fixed bottom-5 right-4 z-30 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#128C7E] text-white shadow-[0_8px_24px_-8px_rgba(0,0,0,0.35)] transition-[bottom,background-color] duration-300 hover:bg-[#0e7368] sm:right-6 lg:bottom-6">
	<?php echo daberau_whatsapp_icon( 'relative h-7 w-7' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	<span role="tooltip" class="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-btn bg-ink px-3 py-2 text-sm font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 sm:block"><?php echo esc_html( daberau_default( 'microcopy.whatsappTooltip' ) ); ?></span>
</a>

<div data-sticky-cta aria-hidden="true" inert class="fixed inset-x-0 bottom-0 z-30 translate-y-full border-t border-neutral-200 bg-white/95 px-4 py-3 backdrop-blur transition-transform duration-300 lg:hidden">
	<?php echo daberau_button( daberau_url( 'form' ), daberau_mod( 'sticky_label' ), 'primary', 'lg', array( 'class' => 'w-full' ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
</div>

<?php get_template_part( 'template-parts/cookie-banner' ); ?>
<?php wp_footer(); ?>
</body>
</html>
