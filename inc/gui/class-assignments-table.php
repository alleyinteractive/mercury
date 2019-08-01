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
			'value' => $this->get_user_id(),
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
			'mercury_assignments_column_names',
			[
				'title'         => __( 'Title', 'mercury' ),
				'publish_date'  => __( 'Publish Date', 'mercury' ),
				'assigned_task' => __( 'Assigned Task', 'mercury' ),
			]
		);
	}

	/**
	 * Define the sortable columns for our list table.
	 *
	 * @return array
	 */
	public function get_sortable_columns() : array {
		return apply_filters(
			'mercury_sortable_columns',
			[
				'title'        => [ 'title', false ],
				'publish_date' => [ 'date', false ],
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

	/**
	 * Display extra filtering options.
	 *
	 * @param string $which Which section of the table we are on.
	 */
	protected function extra_tablenav( $which ) {
		// Only display on the top of the table.
		if ( 'top' !== $which ) {
			return;
		}
		?>
		<div class="alignleft actions">
			<?php
			// Task filter.
			$this->task_filter();

			submit_button( __( 'Filter', 'mercury' ), 'button', null, false );
			?>
		</div>
		<?php
	}

	/**
	 * Add dropdown for filtering by task.
	 */
	private function task_filter() {
		// Build the markup for the dropdown.
		?>
		<select name="task" id="task">
			<option value=""><?php esc_html_e( 'All tasks', 'mercury' ); ?></option>
			<?php
			$workflow_ids = Workflow::get_workflow_ids();

			foreach ( $workflow_ids as $id ) {

				// Get the workflow.
				$workflow = Workflow::get_workflow( $id );

				// Open `<optgroup>` tag.
				printf(
					'<optgroup label="%1$s">',
					esc_html( $workflow['name'] )
				);

				foreach ( $workflow['tasks'] as $task ) {
					printf(
						'<option value="%1$s" %2$s>%3$s</option>',
						esc_attr( $task['slug'] ),
						selected( $task['slug'], $this->get_task_filter(), false ),
						esc_html( $task['name'] )
					);
				}

				// Close `<optgroup>` tag.
				echo '</optgroup>';
			}
			?>
		</select>
		<?php
	}

	/**
	 * Get dropdown for switching between users.
	 */
	public function get_user_dropdown() {

		// Restrict visibility to certain users.
		if ( ! current_user_can( 'edit_others_posts' ) ) {
			return;
		}

		// Get a full list of users.
		$users = get_users(
			[
				'orderby' => 'display_name',
			]
		);
		?>
		<span><?php esc_html_e( 'Select a different user:', 'mercury' ); ?></span>
		<select name="user_id" id="user_id">
			<?php
			foreach ( $users as $user ) {
				printf(
					'<option value="%1$s" %2$s>%3$s</option>',
					esc_attr( $user->ID ),
					selected( $user->ID, $this->get_user_id(), false ),
					esc_html( $user->display_name )
				);
			}
			submit_button( __( 'Go', 'mercury' ), 'button', null, false );
			?>
		</select>
		<?php
	}
}
