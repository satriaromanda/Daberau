<?php
/**
 * Template Name: About
 *
 * @package Daberau
 */

defined( 'ABSPATH' ) || exit;

get_header();

$f          = daberau_fields();
$about      = daberau_default( 'about' );
$role_icons = array( 'lightbulb', 'code', 'pen-tool', 'clipboard-list' );

get_template_part(
	'template-parts/page-hero',
	null,
	array(
		'crumbs'    => array( array( get_the_title() ) ),
		'title'     => $f['hero_h1'],
		'sub'       => $f['hero_sub'],
		'image'     => $f['hero_image'],
		'image_alt' => $f['hero_image_alt'],
	)
);
?>

<?php daberau_section_open( 'story-title' ); ?>
	<?php daberau_section_heading( array( 'id' => 'story-title', 'eyebrow' => $f['story_eyebrow'], 'title' => $f['story_title'], 'sub' => $f['story_sub'] ) ); ?>
	<div data-reveal class="mx-auto max-w-3xl space-y-5 text-lg leading-relaxed text-neutral-700">
		<?php foreach ( daberau_lines( $f['story_paragraphs'] ) as $paragraph ) : ?>
			<p><?php echo esc_html( $paragraph ); ?></p>
		<?php endforeach; ?>
	</div>
<?php daberau_section_close(); ?>

<?php daberau_section_open( 'vm-title', 'muted' ); ?>
	<?php daberau_section_heading( array( 'id' => 'vm-title', 'eyebrow' => $f['vm_eyebrow'], 'title' => $f['vm_title'], 'sub' => $f['vm_sub'] ) ); ?>
	<div class="grid gap-4 lg:grid-cols-2">
		<div data-reveal class="rounded-card border border-neutral-200 bg-white p-8">
			<span class="inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand"><?php echo daberau_icon( 'eye', 'h-7 w-7', array( 'stroke' => 2.2 ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
			<h3 class="mt-4 text-sm font-bold uppercase tracking-wider text-neutral-600"><?php echo esc_html( $about['vision']['title'] ); ?></h3>
			<p class="mt-3 text-[24px] font-bold leading-snug text-ink md:text-[28px]"><?php echo esc_html( $f['vision'] ); ?></p>
		</div>
		<div data-reveal<?php echo daberau_delay( 90 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?> class="rounded-card border border-neutral-200 bg-white p-8">
			<span class="inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand"><?php echo daberau_icon( 'target', 'h-7 w-7', array( 'stroke' => 2.2 ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
			<h3 class="mt-4 text-sm font-bold uppercase tracking-wider text-neutral-600"><?php echo esc_html( $about['mission']['title'] ); ?></h3>
			<ol class="mt-3 space-y-3">
				<?php foreach ( daberau_lines( $f['mission_items'] ) as $i => $m ) : ?>
					<li class="flex gap-3 text-lg font-semibold text-ink"><span class="text-brand"><?php echo (int) ( $i + 1 ); ?>.</span><?php echo esc_html( $m ); ?></li>
				<?php endforeach; ?>
			</ol>
		</div>
	</div>
<?php daberau_section_close(); ?>

<?php daberau_section_open( 'values-title' ); ?>
	<?php daberau_section_heading( array( 'id' => 'values-title', 'eyebrow' => $f['values_eyebrow'], 'title' => $f['values_title'], 'sub' => $f['values_sub'] ) ); ?>
	<ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
		<?php foreach ( daberau_lines( $f['values_items'], array( 'title', 'body' ) ) as $i => $v ) : ?>
			<?php get_template_part( 'template-parts/text-card', null, array( 'tag' => 'li', 'title' => $v['title'], 'body' => $v['body'], 'delay' => $i * 90 ) ); ?>
		<?php endforeach; ?>
	</ul>
<?php daberau_section_close(); ?>

<?php daberau_section_open( 'team-title', 'muted' ); ?>
	<?php daberau_section_heading( array( 'id' => 'team-title', 'eyebrow' => $f['team_eyebrow'], 'title' => $f['team_title'], 'sub' => $f['team_sub'] ) ); ?>
	<ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
		<?php foreach ( daberau_lines( $f['team_members'], array( 'role', 'focus' ) ) as $i => $m ) : ?>
			<?php get_template_part( 'template-parts/text-card', null, array( 'tag' => 'li', 'icon' => $role_icons[ $i % 4 ], 'title' => $m['role'], 'body' => $m['focus'], 'delay' => $i * 90 ) ); ?>
		<?php endforeach; ?>
	</ul>
<?php daberau_section_close(); ?>

<?php daberau_section_open( 'numbers-title' ); ?>
	<?php daberau_section_heading( array( 'id' => 'numbers-title', 'eyebrow' => $f['numbers_eyebrow'], 'title' => $f['numbers_title'], 'sub' => $f['numbers_sub'] ) ); ?>
	<dl class="grid grid-cols-2 gap-4 lg:grid-cols-4">
		<?php foreach ( daberau_lines( $f['numbers_stats'], array( 'value', 'label' ) ) as $i => $stat ) : ?>
			<div data-reveal<?php echo daberau_delay( $i * 90 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?> class="flex flex-col-reverse justify-end rounded-card border border-neutral-200 bg-white p-6">
				<dt class="mt-3 text-[15px] text-neutral-600"><?php echo esc_html( $stat['label'] ); ?></dt>
				<dd class="text-[34px] font-extrabold leading-none tracking-tight text-ink md:text-[40px]"><?php echo esc_html( $stat['value'] ); ?></dd>
			</div>
		<?php endforeach; ?>
	</dl>
<?php daberau_section_close(); ?>

<?php
get_footer();
