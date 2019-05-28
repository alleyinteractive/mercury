<?php
/**
 * Workflow GUI.
 *
 * Easily build workflow tasks using a drag and drop interface.
 *
 * @package Mercury.
 */

namespace Mercury\GUI;

use Mercury\Post_Type as Post_Type;

/**
 * Workfow GUI.
 */
class Workflow {

	/**
	 * Version of the GUI interface.
	 */
	const GUI_VERSION = 1.0;

	/**
	 * Constuctor for GUI.
	 */
	public function __construct() {
		// Add meta box of settings. Has an FM dependency here.
		add_action( 'fm_post_' . Post_Type::WORKFLOW_POST_TYPE, [ $this, 'settings_meta_box' ] );
		add_action( 'fm_post_' . Post_Type::WORKFLOW_POST_TYPE, [ $this, 'tasks_meta_box' ] );
	}

	/**
	 * Add settings meta box.
	 */
	public function settings_meta_box() {
		$fm = new \Fieldmanager_Group(
			[
				'name'           => 'settings',
				'serialize_data' => false,
				'add_to_prefix'  => false,
				'children'       => [
					'name' => new \Fieldmanager_TextField( __( 'Name', 'mercury' ) ),
					'slug' => new \Fieldmanager_TextField( __( 'Slug', 'mercury' ) ),
				],
			]
		);
		$fm->add_meta_box( __( 'Settings', 'mercury' ), [ Post_Type::WORKFLOW_POST_TYPE ], 'normal', 'high' );
	}

	/**
	 * Add tasks meta box.
	 */
	public function tasks_meta_box() {
		$fm = new \Fieldmanager_Group(
			[
				'name'     => 'tasks',
				'children' => [
					'tasks' => new \Fieldmanager_Select(
						[
							'datasource'         => new \Fieldmanager_Datasource_Post(
								[
									'query_args' => [
										'post_status'    => 'any',
										'post_type'      => Post_Type::WORKFLOW_TASK_POST_TYPE,
										'posts_per_page' => 500,
									],
								]
							),
							'extra_elements'     => 0,
							'limit'              => 0,
							'minimum_count'      => 0,
							'one_label_per_item' => false,
							'sortable'           => true,
						]
					),
				],
			]
		);
		$fm->add_meta_box( __( 'Tasks', 'mercury' ), [ Post_Type::WORKFLOW_POST_TYPE ], 'normal', 'high' );
	}

	/**
	 * Helper to get all workflow IDs.
	 *
	 * @return array
	 */
	public static function get_workflow_ids() {

		// Get all workflows.
		$workflows = new \WP_Query(
			[
				'fields'         => 'ids',
				'order'          => 'ASC',
				'orderby'        => 'title',
				'post_type'      => Post_Type::WORKFLOW_POST_TYPE,
				'posts_per_page' => -1,
			]
		);

		return $workflows->posts ?? [];
	}

	/**
	 * Get a workflow by ID.
	 *
	 * @param int $workflow_id Workflow post ID.
	 * @return array
	 */
	public static function get_workflow( $workflow_id ) {
		return [
			'id'    => $workflow_id,
			'name'  => get_post_meta( $workflow_id, 'name', true ),
			'slug'  => get_post_meta( $workflow_id, 'slug', true ),
			'tasks' => array_reduce(
				self::get_task_ids_by_workflow( $workflow_id ),
				function( array $accumulator, int $task_id ) {
					$task = \Mercury\GUI\Task::get_task( $task_id );
					$user = wp_get_current_user();

					// Check if the task is limited to specific user roles,
					// and if the current user is NOT in one of those roles.
					// Unless they're an admin.
					if (
						! empty( $task['assignees']['limit_user_roles'] ) &&
						true === (bool) $task['assignees']['limit_user_roles'] &&
						isset( $task['assignees']['user_role_visibility']['roles'] ) &&
						! array_intersect( $user->roles, $task['assignees']['user_role_visibility']['roles'] ) &&
						! in_array( 'administrator',  $user->roles )
					) {
						return $accumulator;
					}

					return array_merge( $accumulator, [ $task ] );
				},
				[]
			),
		];
	}

	/**
	 * Helper to get all task IDs for a given workflow.
	 *
	 * @param int $workflow_id Workflow post ID.
	 * @return array
	 */
	public static function get_task_ids_by_workflow( $workflow_id ) {
		$task_ids = get_post_meta( $workflow_id, 'tasks', true );
		return $task_ids['tasks'] ?? [];
	}
}
