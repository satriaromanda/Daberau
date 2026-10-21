<?php
/**
 * Full-screen mobile menu dialog.
 *
 * @package Daberau
 */

defined( 'ABSPATH' ) || exit;

$services = $args['services'];
$links    = $args['links'];
$phone    = daberau_mod( 'phone' );
$email    = daberau_mod( 'email' );
?>
<div id="mobile-menu" role="dialog" aria-modal="true" aria-label="<?php esc_attr_e( 'Menu', 'daberau' ); ?>" hidden data-mobile-menu class="fixed inset-0 z-50 flex flex-col bg-white lg:hidden">
	<div class="flex h-16 items-center justify-between border-b border-neutral-200 px-4 sm:px-6">
		<a href="<?php echo esc_url( home_url( '/' ) ); ?>" aria-label="<?php echo esc_attr( sprintf( /* translators: %s: site name */ __( '%s home', 'daberau' ), get_bloginfo( 'name' ) ) ); ?>" class="rounded-md">
			<?php echo daberau_logo( 'mark', 'h-9 w-9' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		</a>
		<button type="button" data-mobile-close aria-label="<?php esc_attr_e( 'Close menu', 'daberau' ); ?>" class="inline-flex h-11 w-11 items-center justify-center rounded-btn hover:bg-neutral-50">
			<?php echo daberau_icon( 'x', 'h-6 w-6' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		</button>
	</div>

	<nav aria-label="<?php esc_attr_e( 'Mobile', 'daberau' ); ?>" class="flex-1 overflow-y-auto px-2 py-4 sm:px-4">
		<ul class="space-y-1">
			<li>
				<button type="button" aria-expanded="false" aria-controls="m-services" data-disclosure class="flex w-full items-center justify-between rounded-btn px-3 py-3 text-left text-[17px] font-semibold text-ink hover:bg-neutral-50">
					<?php echo esc_html( daberau_default( 'nav.servicesLabel' ) ); ?>
					<?php echo daberau_icon( 'chevron-down', 'disclosure-chevron h-5 w-5 text-neutral-500 transition-transform' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				</button>
				<ul id="m-services" hidden class="mb-2 ml-3 border-l border-neutral-200 pl-3">
					<?php foreach ( $services as $s ) : ?>
						<?php $current = is_singular( 'daberau_service' ) && get_queried_object_id() === $s['id']; ?>
						<li><a href="<?php echo esc_url( $s['url'] ); ?>" <?php echo $current ? 'aria-current="page"' : ''; ?> class="block rounded-btn px-3 py-2.5 text-[15px] font-medium text-neutral-700 hover:bg-neutral-50 aria-[current=page]:text-brand"><?php echo esc_html( $s['name'] ); ?></a></li>
					<?php endforeach; ?>
					<li><a href="<?php echo esc_url( daberau_url( 'services' ) ); ?>" class="block rounded-btn px-3 py-2.5 text-[15px] font-semibold text-brand hover:bg-neutral-50"><?php echo esc_html( daberau_default( 'nav.allServices.label' ) ); ?> →</a></li>
				</ul>
			</li>
			<?php foreach ( $links as $link ) : ?>
				<?php $active = daberau_is_current( $link['url'] ); ?>
				<li><a href="<?php echo esc_url( $link['url'] ); ?>" <?php echo $active ? 'aria-current="page"' : ''; ?> class="flex items-center justify-between rounded-btn px-3 py-3 text-[17px] font-semibold <?php echo $active ? 'text-brand' : 'text-ink'; ?> hover:bg-neutral-50"><?php echo esc_html( $link['label'] ); ?></a></li>
			<?php endforeach; ?>
		</ul>

		<div class="mt-6 space-y-3 border-t border-neutral-200 px-3 pt-6">
			<a href="tel:<?php echo esc_attr( preg_replace( '/[^\d+]/', '', $phone ) ); ?>" class="flex items-center gap-3 text-[15px] text-neutral-700 hover:text-ink">
				<?php echo daberau_icon( 'phone', 'h-4 w-4 text-neutral-500' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?> <?php echo esc_html( $phone ); ?>
			</a>
			<a href="mailto:<?php echo esc_attr( $email ); ?>" class="flex items-center gap-3 text-[15px] text-neutral-700 hover:text-ink">
				<?php echo daberau_icon( 'mail', 'h-4 w-4 text-neutral-500' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?> <?php echo esc_html( $email ); ?>
			</a>
		</div>
	</nav>

	<div class="grid gap-2 border-t border-neutral-200 p-4 sm:px-6<?php echo daberau_whatsapp_on() ? ' sm:grid-cols-2' : ''; ?>">
		<?php echo daberau_button( daberau_url( 'form' ), daberau_mod( 'cta_label' ), 'primary', 'lg', array( 'attrs' => 'data-mobile-close-link' ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		<?php if ( daberau_whatsapp_on() ) : ?>
		<?php echo daberau_button( daberau_whatsapp_url(), daberau_mod( 'whatsapp_label' ), 'secondary', 'lg', array( 'external' => true, 'icon' => daberau_whatsapp_icon( 'h-5 w-5 text-[#128C7E]' ) ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		<?php endif; ?>
	</div>
</div>
