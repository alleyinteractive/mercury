<?php
/**
 * Task GUI.
 *
 * Easily build workflow tasks using a drag and drop interface.
 *
 * @package Mercury.
 */

namespace Mercury\GUI;

use Mercury\Post_Type as Post_Type;

/**
 * Task GUI.
 */
class Task {

	/**
	 * Version of the GUI interface.
	 */
	const GUI_VERSION = 1.0;

	/**
	 * Constuctor for GUI.
	 */
	public function __construct() {
		// Add meta box of settings. Has an FM dependency here.
		add_action( 'fm_post_' . Post_Type::WORKFLOW_TASK_POST_TYPE, [ $this, 'settings_meta_box' ] );
		add_action( 'fm_post_' . Post_Type::WORKFLOW_TASK_POST_TYPE, [ $this, 'assignments_meta_box' ] );
		add_action( 'fm_post_' . Post_Type::WORKFLOW_TASK_POST_TYPE, [ $this, 'next_tasks_meta_box' ] );
		// add_action( 'fm_post_' . Post_Type::WORKFLOW_TASK_POST_TYPE, [ $this, 'due_dates_meta_box' ] );
		add_action( 'fm_post_' . Post_Type::WORKFLOW_TASK_POST_TYPE, [ $this, 'fields_meta_box' ] );
	}

	public function settings_meta_box() {
		$fm = new \Fieldmanager_Group(
			[
				'name'           => 'settings',
				'serialize_data' => false,
				'add_to_prefix'  => false,
				'children'       => [
					'name'         => new \Fieldmanager_TextField( __( 'Name', 'mercury' ) ),
					'slug'         => new \Fieldmanager_TextField( __( 'Slug', 'mercury' ) ),
				],
			]
		);
		$fm->add_meta_box( __( 'Settings', 'mercury' ), [ Post_Type::WORKFLOW_TASK_POST_TYPE ], 'normal', 'high' );
	}

	public function assignments_meta_box() {
		// $user_groups        = new \EF_User_Groups();
		$user_group_options = [];
		// foreach ( $user_groups->get_usergroups() as $user_group ) {
		// 	$user_group_options[ $user_group->term_id ] = $user_group->name;
		// }

		$fm = new \Fieldmanager_Group(
			[
				'name'     => 'assignments',
				'children' => [
					'default_assignee' => new \Fieldmanager_Select(
						[
							'label'      => __( 'Default Assignee', 'mercury' ),
							'description' => __( 'This task\'s assignee will be pre-filled with this user.', 'mercury' ),
							'options'    => [
								'none'    => __( 'None', 'mercury' ),
								'self'    => __( 'Self', 'mercury' ),
								'creator' => __( 'Post creator', 'mercury' ),
								'user'    => __( 'Specific User', 'mercury' ),
							],
						]
					),
					'default_user' => new \Fieldmanager_Select(
						[
							'display_if' => [
								'src'   => 'default_assignee',
								'value' => 'user',
							],
							'options' => [
								'james'  => 'James',
								'owen' => 'Owen',
							],
							//  datasource users
						]
					),
					'enable_assignee_selection' => new \Fieldmanager_Checkbox(
						[
							'label' => __( 'Enable Assignee Selection', 'mercury' ),
							'description' => __( 'This will allow the assignee to be set from a filtered list of users. Use this when your default selection may need to change. By default this will include all users. Use the filter options to filter that list.', 'mercury' ),
						]
					),
					'assignee_selection' => new \Fieldmanager_Group(
						[
							'label'       => __( 'Assignee Selection Options', 'mercury' ),
							'collapsible' => true,
							'display_if'  => [
								'src'   => 'enable_assignee_selection',
								'value' => true,
							],
							'children'    => $this->get_assignee_filters(),
						]
					),
					'enable_ask_reject' => new \Fieldmanager_Checkbox(
						[
							'label' => __( 'Enable Ask/Reject', 'mercury' ),
							'description' => __( 'This will display the task to a subset of users, asking them to "accept" or "reject" the task. By default this will include all users. Use the filter options to filter that list.', 'mercury' ),
						]
					),
					'ask_reject'        => new \Fieldmanager_Group(
						[
							'children'   => $this->get_assignee_filters(),
							'display_if' => [
								'src' => 'enable_ask_reject',
								'value' => true,
							],
							'label'    => __( 'Ask/Reject Options', 'mercury' ),
						]
					),
				],
			]
		);
		$fm->add_meta_box( __( 'Assignments', 'mercury' ), [ Post_Type::WORKFLOW_TASK_POST_TYPE ], 'normal', 'high' );
	}

