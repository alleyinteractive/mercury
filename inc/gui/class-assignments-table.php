<?php
/**
 * Assignments Table GUI.
 *
 * WP_List_Table for displaying assignments.
 *
 * @package Mercury.
 */

namespace Mercury\GUI;

// Include WP_List_Table, if it hasn't been already.
if ( ! class_exists( 'WP_List_Table' ) ) {
	require_once ABSPATH . 'wp-admin/includes/class-wp-list-table.php';
}

/**
 * Workflow assignments table.
 */
class Assignments_Table extends \WP_List_Table {

	/**
	 * Constuctor for GUI.
	 */
	public function __construct() {

		// Initialize the table.
		parent::__construct(
			[
				'ajax'     => false,
				'plural'   => __( 'assignments', 'mercury' ),
				'singular' => __( 'assignment', 'mercury' ),
			]
		);
	}

	/**
	 * Prepare items for the table.
	 */
	public function prepare_items() {

		// Set column headers.
		$this->_column_headers = [
			$this->get_columns(),
			[],
			$this->get_sortable_columns(),
			'title',
		];

		$args = [
			'post_type'      => [ 'post' ],
			'posts_per_page' => 10,
			'offset'         => 0,
		];

		// Fetch the data.
		$query = new \WP_Query( $args );

		// Set the data.
		$this->items = $query->posts;
		$total_items = $query->found_posts;

		$this->set_pagination_args(
			[
				'total_items' => $total_items,
				'per_page'    => $this->per_page,
				'total_pages' => ceil( $total_items / $this->per_page ),
			]
		);
	}


	/**
	 * Define the columns for our list table.
	 *
	 * @return array Associative array of column slugs and names.
	 */
	public function get_columns() : array {
		return apply_filters(
			'mercury_assignments_column_names',
			[
				'title'          => __( 'Title', 'mercury' ),
				'publish_date'   => __( 'Publish Date', 'mercury' ),
				'status'         => __( 'Status', 'mercury' ),
				'tasks_assigned' => __( 'Tasks Assigned to User', 'mercury' ),
			]
		);
	}
}
