<?php
/**
 * Fallback for blog posts, archives and search results.
 *
 * @package Daberau
 */

defined( 'ABSPATH' ) || exit;

get_header();

if ( is_singular() ) :
	while ( have_posts() ) :
		the_post();
		get_template_part( 'template-parts/page-hero', null, array( 'crumbs' => array( array( get_the_title() ) ), 'title' => get_the_title(), 'sub' => is_singular( 'post' ) ? get_the_date() : '' ) );
		?>
		<div class="mx-auto w-full max-w-[1200px] px-4 py-12 sm:px-6 md:py-16 lg:px-8">
			<article class="entry-content mx-auto max-w-3xl"><?php the_content(); ?></article>
		</div>
		<?php
	endwhile;
else :
	get_template_part( 'template-parts/page-hero', null, array( 'title' => wp_strip_all_tags( get_the_archive_title() ? get_the_archive_title() : get_bloginfo( 'name' ) ) ) );
	?>
	<div class="mx-auto w-full max-w-[1200px] px-4 py-12 sm:px-6 md:py-16 lg:px-8">
		<?php if ( have_posts() ) : ?>
			<ul class="mx-auto max-w-3xl divide-y divide-neutral-200">
				<?php
				while ( have_posts() ) :
					the_post();
					?>
					<li class="py-6">
						<h2 class="text-[22px] font-bold text-ink"><a href="<?php the_permalink(); ?>" class="hover:text-brand"><?php the_title(); ?></a></h2>
						<p class="mt-1 text-sm text-neutral-600"><?php echo esc_html( get_the_date() ); ?></p>
						<div class="mt-2 text-neutral-600"><?php the_excerpt(); ?></div>
					</li>
				<?php endwhile; ?>
			</ul>
			<div class="mx-auto mt-8 max-w-3xl"><?php the_posts_pagination(); ?></div>
		<?php else : ?>
			<p class="mx-auto max-w-3xl text-lg text-neutral-600"><?php esc_html_e( 'Nothing here yet.', 'daberau' ); ?></p>
		<?php endif; ?>
	</div>
	<?php
endif;

get_footer();
