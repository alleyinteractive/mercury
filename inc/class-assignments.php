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

		// Register menu items for assignments.
		add_action( 'admin_menu', [ $this, 'add_menu_pages' ] );

		// Update the assignee of a post on save.
		add_action( 'save_post', [ $this, 'update_post_assignee' ] );
	}

	/**
	 * Menu items will allow us to load the page to display the table.
	 */
	public function add_menu_pages() {

		// Add top-level menu item for all assignments.
		add_menu_page(
			__( 'My Assignments', 'mercury' ),
			__( 'My Assignments', 'mercury' ),
			'edit_posts',
			'mercury-assignments',
			[ $this, 'list_table_page' ],
			'dashicons-list-view',
			4
		);

		foreach ( get_mercury_post_types() as $post_type ) {

			// Determine the appropriate parent slug.
			$parent_slug = ( 'post' === $post_type )
				? 'edit.php'
				: "edit.php?post_type={$post_type}";

			// Add a submenu page for the post type.
			add_submenu_page(
				$parent_slug,
				__( 'My Assignments', 'mercury' ),
				__( 'My Assignments', 'mercury' ),
				'edit_posts',
				"mercury-assignments-{$post_type}",
				function() use ( $post_type ) {
					$this->list_table_page( $post_type );
				},
			);
		}
	}

	/**
	 * Display the list table page.
	 *
	 * @param string $post_type The post type for which to get assignments.
	 */
	public function list_table_page( $post_type = '' ) {
		$assignments_table = new GUI\Assignments_Table();
		$assignments_table->prepare_items();

		$post_type_object = get_post_type_object( $post_type );

		$title = ! empty( $post_type_object->label ) ?
			/* translators: Post type */
			sprintf( __( '%1$s Assignments', 'mercury' ), $post_type_object->label )
			: __( 'All Assignments', 'mercury' );

		?>
			<div class="wrap">
				<form method="get">
					<h2><?php echo esc_html( $title ); ?></h2>
					<input type="hidden" id="page" name="page" value="<?php echo esc_attr( $assignments_table->get_page() ); ?>">
					<input type="hidden" id="post_type" name="post_type" value="<?php echo esc_attr( $post_type ); ?>">
					<?php
					$assignments_table->display();
					$assignments_table->get_user_dropdown();
					?>
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

		if ( empty( $task_slug ) ) {
			return;
		}

		// Get the assignee for that task.
		$assignee = get_post_meta( $post_id, "mercury_{$task_slug}_assignee_id", true );

		// Save to a new field.
		update_post_meta( $post_id, 'mercury_in_progress_task_assignee_id', $assignee );
	}
}
