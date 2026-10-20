<?php
/**
 * Default page: title and editor content.
 *
 * @package Daberau
 */

defined( 'ABSPATH' ) || exit;

get_header();
while ( have_posts() ) :
	the_post();
	get_template_part( 'template-parts/page-hero', null, array( 'crumbs' => array( array( get_the_title() ) ), 'title' => get_the_title() ) );
	?>
	<div class="mx-auto w-full max-w-[1200px] px-4 py-12 sm:px-6 md:py-16 lg:px-8">
		<div class="entry-content mx-auto max-w-3xl"><?php the_content(); ?></div>
	</div>
	<?php
endwhile;
get_footer();
