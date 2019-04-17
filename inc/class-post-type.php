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
			[ 'post' ],
			'normal'
		);
	}

	/**
	 * Remove submenu page.
	 */
	public function admin_menu() {
		remove_submenu_page( 'edit.php?post_type=mercury-workflow', 'post-new.php?post_type=mercury-workflow' );
	}
}
