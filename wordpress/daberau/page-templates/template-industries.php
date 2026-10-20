<?php
/**
 * Template Name: Industries
 *
 * Industries come from Industries in the admin menu (photo = featured image).
 *
 * @package Daberau
 */

defined( 'ABSPATH' ) || exit;

get_header();

$f          = daberau_fields();
$industries = daberau_industries();

ob_start();
?>
<nav aria-label="<?php esc_attr_e( 'Industries', 'daberau' ); ?>">
	<ul class="flex flex-wrap gap-2">
		<?php foreach ( $industries as $ind ) : ?>
			<li><a href="#<?php echo esc_attr( $ind['slug'] ); ?>" class="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-4 py-2 text-[15px] font-medium text-neutral-700 hover:border-neutral-400 hover:text-ink"><?php echo daberau_icon( $ind['icon'], 'h-4 w-4 text-brand' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?><?php echo esc_html( $ind['name'] ); ?></a></li>
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
		'actions' => $industries ? $chips : '',
	)
);
?>

<?php foreach ( $industries as $idx => $ind ) : ?>
	<?php $flip = 1 === $idx % 2; ?>
	<section id="<?php echo esc_attr( $ind['slug'] ); ?>" aria-labelledby="<?php echo esc_attr( $ind['slug'] ); ?>-title" class="py-16 md:py-24 <?php echo $flip ? 'border-y border-neutral-200/70 bg-neutral-50' : 'bg-white'; ?>">
		<div class="mx-auto grid w-full max-w-[1200px] items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
			<div data-reveal class="aspect-[4/3] overflow-hidden rounded-card border border-neutral-200 <?php echo $flip ? 'lg:order-2' : ''; ?>">
				<?php get_template_part( 'template-parts/industry-visual', null, array( 'industry' => $ind ) ); ?>
			</div>
			<div data-reveal<?php echo daberau_delay( 90 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
				<p class="inline-flex items-center gap-3">
					<?php get_template_part( 'template-parts/icon-tile', null, array( 'icon' => $ind['icon'], 'size' => 'sm' ) ); ?>
					<span class="text-[15px] font-semibold uppercase tracking-wider text-brand"><?php echo esc_html( $ind['name'] ); ?></span>
				</p>
				<h2 id="<?php echo esc_attr( $ind['slug'] ); ?>-title" class="mt-4 text-[30px] font-extrabold leading-[1.12] tracking-tight text-ink md:text-[40px]"><?php echo daberau_accent( $ind['title'] ? $ind['title'] : $ind['name'] ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></h2>
				<?php if ( $ind['body'] ) : ?>
					<p class="mt-4 text-lg leading-relaxed text-neutral-600"><?php echo esc_html( $ind['body'] ); ?></p>
				<?php endif; ?>

				<?php if ( $ind['challenges'] ) : ?>
					<h3 class="mt-8 text-sm font-bold uppercase tracking-wider text-neutral-500"><?php echo esc_html( $f['label_challenges'] ); ?></h3>
					<ul class="mt-3 space-y-3">
						<?php foreach ( $ind['challenges'] as $c ) : ?>
							<li class="flex gap-3">
								<?php echo daberau_icon( 'alert-circle', 'mt-0.5 h-5 w-5 shrink-0 text-brand' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
								<p class="leading-relaxed text-neutral-600"><span class="font-semibold text-ink"><?php echo esc_html( rtrim( $c['title'], '.' ) ); ?>.</span> <?php echo esc_html( $c['body'] ); ?></p>
							</li>
						<?php endforeach; ?>
					</ul>
				<?php endif; ?>

				<?php if ( $ind['services'] ) : ?>
					<h3 class="mt-8 text-sm font-bold uppercase tracking-wider text-neutral-500"><?php echo esc_html( $f['label_services'] ); ?></h3>
					<ul class="mt-3 flex flex-wrap gap-2">
						<?php foreach ( $ind['services'] as $s ) : ?>
							<li><a href="<?php echo esc_url( $s['url'] ); ?>" class="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3.5 py-2 text-[15px] font-semibold text-ink transition-colors hover:border-brand/40 hover:text-brand"><?php echo daberau_icon( $s['icon'], 'h-4 w-4 text-brand' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?><?php echo esc_html( $s['name'] ); ?></a></li>
						<?php endforeach; ?>
					</ul>
				<?php endif; ?>

				<a href="<?php echo esc_url( daberau_url( 'form' ) ); ?>" class="mt-8 inline-flex items-center gap-1.5 font-semibold text-brand hover:text-brand-700"><?php echo esc_html( str_replace( '[industry]', $ind['name'], $f['label_cta'] ) ); ?><?php echo daberau_icon( 'arrow-right', 'h-4 w-4' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></a>
			</div>
		</div>
	</section>
<?php endforeach; ?>

<?php if ( $f['closing_title'] ) : ?>
	<section aria-labelledby="other-title" class="bg-white pb-6 pt-16 md:pt-20">
		<div class="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
			<div data-reveal class="mx-auto max-w-3xl text-center">
				<h2 id="other-title" class="text-[26px] font-extrabold tracking-tight text-ink md:text-[32px]"><?php echo daberau_accent( $f['closing_title'] ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></h2>
				<p class="mt-3 text-lg leading-relaxed text-neutral-600"><?php echo esc_html( $f['closing_body'] ); ?></p>
			</div>
		</div>
	</section>
<?php endif; ?>

<?php
get_footer();
