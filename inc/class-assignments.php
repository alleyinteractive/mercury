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
	 * Constructor.
	 */
	public function __construct() {

		// Register menu items for assignments.
		add_action( 'admin_menu', [ $this, 'add_menu_pages' ] );

		add_action( 'admin_action_claim_task', [ $this, 'claim_task' ] );

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

		// Determine from settings whether to add assignments pages by post type.
		$settings = get_option( 'mercury', [] );
		if ( ! empty( $settings['post_types']['post_types_assignments_pages'] ?? false ) ) {

			// Get Mercury post types, and add a submenu page for each.
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
					}
				);
			}
		}

		// Get all usergroups used by tasks, and add a submenu page if the user is a member.
		foreach ( self::get_user_groups_for_tasks() as $usergroup ) {

			// Bail if the current user isn't a member of this group.
			if ( ! in_array( get_current_user_id(), $usergroup->user_ids ?? [], true ) ) {
				continue;
			}

			/* translators: Group name. */
			$title     = sprintf( __( '%1$s Queue', 'mercury' ), $usergroup->name );
			$menu_slug = str_replace( 'ef-usergroup', 'mercury-assignments', $usergroup->slug );

			// Add a submenu page for the user group.
			add_submenu_page(
				'mercury-assignments',
				$title,
				$title,
				'edit_posts',
				$menu_slug,
				function() use ( $usergroup ) {
					$this->group_queue_page( $usergroup );
				}
			);
		}
	}

	/**
	 * Get all Edit Flow usergroups in use by Mercury tasks.
	 */
	public static function get_user_groups_for_tasks() {
		global $edit_flow;

		// Check for a cache hit.
		$cache_key         = 'mercury_usergroups';
		$cached_usergroups = get_transient( $cache_key );

		if ( false !== $cached_usergroups ) {
			return $cached_usergroups;
		}

		// Get all tasks.
		$tasks_query = new \WP_Query(
			[
				'fields'         => 'ids',
				'post_type'      => Post_Type::WORKFLOW_TASK_POST_TYPE,
				'posts_per_page' => 250,
			]
		);

		// Get the user groups in use by Mercury tasks.
		$mercury_group_ids = [];
		foreach ( ( $tasks_query->posts ?? [] ) as $task_id ) {
			// Get the assignments meta.
			$assignments = (array) get_post_meta( $task_id, 'assignments', true );

			if ( empty( $assignments['assignee_selection']['enable_groups'] ?? false ) ) {
				continue;
			}

			$mercury_group_ids = array_unique(
				array_merge(
					$mercury_group_ids,
					$assignments['assignee_selection']['filter_groups'] ?? []
				)
			);
		}

		// Get the full term object for each usergroup.
		$mercury_groups = array_map(
			function ( $id ) use ( $edit_flow ) {
				return $edit_flow->user_groups->get_usergroup_by( 'id', $id );
			},
			$mercury_group_ids
		);

		if ( ! empty( $mercury_groups ) ) {
			set_transient( $cache_key, $mercury_groups, 5 * MINUTE_IN_SECONDS );
		}

		return $mercury_groups;
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
	 * Display the group assignments queue page.
	 *
	 * @param \WP_Term $usergroup The usergroup for which to get assignments.
	 */
	public function group_queue_page( $usergroup ) {
		$assignments_table = new GUI\Group_Assignments_Queue( $usergroup );
		$assignments_table->prepare_items();

		/* translators: Group name. */
		$title = sprintf( __( '%1$s Queue', 'mercury' ), $usergroup->name );
		?>
			<div class="wrap">
				<form method="get">
					<h2><?php echo esc_html( $title ); ?></h2>
					<input type="hidden" id="page" name="page" value="<?php echo esc_attr( $assignments_table->get_page() ); ?>">
					<?php
					$assignments_table->display();
					?>
				</form>
			</div>
		<?php
	}

	/**
	 * Process admin action of claiming a task.
	 */
	public function claim_task() {

		// Verify the nonce.
		$nonce  = ! empty( $_GET['nonce'] ) ? sanitize_key( wp_unslash( $_GET['nonce'] ) ) : '';
		$action = ! empty( $_GET['action'] ) ? sanitize_text_field( wp_unslash( $_GET['action'] ) ) : '';
		if ( ! wp_verify_nonce( $nonce, $action ) ) {
			wp_die( esc_html__( 'Sorry, you are not allowed to do that.', 'mercury' ) );
		}

		$post_id = ! empty( $_GET['post'] ) ? absint( wp_unslash( $_GET['post'] ) ) : '';
		$user_id = ! empty( $_GET['user'] ) ? absint( wp_unslash( $_GET['user'] ) ) : '';
		$task    = ! empty( $_GET['task'] ) ? sanitize_text_field( wp_unslash( $_GET['task'] ) ) : '';

		// Bail if we don't have the necessary data.
		if (
			empty( $action ) ||
			empty( $post_id ) ||
			empty( $user_id ) ||
			empty( $task )
		) {
			return;
		}

		// Update the assignee.
		update_post_meta( $post_id, "mercury_{$task}_assignee_id", $user_id );
		update_post_meta( $post_id, 'mercury_in_progress_task_assignee_id', $user_id );

		// Redirect to the post.
		wp_safe_redirect( get_edit_post_link( $post_id, 'redirect' ) );
		exit;
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