	public function get_assignee_filters() {
		return [
			'enable_users' => new \Fieldmanager_Checkbox(
				[
					'label' => __( 'Include the following users as options.', 'mercury' ),
				]
			),
			'filter_users' => new \Fieldmanager_Select(
				[
					'limit' => 0,
					'display_if' => [
						'src'   => 'enable_users',
						'value' => true,
					],
					'options' => [
						'james'  => 'James',
						'owen' => 'Owen',
					],
					//  datasource users
				]
			),
			'enable_groups' => new \Fieldmanager_Checkbox(
				[
					'label'      => __( 'Include users in these groups to be assigned this task', 'mercury' ),
				]
			),
			'filter_groups' => new \Fieldmanager_Select(
				[
					'limit' => 0,
					'display_if' => [
						'src'   => 'enable_groups',
						'value' => true,
					],
					'options' => [
						'writers'  => 'Writers',
						'med reviewers' => 'Med Reviewers',
					],
					//  datasource users
				]
			),
			'enable_roles' => new \Fieldmanager_Checkbox(
				[
					'label'      => __( 'Include users in specific roles to be assigned this task', 'mercury' ),
				]
			),
			'filter_roles' => new \Fieldmanager_Select(
				[
					'limit' => 0,
					'display_if' => [
						'src'   => 'enable_roles',
						'value' => true,
					],
					'options' => [
						'admin'  => 'Admin',
						'editor' => 'Editor',
					],
					//  datasource users
				]
			),
		];
	}

	public function next_tasks_meta_box() {
		$fm = new \Fieldmanager_Group(
			[
				'name'           => 'next_tasks',
				'serialize_data' => false,
				'add_to_prefix'  => false,
				'children'       => [
					'transitions' => new \Fieldmanager_Group(
						[
							'add_more_label'     => __( 'Add Transition', 'healthline' ),
							'children'           => [
								'label'   => new \Fieldmanager_Textfield(
									[
										'label'       => __( 'Action Label', 'mercury' ),
										'description' => __( 'Use this to describe what this transition will do. Ex. "Proceed to Final Edit", or "Return to editor"', 'mercury' ),
									]
								),
								'task_id' => new \Fieldmanager_Select(
									[
										'datasource' => new \Fieldmanager_Datasource_Post(
											[
												'query_args' => [
													'post_status' => 'any',
													'post_type'   => Post_Type::WORKFLOW_TASK_POST_TYPE,
												],
											]
										),
									]
								),
							],
							'collapsed'          => true,
							'extra_elements'     => 0,
							'label'              => __( 'Task Transitions', 'healthline' ),
							'label_macro'        => [ '%s', 'label' ],
							'limit'              => 0,
							'minimum_count'      => 0,
							'sortable'           => true,
						],
					),
				],
			]
		);
		$fm->add_meta_box( __( 'Transitions', 'mercury' ), [ Post_Type::WORKFLOW_TASK_POST_TYPE ], 'normal', 'high' );
	}

