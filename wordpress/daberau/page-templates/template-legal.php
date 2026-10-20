<?php
/**
 * Template Name: Legal document
 *
 * The page content is the document. Each Heading 2 becomes a numbered section with an entry in the
 * table of contents. Dates and the "In short" box are in the "Page content (Daberau)" box.
 *
 * @package Daberau
 */

defined( 'ABSPATH' ) || exit;

get_header();

$f  = daberau_fields();
$ui = daberau_default( 'legalUi' );

the_post();
$doc = daberau_legal_sections( apply_filters( 'the_content', get_the_content() ) );
?>
<div id="top" class="bg-white">
	<div class="border-b border-neutral-200/70 bg-neutral-50">
		<div class="mx-auto w-full max-w-[1200px] px-4 pb-10 pt-8 sm:px-6 md:pb-14 md:pt-10 lg:px-8">
			<?php get_template_part( 'template-parts/breadcrumb', null, array( 'crumbs' => array( array( get_the_title() ) ) ) ); ?>
			<h1 class="text-[34px] font-extrabold leading-tight tracking-tight text-ink md:text-[52px]"><?php the_title(); ?></h1>
			<dl class="mt-4 flex flex-col gap-1 text-[15px] text-neutral-600 sm:flex-row sm:gap-6">
				<div class="flex gap-1.5"><dt><?php echo esc_html( $ui['lastUpdated'] ); ?></dt><dd class="font-medium text-ink"><?php echo esc_html( $f['last_updated'] ); ?></dd></div>
				<div class="flex gap-1.5"><dt><?php echo esc_html( $ui['effective'] ); ?></dt><dd class="font-medium text-ink"><?php echo esc_html( $f['effective'] ); ?></dd></div>
			</dl>
		</div>
	</div>

	<div class="mx-auto grid w-full max-w-[1200px] gap-8 px-4 py-10 sm:px-6 md:py-14 lg:grid-cols-[260px_minmax(0,720px)] lg:gap-14 lg:px-8">
		<aside>
			<?php if ( $doc['sections'] ) : ?>
				<?php
				ob_start();
				echo '<ol class="space-y-0.5 text-[14px]">';
				foreach ( $doc['sections'] as $i => $s ) {
					printf(
						'<li><a href="#%1$s" data-toc-link class="toc-link flex gap-2 rounded-md border-l-2 border-transparent py-1.5 pl-3 pr-2 leading-snug text-neutral-600 transition-colors hover:text-ink"><span class="w-5 shrink-0 tabular-nums">%2$d.</span>%3$s</a></li>',
						esc_attr( $s['id'] ),
						(int) ( $i + 1 ),
						esc_html( $s['title'] )
					);
				}
				echo '</ol>';
				$toc = ob_get_clean();
				?>
				<nav aria-label="<?php echo esc_attr( $ui['contents'] ); ?>" class="hidden lg:sticky lg:top-28 lg:block lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto" data-toc>
					<p class="mb-3 pl-3 text-xs font-bold uppercase tracking-wider text-neutral-500"><?php echo esc_html( $ui['contents'] ); ?></p>
					<?php echo $toc; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- escaped above. ?>
				</nav>
				<nav aria-label="<?php echo esc_attr( $ui['contents'] ); ?>" class="rounded-card border border-neutral-200 bg-white lg:hidden">
					<button type="button" aria-expanded="false" aria-controls="toc-mobile" data-disclosure class="flex w-full items-center justify-between px-4 py-3.5 text-left font-semibold text-ink">
						<?php echo esc_html( $ui['contents'] ); ?>
						<?php echo daberau_icon( 'chevron-down', 'disclosure-chevron h-5 w-5 text-neutral-500 transition-transform' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					</button>
					<div id="toc-mobile" hidden class="border-t border-neutral-200 p-2"><?php echo $toc; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></div>
				</nav>
			<?php endif; ?>
		</aside>

		<article class="min-w-0">
			<div class="legal-content text-lg leading-relaxed text-neutral-700"><?php echo $doc['intro']; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- post content. ?></div>

			<?php $short = daberau_lines( $f['in_short'] ); ?>
			<?php if ( $short ) : ?>
				<section aria-labelledby="in-short" class="mt-8 rounded-card border border-neutral-200 bg-neutral-50 p-6">
					<h2 id="in-short" class="flex items-center gap-2 text-lg font-bold text-ink"><?php echo daberau_icon( 'lightbulb', 'h-5 w-5 text-brand' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?><?php echo esc_html( $ui['inShort'] ); ?></h2>
					<ul class="mt-4 space-y-2.5">
						<?php foreach ( $short as $point ) : ?>
							<li class="flex gap-3 leading-relaxed text-ink"><span aria-hidden="true" class="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"></span><?php echo esc_html( $point ); ?></li>
						<?php endforeach; ?>
					</ul>
				</section>
			<?php endif; ?>

			<div class="mt-10 space-y-12">
				<?php foreach ( $doc['sections'] as $i => $s ) : ?>
					<section id="<?php echo esc_attr( $s['id'] ); ?>" aria-labelledby="<?php echo esc_attr( $s['id'] ); ?>-h">
						<h2 id="<?php echo esc_attr( $s['id'] ); ?>-h" class="text-[22px] font-bold leading-snug text-ink md:text-[26px]"><span class="mr-2 text-neutral-400"><?php echo (int) ( $i + 1 ); ?>.</span><?php echo esc_html( $s['title'] ); ?></h2>
						<div class="legal-content mt-3 text-[17px] leading-relaxed text-neutral-800"><?php echo $s['html']; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- post content. ?></div>
						<a href="#top" class="mt-4 inline-flex items-center gap-1 text-sm font-medium text-neutral-600 hover:text-brand"><?php echo daberau_icon( 'arrow-up', 'h-3.5 w-3.5' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?><?php echo esc_html( $ui['backToTop'] ); ?></a>
					</section>
				<?php endforeach; ?>
			</div>

			<section aria-labelledby="legal-contact" class="mt-14 rounded-card border border-neutral-200 p-6">
				<h2 id="legal-contact" class="text-lg font-bold text-ink"><?php echo esc_html( $ui['contactTitle'] ); ?></h2>
				<address class="mt-3 space-y-1 text-[15px] not-italic leading-relaxed text-neutral-700">
					<p class="font-semibold text-ink"><?php echo esc_html( daberau_mod( 'legal_name' ) ); ?></p>
					<p><?php echo esc_html( daberau_mod( 'address' ) ); ?></p>
					<p><a href="mailto:<?php echo esc_attr( daberau_mod( 'email' ) ); ?>" class="text-brand hover:underline"><?php echo esc_html( daberau_mod( 'email' ) ); ?></a> · <a href="tel:<?php echo esc_attr( preg_replace( '/[^\d+]/', '', daberau_mod( 'phone' ) ) ); ?>" class="hover:text-brand"><?php echo esc_html( daberau_mod( 'phone' ) ); ?></a></p>
				</address>
			</section>
		</article>
	</div>
</div>
<?php
get_footer();
