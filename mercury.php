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
define( 'MERCURY_VERSION', '1.0.1' );

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

/**
 * Add custom query var for webpack hot-reloading.
 *
 * @param array $vars Array of current query vars.
 * @return array $vars Array of query vars.
 */
function webpack_query_vars( $vars ) {
	// Add a query var to enable hot reloading.
	$vars[] = 'mercury-dev';

	return $vars;
}
add_filter( 'query_vars', __NAMESPACE__ . '\webpack_query_vars' );

// Admin enqueue scripts.
add_action(
	'admin_enqueue_scripts',
	function() {
		if ( ( ! empty( $_GET['mercury-dev'] ) && true == $_GET['mercury-dev'] ) ) {
			wp_enqueue_script(
				'mercury-workflow-js',
				'//localhost:8080/build/js/workflow.js',
				[ 'wp-api-fetch' ],
				MERCURY_VERSION,
				true
			);
		} else {
			wp_enqueue_script(
				'mercury-workflow-js',
				plugins_url( '/build/js/workflow.js', __FILE__ ),
				[ 'wp-api-fetch' ],
				MERCURY_VERSION,
				true
			);
		}
	}
);

