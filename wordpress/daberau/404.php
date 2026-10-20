<?php
/**
 * Page not found.
 *
 * @package Daberau
 */

defined( 'ABSPATH' ) || exit;

get_header();

$n = daberau_default( 'microcopy.notFound' );
?>
<div class="bg-neutral-50">
	<div class="mx-auto flex min-h-[60vh] w-full max-w-[1200px] flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
		<p class="text-[72px] font-extrabold leading-none tracking-tight text-brand md:text-[112px]">404</p>
		<h1 class="mt-6 text-[32px] font-extrabold tracking-tight text-ink md:text-[48px]"><?php echo esc_html( $n['title'] ); ?></h1>
		<p class="mt-3 text-lg text-neutral-600"><?php echo esc_html( $n['body'] ); ?></p>
		<div class="mt-8 flex flex-col gap-3 sm:flex-row">
			<?php echo daberau_button( home_url( '/' ), $n['primary']['label'], 'primary', 'lg' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			<?php echo daberau_button( daberau_url( 'services' ), $n['secondary']['label'], 'secondary', 'lg' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		</div>
	</div>
</div>
<?php
get_footer();
