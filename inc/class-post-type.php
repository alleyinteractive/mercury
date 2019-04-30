<?php
/**
 * Post Type.
 *
 * Register post type and metabox for rendering react component.
 *
 * @package Mercury.
 */

namespace Mercury;

/**
 * Post Type.
 */
class Post_Type {

	/**
	 * Post type slug for workflow.
	 */
	const WORKFLOW_POST_TYPE = 'mercury-workflow';

	/**
	 * Post type slug for the workflow task.
	 */
	const WORKFLOW_TASK_POST_TYPE = 'mercury-task';

	/**
	 * Constuctor for GUI.
	 */
	public function __construct() {
		$this->register_workflow_post_type();
		$this->register_task_post_type();
		$this->register_post_statuses();

		// Register meta box for rendering the React component.
		add_action( 'add_meta_boxes', [ $this, 'add_meta_boxes' ] );

		// Update the post status when needed.
		add_action( 'save_post', [ $this, 'update_post_status' ], 11, 2 );

		// Admin menu modifications.
		add_action( 'admin_menu', [ $this, 'admin_menu' ] );
	}

	/**
	 * Register the `mercury-workflow` post type.
	 */
	protected function register_workflow_post_type() {
		$args = [
			'capability_type'    => 'post',
			'description'        => __( 'Workflow Management.', 'mercury' ),
			'has_archive'        => false,
			'label'              => __( 'Workflows', 'mercury' ),
			'menu_icon'          => 'dashicons-yes',
			'public'             => false,
			'show_in_rest'       => true,
			'publicly_queryable' => true,
			'show_in_menu'       => true,
			'show_ui'            => true,
			'supports'           => [ 'title' ],
		];

		register_post_type( self::WORKFLOW_POST_TYPE, $args );
	}


	/**
	 * Register the `mercury-task` post type.
	 */
	protected function register_task_post_type() {
		$args = [
			'capability_type'    => 'post',
			'has_archive'        => false,
			'label'              => __( 'Tasks', 'mercury' ),
			'menu_icon'          => 'dashicons-yes',
			'public'             => false,
			'show_in_rest'       => true,
			'publicly_queryable' => true,
			'show_in_menu'       => 'edit.php?post_type=mercury-workflow',
			'show_ui'            => true,
			'supports'           => [ 'title' ],
		];

		register_post_type( self::WORKFLOW_TASK_POST_TYPE, $args );
	}

	/**
	 * Register custom post statuses for all tasks.
	 */
	public function register_post_statuses() {

		// Get all tasks.
		$tasks_query = new \WP_Query(
			[
				'fields'         => 'ids',
				'order'          => 'ASC',
				'orderby'        => 'title',
				'post_type'      => self::WORKFLOW_TASK_POST_TYPE,
				'posts_per_page' => -1,
			]
		);

		// Register a custom post status for each of them.
		foreach ( ( $tasks_query->posts ?? [] ) as $task_id ) {
			$task_post_status = (string) get_post_meta( $task_id, 'post_status', true );
			$task_name        = (string) get_post_meta( $task_id, 'name', true );

			$args = [
				'label'                     => $task_name,
				/* translators: number of posts */
				'label_count'               => _n_noop( "{$task_name} <span class=\"count\">(%s)</span>", "{$task_name} <span class=\"count\">(%s)</span>", 'mercury' ), // phpcs:ignore
				'public'                    => true,
				'show_in_admin_status_list' => true,
			];

			register_post_status( $task_post_status, $args );
		}
	}

	/**
	 * Meta box to render the React component.
	 */
	public function add_meta_boxes() {
		add_meta_box(
			'post',
			__( 'Mercury', 'mercury' ),
			function() {
				printf(
					'<div id="mercury-workflow-ui"></div>',
					get_the_ID()
				);
			},
			get_mercury_post_types(),
			'normal'
		);
	}

	/**
	 * Remove submenu page.
	 */
	public function admin_menu() {
		remove_submenu_page( 'edit.php?post_type=mercury-workflow', 'post-new.php?post_type=mercury-workflow' );
	}

	/**
	 * When a post is saved, update its post status to the appropriate custom
	 * status based on the active workflow task.
	 *
	 * @param int      $post_id Post ID.
	 * @param \WP_Post $post    Post object.
	 */
	public function update_post_status( int $post_id, \WP_Post $post ) {
		// Leave posts being trashed, published, or scheduled alone.
		if ( in_array( $post->post_status, [ 'trash', 'publish', 'future' ], true ) ) {
			return;
		}

		// Get the task in progress.
		$task_slug = get_post_meta( $post_id, 'mercury_in_progress_task_slug', true );

		if ( ! empty( $task_slug ) && $task_slug !== $post->post_status ) {
			// Remove action to prevent an infinite loop.
			remove_action( 'save_post', [ $this, 'update_post_status' ], 11 );

			// Update the post status to reflect the new active task.
			$id = wp_update_post( [
				'ID'          => $post_id,
				'post_status' => $task_slug,
			] );

			// Re-add action.
			add_action( 'save_post', [ $this, 'update_post_status' ], 11, 2 );
		}
	}
}