	public function due_dates_meta_box() {
		$fm = new \Fieldmanager_Group(
			[
				'name'           => 'due_dates',
				'serialize_data' => false,
				'add_to_prefix'  => false,
				'children'       => [
					'has_due_date' => new \Fieldmanager_Checkbox( __( 'Enable Due Dates', 'mercury' ) ),
				],
			]
		);
		$fm->add_meta_box( __( 'Due Dates', 'mercury' ), [ Post_Type::WORKFLOW_TASK_POST_TYPE ], 'normal', 'high' );
	}

	public function fields_meta_box() {
		$fm = new \Fieldmanager_Group(
			[
				'name'           => 'fields',
				'label'          => __( 'Field', 'mercury' ),
				'limit'          => 0,
				'add_more_label' => __( 'Add Field', 'mercury' ),
				'label_macro'    => [ '%s', 'label' ],
				'minimum_count'  => 0,
				'extra_elements' => 0,
				'collapsed'      => true,
				'sortable'       => true,
				'children'       => [
					'label' => new \Fieldmanager_Textfield( __( 'Label', 'mercury' ) ),
					'slug'  => new \Fieldmanager_Textfield( __( 'Slug', 'mercury' ) ),
					'type'  => new \Fieldmanager_Select(
						[
							'label'         => __( 'Type', 'mercury' ),
							'default_value' => 'textfield',
							'options'       => [
								'checkbox'   => __( 'Checkbox', 'mercury' ),
								'checkboxes' => __( 'Checkboxes', 'mercury' ),
								'date'       => __( 'Date', 'mercury' ),
								'select'     => __( 'Dropdown', 'mercury' ),
								'textarea'   => __( 'Textarea', 'mercury' ),
								'textfield'  => __( 'Textfield', 'mercury' ),
								'assignee'   => __( 'Assignee', 'mercury' ),
							],
						]
					),
					'read_only'      => new \Fieldmanager_Checkbox( __( 'Read only?', 'mercury' ) ),
					'options_source' => new \Fieldmanager_Select(
						[
							'label' => __( 'Source', 'mercury' ),
							'options' => [
								'function' => __( 'Function', 'mercury' ),
								'list'     => __( 'List', 'mercury' ),
							],
							'display_if' => [
								'src'   => 'type',
								'value' => 'select,checkboxes'
							],
						]
					),
					'options_source_list' => new \Fieldmanager_Group(
						[
							'label'          => __( 'Options', 'mercury' ),
							'limit'          => 0,
							'add_more_label' => __( 'Add Option', 'mercury' ),
							'label_macro'    => [ '%s', 'label' ],
							'minimum_count'  => 0,
							'extra_elements' => 0,
							'collapsed'      => true,
							'sortable'       => true,
							'children'   => [
								'label' => new \Fieldmanager_Textfield( __( 'Label', 'mercury' ) ),
								'value' => new \Fieldmanager_Textfield( __( 'Value', 'mercury' ) ),
							],
							'display_if' => [
								'src'   => 'options_source',
								'value' => 'list'
							],
						]
					),
				],
			]
		);
		$fm->add_meta_box( __( 'Fields', 'mercury' ), [ Post_Type::WORKFLOW_TASK_POST_TYPE ], 'normal', 'high' );
	}

	/**
	 * Helper function to get a task.
	 *
	 * @param int $task_id Task ID.
	 * @return array
	 */
	public static function get_task( int $task_id ) : array {
		return [
			'assignees' => self::get_assignee_settings( $task_id ),
			'fields'    => self::get_fields( $task_id ),
			'name'      => get_post_meta( $task_id, 'name', true ),
			'nextTasks' => self::get_next_tasks( $task_id ),
			'slug'      => get_post_meta( $task_id, 'slug', true ),
		];
	}

