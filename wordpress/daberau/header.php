<?php
/**
 * Site header: skip link, logo, navigation with the services mega menu, and mobile controls.
 *
 * @package Daberau
 */

defined( 'ABSPATH' ) || exit;

$services        = array_map( 'daberau_service_card', daberau_services() );
$services_url    = daberau_url( 'services' );
$services_active = is_singular( 'daberau_service' ) || daberau_is_current( $services_url );
// "Services" is the mega menu and the logo links home, so menu items for those pages would only repeat them.
$skip_urls       = array( untrailingslashit( home_url( '/' ) ), untrailingslashit( $services_url ) );
$nav_links       = array_values(
	array_filter(
		daberau_default_menu( 'primary' ),
		function ( $link ) use ( $skip_urls ) {
			return ! in_array( untrailingslashit( strtok( $link['url'], '#' ) ), $skip_urls, true );
		}
	)
);
$nav_base        = 'nav-link relative inline-flex h-10 items-center gap-1 rounded-btn px-3 text-[15px] font-medium transition-colors hover:text-brand';
?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<?php wp_head(); ?>
</head>
<body <?php body_class( 'min-h-screen bg-white text-ink antialiased' ); ?>>
<?php wp_body_open(); ?>
<header class="site-header sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
	<a href="#main" class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-btn focus:bg-ink focus:px-4 focus:py-2 focus:text-white"><?php esc_html_e( 'Skip to content', 'daberau' ); ?></a>
	<div class="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-6 lg:h-[76px] lg:px-8">
		<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="flex shrink-0 items-center rounded-md" aria-label="<?php echo esc_attr( sprintf( /* translators: %s: site name */ __( '%s home', 'daberau' ), get_bloginfo( 'name' ) ) ); ?>">
			<?php echo daberau_logo( 'mark', 'h-9 w-9 lg:hidden' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			<?php echo daberau_logo( 'full', 'hidden h-[54px] w-auto lg:block' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		</a>

		<nav aria-label="<?php esc_attr_e( 'Main', 'daberau' ); ?>" class="hidden lg:block" data-main-nav>
			<ul class="flex items-center gap-0.5 xl:gap-1">
				<li data-mega>
					<button type="button" aria-expanded="false" aria-controls="services-menu" data-mega-trigger class="<?php echo esc_attr( $nav_base . ( $services_active ? ' text-brand' : ' text-neutral-700' ) ); ?>">
						<?php echo esc_html( daberau_default( 'nav.servicesLabel' ) ); ?>
						<?php echo daberau_icon( 'chevron-down', 'h-4 w-4 transition-transform mega-chevron' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
						<?php if ( $services_active ) : ?><span aria-hidden="true" class="absolute inset-x-3 -bottom-[17px] h-0.5 rounded-full bg-brand"></span><?php endif; ?>
					</button>
					<?php get_template_part( 'template-parts/mega-menu', null, array( 'services' => $services ) ); ?>
				</li>
				<?php foreach ( $nav_links as $link ) : ?>
					<?php $active = daberau_is_current( $link['url'] ); ?>
					<li>
						<a href="<?php echo esc_url( $link['url'] ); ?>" <?php echo $active ? 'aria-current="page"' : ''; ?> class="<?php echo esc_attr( $nav_base . ( $active ? ' text-brand' : ' text-neutral-700' ) ); ?>"<?php echo $link['external'] ? ' target="_blank" rel="noopener noreferrer"' : ''; ?>>
							<?php echo esc_html( $link['label'] ); ?>
							<?php if ( $active ) : ?><span aria-hidden="true" class="absolute inset-x-3 -bottom-[17px] h-0.5 rounded-full bg-brand"></span><?php endif; ?>
						</a>
					</li>
				<?php endforeach; ?>
			</ul>
		</nav>

		<div class="hidden lg:block">
			<?php echo daberau_button( daberau_url( 'form' ), daberau_mod( 'cta_label' ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		</div>

		<div class="flex items-center gap-1 lg:hidden">
			<a href="<?php echo esc_url( daberau_whatsapp_url() ); ?>" target="_blank" rel="noopener noreferrer" aria-label="<?php echo esc_attr( daberau_default( 'microcopy.chatWhatsApp' ) ); ?>" class="inline-flex h-11 w-11 items-center justify-center rounded-btn text-[#128C7E] hover:bg-neutral-50">
				<?php echo daberau_whatsapp_icon( 'h-6 w-6' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			</a>
			<button type="button" aria-label="<?php esc_attr_e( 'Open menu', 'daberau' ); ?>" aria-expanded="false" aria-controls="mobile-menu" data-mobile-open class="inline-flex h-11 w-11 items-center justify-center rounded-btn text-ink hover:bg-neutral-50">
				<?php echo daberau_icon( 'menu', 'h-6 w-6' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			</button>
		</div>
	</div>
</header>
<?php get_template_part( 'template-parts/mobile-menu', null, array( 'services' => $services, 'links' => $nav_links ) ); ?>
<main id="main" tabindex="-1" class="focus:outline-none">
