<?php
get_header();
?>

<main role="main">
	<?php
    if (have_posts()) {
        while (have_posts()) {
            the_post();
        }
    }
    ?>
</main>

<?php 
get_footer();
?>