	public static function get_assignee_settings( $task_id ) {

		$settings_template = [
			'default_assignee'          => 'none',
			'default_user'              => 0,
			'enable_assignee_selection' => false,
			'assignee'                  => [
				'enable_users'  => false,
				'filter_users'  => [],
				'enable_groups' => false,
				'filter_groups' => [],
				'enable_roles'  => false,
				'filter_roles'  => [],
			],
			'enable_ask_reject'         => false,
			'ask_reject'                => [
				'enable_users'  => false,
				'filter_users'  => [],
				'enable_groups' => false,
				'filter_groups' => [],
				'enable_roles'  => false,
				'filter_roles'  => [],
			],
		];

		// Get assignee options.
		$assignments = (array) get_post_meta( $task_id, 'assignments', true );
		if ( empty( $assignments ) ) {
			return $settings_template;
		}

		$settings = wp_parse_args( $assignments, $settings_template );
		$settings = self::recursive_array_intersect_key( $settings, $settings_template );

		// Assignees.
		$settings['enable_assignee_selection'] = filter_var( $settings['enable_assignee_selection'], FILTER_VALIDATE_BOOLEAN );
		$settings['assignee']['enable_users'] = filter_var( $settings['assignee']['enable_users'], FILTER_VALIDATE_BOOLEAN );
		$settings['assignee']['enable_users'] = filter_var( $settings['assignee']['enable_users'], FILTER_VALIDATE_BOOLEAN );
		$settings['assignee']['enable_users'] = filter_var( $settings['assignee']['enable_users'], FILTER_VALIDATE_BOOLEAN );

		// Ask/Reject.
		$settings['enable_ask_reject'] = filter_var( $settings['enable_ask_reject'], FILTER_VALIDATE_BOOLEAN );
		$settings['ask_reject']['enable_users'] = filter_var( $settings['ask_reject']['enable_users'], FILTER_VALIDATE_BOOLEAN );
		$settings['ask_reject']['enable_users'] = filter_var( $settings['ask_reject']['enable_users'], FILTER_VALIDATE_BOOLEAN );
		$settings['ask_reject']['enable_users'] = filter_var( $settings['ask_reject']['enable_users'], FILTER_VALIDATE_BOOLEAN );

		return $settings;
	}

	public static function recursive_array_intersect_key( array $array1, array $array2 ) {
		$array1 = array_intersect_key( $array1, $array2 );
		foreach ( $array1 as $key => &$value ) {
			if ( is_array( $value ) && is_array( $array2[ $key ] ) ) {
				$value = self::recursive_array_intersect_key( $value, $array2[ $key ] );
			}
		}
		return $array1;
	}

	/**
	 * Get the next step options for a given task.
	 * @param int $task_id Task post ID.
	 * @return array
	 */
	public static function get_next_tasks( $task_id ) {

		// Setup transition structure.
		$transitions = (array) get_post_meta( $task_id, 'transitions', true );

		return array_map(
			function( $transition ) {
				return [
					'label' => $transition['label'] ?? '',
					'slug'  => get_post_meta( absint( $transition['task_id'] ?? 0 ), 'slug', true ),
				];
			},
			$transitions
		);
	}

	/**
	 * Get fields for a given task.
	 *
	 * @param int $task_id Task post ID.
	 * @return array
	 */
	public static function get_fields( $task_id ) {
		$fields = (array) get_post_meta( $task_id, 'fields', true );
		return array_values( array_filter( array_map( 'self::clean_field', array_filter( $fields ) ) ) );
	}

	/**
	 * Clean a single field.
	 *
	 * @param array $field Raw field data.
	 * @return array
	 */
	public static function clean_field( $field ) {

		// print_r($field);

		// Validate required fields.
		if (
			empty( $field['label'] )
			|| empty( $field['slug'] )
			|| empty( $field['type'] )
		) {
			return;
		}

		// Clean shape of each field.
		$field = wp_parse_args(
			$field,
			[
				'read_only'           => false,
				'label'               => '',
				'options_source'      => '',
				'options_source_list' => '',
				'slug'                => '',
				'type'                => '',
			]
		);

		// Type cast as needed.
		$field['read_only'] = filter_var( $field['read_only'], FILTER_VALIDATE_BOOLEAN );

		return $field;
	}
}
