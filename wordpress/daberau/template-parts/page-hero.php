<?php
/**
 * Inner-page hero: breadcrumb, optional eyebrow, the page's single H1, subheadline, actions and an optional photo.
 *
 * Args: crumbs ([ [label, url?] ]), eyebrow (html), title, sub, actions (html), image (url), image_alt.
 *
 * @package Daberau
 */

defined( 'ABSPATH' ) || exit;

$args  = wp_parse_args( $args, array( 'crumbs' => array(), 'eyebrow' => '', 'title' => '', 'sub' => '', 'actions' => '', 'image' => '', 'image_alt' => '' ) );
$aside = (bool) $args['image'];
?>
<section class="border-b border-neutral-200/70 bg-neutral-50 pb-14 pt-8 md:pb-20 md:pt-10">
	<div class="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
		<?php get_template_part( 'template-parts/breadcrumb', null, array( 'crumbs' => $args['crumbs'] ) ); ?>
		<div class="<?php echo $aside ? 'grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16' : ''; ?>">
			<div class="<?php echo $aside ? '' : 'max-w-3xl'; ?>">
				<?php if ( $args['eyebrow'] ) : ?>
					<div class="mb-4"><?php echo $args['eyebrow']; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- built by templates. ?></div>
				<?php endif; ?>
				<h1 class="text-[34px] font-extrabold leading-[1.12] tracking-tight text-ink md:text-[52px]"><?php echo daberau_accent( $args['title'] ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></h1>
				<?php if ( $args['sub'] ) : ?>
					<p class="mt-5 text-lg leading-relaxed text-neutral-600 md:text-xl"><?php echo esc_html( $args['sub'] ); ?></p>
				<?php endif; ?>
				<?php if ( $args['actions'] ) : ?>
					<div class="mt-8"><?php echo $args['actions']; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- built by templates. ?></div>
				<?php endif; ?>
			</div>
			<?php if ( $aside ) : ?>
				<div class="aspect-[16/9] overflow-hidden rounded-card border border-neutral-200 bg-neutral-100 lg:aspect-[4/3]">
					<img src="<?php echo esc_url( $args['image'] ); ?>" alt="<?php echo esc_attr( $args['image_alt'] ); ?>" width="1200" height="900" fetchpriority="high" class="h-full w-full object-cover">
				</div>
			<?php endif; ?>
		</div>
	</div>
</section>
