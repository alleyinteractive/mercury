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

		// Register admin menu items.
		add_action( 'admin_menu', [ $this, 'add_menu_item' ] );

		// Update the assignee of a post on save.
		add_action( 'save_post', [ $this, 'update_post_assignee' ] );
	}

	/**
	 * Menu item will allow us to load the page to display the table
	 */
	public function add_menu_item() {
		add_submenu_page(
			'edit.php?post_type=mercury-workflow',
			__( 'My Assignments', 'mercury' ),
			__( 'My Assignments', 'mercury' ),
			'manage_options',
			'mercury-assignments',
			[ $this, 'list_table_page' ]
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
				<div id="icon-users" class="icon32"></div>
				<h2><?php esc_html_e( 'Assignments', 'mercury' ); ?></h2>
				<?php $assignments_table->display(); ?>
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
