<?php
/**
 * Home page. Edit the copy in Pages → Home → "Page content (Daberau)".
 *
 * @package Daberau
 */

defined( 'ABSPATH' ) || exit;

get_header();

$f        = daberau_fields( get_queried_object_id() ? get_queried_object_id() : null, 'home' );
$services = array_map( 'daberau_service_card', daberau_services() );
?>

<section class="relative overflow-hidden border-b border-neutral-200/70 bg-gradient-to-b from-neutral-50 to-white">
	<div class="mx-auto grid w-full max-w-[1200px] items-center gap-12 px-4 pb-16 pt-12 sm:px-6 md:pb-24 md:pt-16 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12 lg:px-8 lg:pt-20">
		<div>
			<?php if ( $f['hero_eyebrow'] ) : ?>
				<p class="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-sm font-semibold text-neutral-700">
					<span aria-hidden="true" class="h-2 w-2 rounded-full bg-brand"></span>
					<?php echo esc_html( $f['hero_eyebrow'] ); ?>
				</p>
			<?php endif; ?>
			<h1 class="mt-5 text-[36px] font-extrabold leading-[1.08] tracking-tight text-ink md:text-[56px]"><?php echo daberau_accent( $f['hero_h1'] ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></h1>
			<p class="mt-5 max-w-xl text-lg leading-relaxed text-neutral-600 md:text-xl"><?php echo esc_html( $f['hero_sub'] ); ?></p>
			<div class="mt-8 flex flex-col gap-3 sm:flex-row">
				<?php echo daberau_button( daberau_url( 'form' ), $f['hero_primary'], 'primary', 'lg' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				<?php echo daberau_button( daberau_url( 'services' ), $f['hero_secondary'], 'secondary', 'lg' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			</div>
			<?php if ( $f['hero_micro'] ) : ?>
				<p class="mt-4 flex items-center gap-2 text-sm text-neutral-600"><?php echo daberau_icon( 'check-circle', 'h-4 w-4 text-success' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?><?php echo esc_html( $f['hero_micro'] ); ?></p>
			<?php endif; ?>
		</div>
		<?php if ( $f['hero_image'] ) : ?>
			<div class="overflow-hidden rounded-card border border-neutral-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_20px_48px_-20px_rgba(191,30,46,0.25)]">
				<img src="<?php echo esc_url( $f['hero_image'] ); ?>" alt="<?php echo esc_attr( $f['hero_image_alt'] ); ?>" width="1600" height="852" fetchpriority="high" class="h-auto w-full">
			</div>
		<?php endif; ?>
	</div>
</section>

<?php daberau_section_open( 'pain-title' ); ?>
	<?php daberau_section_heading( array( 'id' => 'pain-title', 'eyebrow' => $f['pain_eyebrow'], 'title' => $f['pain_title'], 'sub' => $f['pain_sub'] ) ); ?>
	<ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
		<?php foreach ( daberau_lines( $f['pain_cards'], array( 'icon', 'title', 'body' ) ) as $i => $c ) : ?>
			<?php get_template_part( 'template-parts/text-card', null, array( 'tag' => 'li', 'icon' => $c['icon'], 'title' => $c['title'], 'body' => $c['body'], 'delay' => $i * 90 ) ); ?>
		<?php endforeach; ?>
	</ul>
	<?php if ( $f['pain_closing'] ) : ?>
		<p data-reveal class="mt-8 flex items-start gap-3 rounded-card border border-brand/15 bg-brand-50/60 px-5 py-4 text-lg font-semibold text-ink"><?php echo daberau_icon( 'check-circle', 'mt-1 h-5 w-5 shrink-0 text-brand' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?><?php echo esc_html( $f['pain_closing'] ); ?></p>
	<?php endif; ?>
<?php daberau_section_close(); ?>

<?php daberau_section_open( 'services-title', 'muted' ); ?>
	<?php daberau_section_heading( array( 'id' => 'services-title', 'eyebrow' => $f['services_eyebrow'], 'title' => $f['services_title'], 'sub' => $f['services_sub'] ) ); ?>
	<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
		<?php foreach ( $services as $i => $s ) : ?>
			<?php get_template_part( 'template-parts/service-card', null, array( 'service' => $s, 'index' => $i ) ); ?>
		<?php endforeach; ?>
	</div>
	<div class="mt-10 flex justify-center">
		<?php echo daberau_button( daberau_url( 'services' ), $f['services_cta'], 'secondary' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	</div>
<?php daberau_section_close(); ?>

<?php $industries = daberau_industries(); ?>
<?php if ( $industries ) : ?>
	<?php daberau_section_open( 'industries-title' ); ?>
		<?php daberau_section_heading( array( 'id' => 'industries-title', 'eyebrow' => $f['industries_eyebrow'], 'title' => $f['industries_title'], 'sub' => $f['industries_sub'] ) ); ?>
		<ul class="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-3">
			<?php foreach ( $industries as $i => $ind ) : ?>
				<li data-reveal<?php echo daberau_delay( ( $i % 3 ) * 90 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
					<a href="<?php echo esc_url( daberau_url( 'industries' ) . '#' . $ind['slug'] ); ?>" class="card-interactive group relative block aspect-[4/3] overflow-hidden rounded-card border border-neutral-200">
						<?php get_template_part( 'template-parts/industry-visual', null, array( 'industry' => $ind ) ); ?>
						<span aria-hidden="true" class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent"></span>
						<span class="absolute inset-x-0 bottom-0 flex items-center gap-2.5 p-4 text-[15px] font-bold leading-snug text-white md:p-5 md:text-[17px]"><?php echo daberau_icon( $ind['icon'], 'h-5 w-5 shrink-0' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?><?php echo esc_html( $ind['name'] ); ?></span>
					</a>
				</li>
			<?php endforeach; ?>
		</ul>
		<div class="mt-10 flex justify-center">
			<a href="<?php echo esc_url( daberau_url( 'industries' ) ); ?>" class="inline-flex items-center gap-1.5 font-semibold text-brand hover:text-brand-700"><?php echo esc_html( $f['industries_link'] ); ?><?php echo daberau_icon( 'arrow-right', 'h-4 w-4' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></a>
		</div>
	<?php daberau_section_close(); ?>
<?php endif; ?>

<?php daberau_section_open( 'why-title', 'muted' ); ?>
	<?php daberau_section_heading( array( 'id' => 'why-title', 'eyebrow' => $f['why_eyebrow'], 'title' => $f['why_title'], 'sub' => $f['why_sub'] ) ); ?>
	<ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
		<?php foreach ( daberau_lines( $f['why_points'], array( 'icon', 'title', 'body' ) ) as $i => $p ) : ?>
			<?php get_template_part( 'template-parts/text-card', null, array( 'tag' => 'li', 'icon' => $p['icon'], 'title' => $p['title'], 'body' => $p['body'], 'delay' => $i * 90 ) ); ?>
		<?php endforeach; ?>
	</ul>
<?php daberau_section_close(); ?>

<?php daberau_section_open( 'process-title' ); ?>
	<?php daberau_section_heading( array( 'id' => 'process-title', 'eyebrow' => $f['process_eyebrow'], 'title' => $f['process_title'], 'sub' => $f['process_sub'] ) ); ?>
	<?php get_template_part( 'template-parts/process-steps', null, array( 'steps' => daberau_lines( $f['process_steps'], array( 'icon', 'title', 'body' ) ) ) ); ?>
	<div class="mt-10 flex justify-center">
		<a href="<?php echo esc_url( daberau_url( 'how-we-work' ) ); ?>" class="inline-flex items-center gap-1.5 font-semibold text-brand hover:text-brand-700"><?php echo esc_html( str_replace( ' →', '', $f['process_link'] ) ); ?><?php echo daberau_icon( 'arrow-right', 'h-4 w-4' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></a>
	</div>
<?php daberau_section_close(); ?>

<?php
get_footer();
