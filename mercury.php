<?php
/**
 * Plugin Name:     Mercury
 * Plugin URI:      PLUGIN SITE HERE
 * Description:     Advanced editorial workflows.
 * Author:          Alley, jameswalterburke
 * Author URI:      YOUR SITE HERE
 * Text Domain:     mercury
 * Domain Path:     /languages
 * Version:         0.1.0
 *
 * @package         Mercury
 */

namespace Mercury;

/**
 * Current version of Mercury.
 */
define( 'MERCURY_VERSION', '1.0.0' );

/**
 * Filesystem path to Mercury.
 */
define( 'MERCURY_PATH', dirname( __FILE__ ) );

// Base functionality.
require_once MERCURY_PATH . '/inc/class-assignments.php';
require_once MERCURY_PATH . '/inc/class-endpoints.php';
require_once MERCURY_PATH . '/inc/class-post-type.php';
require_once MERCURY_PATH . '/inc/class-users.php';

// GUI workflow management.
require_once MERCURY_PATH . '/inc/gui/class-assignments-table.php';
require_once MERCURY_PATH . '/inc/gui/class-task.php';
require_once MERCURY_PATH . '/inc/gui/class-workflow.php';

// Init.
add_action(
	'init',
	function() {
		new Assignments();
		new Endpoints();
		new Post_Type();

		// GUI for managing workflows.
		new GUI\Task();
		new GUI\Workflow();
	}
);

// Admin enqueue scripts.
add_action(
	'admin_enqueue_scripts',
	function() {

		// Enqueue workflow metabox JS.
		wp_enqueue_script(
			'mercury-workflow-js',
			plugins_url( '/build/workflow.js', __FILE__ ),
			[ 'wp-api-fetch' ],
			MERCURY_VERSION,
			true
		);
	}
);

