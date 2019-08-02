<?php
/**
 * Group Assignments Queue GUI.
 *
 * WP_List_Table for displaying group assignments.
 *
 * @package Mercury.
 */

namespace Mercury\GUI;

// Include WP_List_Table, if it hasn't been already.
if ( ! class_exists( 'WP_List_Table' ) ) {
	require_once ABSPATH . 'wp-admin/includes/class-wp-list-table.php';
}

/**
 * Workflow group assignments queue.
 */
class Group_Assignments_Queue extends Assignments_Table {

	use \Mercury\Traits\Table_Helpers;

	/**
	 * Usergroup.
	 *
	 * @var null
	 */
	public $usergroup = null;

	/**
	 * Constructor for GUI.
	 *
	 * @param \WP_Term $usergroup The usergroup for this group queue.
	 */
	public function __construct( $usergroup ) {
		$this->usergroup = $usergroup;

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
			'post_type'      => $this->get_post_type() ?? \Mercury\get_mercury_post_types(),
			'posts_per_page' => $this->per_page,
			'offset'         => ( $this->get_pagenum() - 1 ) * $this->per_page,
			'orderby'        => $this->get_orderby(),
			'order'          => $this->get_order(),
			'meta_query'     => $this->get_meta_query(),
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
	 * Build the `meta_query` WP_Query arg.
	 *
	 * @return array
	 */
	private function get_meta_query() : array {
		$meta_query = [];

		$meta_query[] = [
			'key'   => 'mercury_in_progress_task_assignee_id',
			'value' => $this->usergroup->term_id ?? 0,
		];

		if ( ! empty( $this->get_task_filter() ) ) {
			$meta_query[] = [
				'key'   => 'mercury_in_progress_task_slug',
				'value' => $this->get_task_filter(),
			];
		}

		return $meta_query;
	}

	/**
	 * Define the columns for our list table.
	 *
	 * @return array Associative array of column slugs and names.
	 */
	public function get_columns() : array {
		return apply_filters(
			'mercury_group_queue_column_names',
			[
				'title'         => __( 'Title', 'mercury' ),
				'publish_date'  => __( 'Publish Date', 'mercury' ),
				'assigned_task' => __( 'Assigned Task', 'mercury' ),
				'claim'         => __( 'Claim Assignment', 'mercury' ),
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
			case 'claim':
				return wp_kses_post( $this->get_claim_assignment( $post ) );
		}

		return parent::column_default( $post, $column_name );
	}
}
