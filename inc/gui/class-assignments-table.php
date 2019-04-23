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

	use \Mercury\Traits\Table_Helpers;

	/**
	 * Number of entries to display per page.
	 *
	 * @var int
	 */
	public $per_page = 20;

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
			'posts_per_page' => $this->per_page,
			'offset'         => ( $this->get_pagenum() - 1 ) * $this->per_page,
			'meta_key'       => 'mercury_in_progress_task_assignee_id',
			'meta_value'     => 1, // @todo Update to dynamic user ID.
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
				'title'         => __( 'Title', 'mercury' ),
				'publish_date'  => __( 'Publish Date', 'mercury' ),
				'assigned_task' => __( 'Assigned Task', 'mercury' ),
			]
		);
	}

	/**
	 * Set column defaults.
	 *
	 * @param \WP_Post $post        Post object.
	 * @param string   $column_name The name of the column.
	 * @return string
	 */
	public function column_default( $post, $column_name ) : string {

		switch ( $column_name ) {
			case 'title':
				$default = wp_kses(
					$this->get_title( $post ),
					[
						'a' => [
							'href'       => true,
							'class'      => true,
							'aria-label' => true,
						],
					]
				);
				break;
			case 'publish_date':
				$default = esc_html( $this->get_publish_date( $post ) );
				break;
			case 'assigned_task':
				$default = esc_html( $this->get_assigned_task( $post ) );
				break;
			default:
				$default = '';
		}

		return apply_filters( 'mercury_column_default', $default, $column_name, $post );
	}
}
