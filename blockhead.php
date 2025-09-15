<?php
/**
 * Plugin Name:       Blockhead
 * Description:       A customizable WordPress block for displaying ASCII art in posts and pages.
 * Version:           1.0.0
 * Requires at least: 6.0
 * Requires PHP:      7.4
 * Author:      	  iconick
 * Author URI:        https://iconick.io
 * License:           GPLv2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       blockhead-block-wp
 *
 * @package Blockhead
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}
/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function telex_blockhead_block_init() {
	register_block_type( __DIR__ . '/build/' );
}
add_action( 'init', 'telex_blockhead_block_init' );
