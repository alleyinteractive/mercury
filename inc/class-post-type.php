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

		// User capabilities.
		// Note: the priority is set high here so that this connects after
		// EF_Workflows_Assignments's equivalent filter, or else our value will be
		// overwritten.
		add_filter( 'map_meta_cap', [ $this, 'allow_user_access_to_their_tasks' ], 100, 4 );
		add_filter( 'user_has_cap', [ $this, 'allow_user_to_update_their_tasks' ], 10, 3 );
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

		if ( empty( get_mercury_post_types() ) ) {
			return;
		}

		$settings = get_option( 'mercury', [] );
		$title    = $settings['meta_box']['meta_box_label'] ?? __( 'Mercury', 'mercury' );

		add_meta_box(
			'post',
			$title,
			function() {
				echo '<div id="mercury-workflow-ui"></div>';
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
	 * Allow users access to posts where they are assigned a task.
	 *
	 * @param  array  $caps    Capabilities to filter.
	 * @param  string $cap     Current capability.
	 * @param  int    $user_id User id.
	 * @param  array  $args    Arguments for filter.
	 * @return array Updated capabilities.
	 */
	public function allow_user_access_to_their_tasks( $caps, $cap, $user_id, $args ) {

		// Only check the `edit_post` capability.
		if ( 'edit_post' !== $cap ) {
			return $caps;
		}

		// We are only concerned with altering access for contributors.
		if ( ! in_array( 'contributor', get_userdata( $user_id )->roles ?? [], true ) ) {
			return $caps;
		}

		// Check to see if the argument is a valid post.
		$post_id = $args[0] ?? 0;
		$post = get_post( $post_id );

		if ( ! $post instanceof \WP_Post ) {
			return $caps;
		}

		// Is this post in the user's assigned task list?
		$assigned_user = get_post_meta(
			$post_id,
			'mercury_in_progress_task_assignee_id',
			true
		);

		if ( intval( $assigned_user ) !== intval( $user_id ) ) {
			// Explicitly deny access to this post since it is not a current assignment.
			return [ 'do_not_allow' ];
		}

		// Allow ability to edit this post.
		return [ 'edit_posts' ];
	}

	/**
	 * Allow users to update posts where they are assigned a task.
	 *
	 * Filtering the `edit_post` capability is not sufficient (see the
	 * `allow_user_access_to_their_tasks` function in this class), because
	 * the REST API checks the primitive `edit_others_posts` capability before
	 * allowing the user to update the post.
	 *
	 * @see WP_REST_Posts_Controller::update_item_permissions_check() in WP core.
	 *
	 * @param array $allcaps All the capabilities of the user.
	 * @param array $cap     [0] Required capability.
	 * @param array $args    [0] Requested capability.
	 *                       [1] User ID.
	 *                       [2] Associated object ID.
	 */
	public function allow_user_to_update_their_tasks( $allcaps, $cap, $args ) {

		// Bail out if we're not asking about editing others' posts.
		if ( 'edit_others_posts' !== $args[0] ) {
			return $allcaps;
		}

		// Bail out for users who can already edit others posts.
		if ( isset( $allcaps['edit_others_posts'] ) ) {
			return $allcaps;
		}

		// Bail if user ID happens to be missing.
		if ( empty( $args[1] ) ) {
			return $allcaps;
		}

		// If we're trying to edit another user's post, get the assigned
		// user, and compare it to the user that we're checking capabilities for.
		// phpcs:disable WordPress.Security.NonceVerification.NoNonceVerification, WordPress.Security.NonceVerification.Missing
		if ( empty( $_POST['post_ID'] ) ) {
			return $allcaps;
		}

		$assigned_user = get_post_meta(
			absint( $_POST['post_ID'] ), // phpcs:disable WordPress.Security.NonceVerification.NoNonceVerification, WordPress.Security.NonceVerification.Missing
			'mercury_in_progress_task_assignee_id',
			true
		);

		if ( absint( $assigned_user ) === absint( $args[1] ) ) {
			$allcaps['edit_others_posts'] = true;
		}

		return $allcaps;
	}
}
