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
					'name'        => new \Fieldmanager_TextField( __( 'Name', 'mercury' ) ),
					'slug'        => new \Fieldmanager_TextField( __( 'Slug', 'mercury' ) ),
					'post_status' => new \Fieldmanager_TextField(
						[
							'label'       => __( 'Post Status', 'mercury' ),
							'description' => __( 'Limited to 20 characters', 'mercury' ),
							'attributes'  => [
								'maxlength' => '20',
								'size'      => '50',
							],
						]
					),
				],
			]
		);
		$fm->add_meta_box( __( 'Settings', 'mercury' ), [ Post_Type::WORKFLOW_TASK_POST_TYPE ], 'normal', 'high' );
	}

	public function assignments_meta_box() {

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
								'author'  => __( 'Post author', 'mercury' ),
								'user'    => __( 'Specific User', 'mercury' ),
							],
						]
					),
					'default_user' => new \Fieldmanager_Autocomplete(
						[
							'display_if' => [
								'src'   => 'default_assignee',
								'value' => 'user',
							],
							'datasource' => new \Fieldmanager_Datasource_User(),
						]
					),
					'enable_assignee_selection' => new \Fieldmanager_Checkbox(
						[
							'label'       => __( 'Enable Assignee Selection', 'mercury' ),
							'description' => __( 'This will allow the assignee to be set from a filtered list of users. Use this when your default selection may need to change. By default this will include all users. Use the filter options to filter that list.', 'mercury' ),
						]
					),
					'assignee_selection_permissions' => new \Fieldmanager_Group(
						[
							'label'       => __( 'Assignee Selection Permissions', 'mercury' ),
							'collapsible' => true,
							'display_if'  => [
								'src'   => 'enable_assignee_selection',
								'value' => true,
							],
							'children'    => [
								'roles' => new \Fieldmanager_Select(
									[
										'limit'              => 0,
										'extra_elements'     => 0,
										'one_label_per_item' => false,
										'label'              => __( 'By default only administrators can assign users to tasks. Grant this permission to additional roles for this task:', 'mercury' ),
										'add_more_label'     => __( 'Add Role', 'healthline' ),
										'options'            => \Mercury\Users::get_role_options(),
									]
								),
							],
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
			'filter_users' => new \Fieldmanager_Autocomplete(
				[
					'limit'          => 0,
					'add_more_label' => __( 'Add User', 'healthline' ),
					'display_if'     => [
						'src'   => 'enable_users',
						'value' => true,
					],
					'datasource' => new \Fieldmanager_Datasource_User(),
				]
			),
			'enable_groups' => new \Fieldmanager_Checkbox(
				[
					'label'      => __( 'Include users in these groups to be assigned this task', 'mercury' ),
				]
			),
			'filter_groups' => new \Fieldmanager_Select(
				[
					'limit'          => 0,
					'add_more_label' => __( 'Add Group', 'healthline' ),
					'display_if'     => [
						'src'   => 'enable_groups',
						'value' => true,
					],
					'options' => \Mercury\Users::get_usergroup_options(),
				]
			),
			'enable_roles' => new \Fieldmanager_Checkbox(
				[
					'label'      => __( 'Include users in specific roles to be assigned this task', 'mercury' ),
				]
			),
			'filter_roles' => new \Fieldmanager_Select(
				[
					'limit'          => 0,
					'add_more_label' => __( 'Add Role', 'healthline' ),
					'display_if'     => [
						'src'   => 'enable_roles',
						'value' => true,
					],
					'options' => \Mercury\Users::get_role_options(),
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
								'task_id' => new \Fieldmanager_Autocomplete(
									[
										'label' => __( 'Task', 'mercury' ),
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
						]
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
					'type'  => new \Fieldmanager_Select(
						[
							'label'         => __( 'Type', 'mercury' ),
							'default_value' => 'textfield',
							'options'       => [
								'radios'     => __( 'Radios', 'mercury' ),
								'checkboxes' => __( 'Checkboxes', 'mercury' ),
								'checkbox'   => __( 'Checkbox', 'mercury' ),
								'date'       => __( 'Date', 'mercury' ),
								'select'     => __( 'Dropdown', 'mercury' ),
								'textarea'   => __( 'Textarea', 'mercury' ),
								'textfield'  => __( 'Textfield', 'mercury' ),
								'assignee'   => __( 'Assignee', 'mercury' ),
							],
						]
					),
					'label' => new \Fieldmanager_Textfield( __( 'Label', 'mercury' ) ),
					'slug'  => new \Fieldmanager_Textfield(
						[
							'label' => __( 'Slug', 'mercury' ),
							'display_if' => [
								'src'   => 'type',
								'value' => 'checkbox,checkboxes,date,select,textarea,textfield'
							],
						]
					),
					'read_only'      => new \Fieldmanager_Checkbox( __( 'Read only?', 'mercury' ) ),
					'required'       => new \Fieldmanager_Checkbox( __( 'Required?', 'mercury' ) ),
					'options_source' => new \Fieldmanager_Select(
						[
							'label' => __( 'Source', 'mercury' ),
							'options' => [
								'function' => __( 'Function', 'mercury' ),
								'list'     => __( 'List', 'mercury' ),
							],
							'display_if' => [
								'src'   => 'type',
								'value' => 'select,checkboxes,radios'
							],
						]
					),
					'options_first_empty' => new \Fieldmanager_Checkbox(
						[
							'label'          => __( 'First Empty?', 'mercury' ),
							'display_if' => [
								'src'   => 'options_source',
								'value' => 'list'
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
					'assignee_task_id' => new \Fieldmanager_Autocomplete(
						[
							'label' => __( 'Task', 'mercury' ),
							'description' => __( 'Select the task for which this assignee field applies.', 'mercury' ),
							'display_if' => [
								'src'   => 'type',
								'value' => 'assignee'
							],
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
			'name'          => get_post_meta( $task_id, 'name', true ),
			'assignees'     => self::get_assignee_settings( $task_id ),
			'fields'        => self::get_fields( $task_id ),
			'nextTasks'     => self::get_next_tasks( $task_id ),
			'slug'          => get_post_meta( $task_id, 'slug', true ),
			'postStatus'    => get_post_meta( $task_id, 'post_status', true ),
		];
	}

	public static function get_assignee_settings( $task_id ) {

		$settings_template = [
			'default_assignee'               => 'none',
			'default_user'                   => 0,
			'enable_assignee_selection'      => false,
			'assignee_options'               => [],
			'assignee_selection_permissions' => [
				'roles' => [],
			],
			'assignee_selection'             => [
				'enable_users'  => false,
				'filter_users'  => [],
				'enable_groups' => false,
				'filter_groups' => [],
				'enable_roles'  => false,
				'filter_roles'  => [],
			],
			'enable_ask_reject'              => false,
			'ask_reject'                     => [
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

		// Assignees.
		$settings['enable_assignee_selection']           = filter_var( $settings['enable_assignee_selection'], FILTER_VALIDATE_BOOLEAN );
		$settings['assignee_selection']['enable_users']  = filter_var( $settings['assignee_selection']['enable_users'], FILTER_VALIDATE_BOOLEAN );
		$settings['assignee_selection']['enable_groups'] = filter_var( $settings['assignee_selection']['enable_groups'], FILTER_VALIDATE_BOOLEAN );
		$settings['assignee_selection']['enable_roles']  = filter_var( $settings['assignee_selection']['enable_roles'], FILTER_VALIDATE_BOOLEAN );

		// Ask/Reject.
		$settings['enable_ask_reject']           = filter_var( $settings['enable_ask_reject'], FILTER_VALIDATE_BOOLEAN );
		$settings['ask_reject']['enable_users']  = filter_var( $settings['ask_reject']['enable_users'], FILTER_VALIDATE_BOOLEAN );
		$settings['ask_reject']['enable_groups'] = filter_var( $settings['ask_reject']['enable_groups'], FILTER_VALIDATE_BOOLEAN );
		$settings['ask_reject']['enable_roles']  = filter_var( $settings['ask_reject']['enable_roles'], FILTER_VALIDATE_BOOLEAN );

		$settings['assignee_options'] = \Mercury\Users::create_user_list_from_assignee_data( $settings['assignee_selection'] );

		$settings['assignee_selection_permissions']['roles'] = array_merge( $settings['assignee_selection_permissions']['roles'] ?? [], [ 'administrator' ] );
		
		return $settings;
	}

	/**
	 * Get the next step options for a given task.
	 *
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

		// Validate required fields.
		if (
			empty( $field['label'] )
			|| empty( $field['type'] )
			|| ( 'assignee' !== $field['type'] && empty( $field['slug'] ) )
			|| ( 'assignee' === $field['type'] && empty( $field['assignee_task_id'] ) )
		) {
			return [];
		}

		// Clean shape of each field.
		$field = wp_parse_args(
			$field,
			[
				'assignee_task_id'    => 0,
				'assignee_task_slug'  => '',
				'label'               => '',
				'options_first_empty' => false,
				'options_source'      => '',
				'options_source_list' => '',
				'read_only'           => false,
				'required'            => false,
				'slug'                => '',
				'type'                => '',
			]
		);

		// Type cast as needed.
		$field['options_first_empty'] = filter_var( $field['options_first_empty'], FILTER_VALIDATE_BOOLEAN );
		$field['read_only']           = filter_var( $field['read_only'], FILTER_VALIDATE_BOOLEAN );
		$field['required']            = filter_var( $field['required'], FILTER_VALIDATE_BOOLEAN );

		// Handle assignee field.
		if ( 'assignee' === $field['type'] ) {
			$task_slug     = (string) get_post_meta( $field['assignee_task_id'], 'slug', true );
			$field['slug'] = "mercury_{$task_slug}_assignee_id";
			$field['assignee_task_slug'] = $task_slug;
		}

		return $field;
	}
}
