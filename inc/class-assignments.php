<?php
/**
 * Assignments.
 *
 * @package Mercury.
 */

namespace Mercury;

/**
 * Workflow assignments.
 */
class Assignments {

	/**
	 * Constuctor.
	 */
	public function __construct() {

		// Register top-level menu item for assignments.
		add_action( 'admin_menu', [ $this, 'add_menu_page' ] );

		// Update the assignee of a post on save.
		add_action( 'save_post', [ $this, 'update_post_assignee' ] );
	}

	/**
	 * Menu item will allow us to load the page to display the table.
	 */
	public function add_menu_page() {
		add_menu_page(
			__( 'My Assignments', 'mercury' ),
			__( 'My Assignments', 'mercury' ),
			'edit_posts',
			'mercury-assignments',
			[ $this, 'list_table_page' ],
			'dashicons-list-view',
			4
		);
	}

	/**
	 * Display the list table page
	 */
	public function list_table_page() {
		$assignments_table = new GUI\Assignments_Table();
		$assignments_table->prepare_items();
		?>
			<div class="wrap">
				<form method="get">
					<h2><?php esc_html_e( 'Assignments', 'mercury' ); ?></h2>
					<input type="hidden" id="page" name="page" value="mercury-assignments">
					<?php $assignments_table->display(); ?>
				</form>
			</div>
		<?php
	}

	/**
	 * When a post is saved, get the assignee for the current task and save that
	 * value to a separate post meta field.
	 *
	 * @param int $post_id Post ID.
	 */
	public function update_post_assignee( $post_id ) {

		// Get the task in progress.
		$task_slug = get_post_meta( $post_id, 'mercury_in_progress_task_slug', true );

		// Get the assignee for that task.
		$assignee  = get_post_meta( $post_id, "mercury_{$task_slug}_assignee_id", true );

		// Save to a new field.
		update_post_meta( $post_id, 'mercury_in_progress_task_assignee_id', $assignee );
	}
}
