<?php
/**
 * Users.
 *
 * @package Mercury
 */

namespace Mercury;

/**
 * User management for Mercury.
 */
class Users {

	/**
	 * Get a list of users formatted for a select dropdown.
	 *
	 * @param array $data Data used for assignees.
	 * @return array
	 */
	public static function create_user_list_from_assignee_data( $data ) {
		global $edit_flow;

		$user_ids = [];
		$groups   = [];
		$roles    = [];

		// Add users.
		if ( $data['enable_users'] ) {
			$user_ids = array_merge( $user_ids, array_filter( $data['filter_users'] ) );
		}

		// Add groups.
		if ( $data['enable_groups'] ) {
			foreach ( ( $data['filter_groups'] ?? [] ) as $group_id ) {
				$usergroup = $edit_flow->user_groups->get_usergroup_by( 'id', $group_id );

				// Include both group users and the group itself.
				if ( $usergroup instanceof \WP_Term ) {
					$user_ids = array_merge( $user_ids, $usergroup->user_ids ?? [] );
					$groups[] = [
						'label' => $usergroup->name,
						'value' => "group_{$group_id}",
					];
				}
			}
		}

		// Add roles.
		if ( $data['enable_roles'] ) {
			$role_users = get_users(
				[
					'fields'   => 'ids',
					'role__in' => array_values( $data['filter_roles'] ),
				]
			);
			$user_ids = array_merge( $user_ids, $role_users ?? [] );

			// Include both role users and the role itself.
			foreach ( $data['filter_roles'] as $role ) {
				$roles[] = [
					'label' => ucwords( $role ),
					'value' => $role,
				];
			}
		}

		// Clean up user ids.
		$user_ids = array_values( array_filter( array_unique( array_map( 'absint', $user_ids ) ) ) );

		$users = [];
		foreach ( $user_ids as $user_id ) {
			$userdata = get_userdata( $user_id );

			if ( $userdata instanceof \WP_User ) {
				$users[] = [
					'label' => $userdata->data->display_name ?? '',
					'value' => absint( $user_id ),
				];
			}
		}

		// Sort alphabetically by name (label).
		$select_sections = [
			'Groups' => $groups,
			'Roles'  => $roles,
			'Users'  => $users,
		];
		$options = [];
		foreach ( $select_sections as $label => $section ) {
			if ( ! empty( $section ) ) {
				// Alpha-sort options.
				usort(
					$section,
					function ( $a, $b ) {
						return $a['label'] > $b['label'];
					}
				);

				// Create section heading.
				array_unshift(
					$section,
					[
						'label'   => $label,
						'heading' => true, // Flag to indicate this is only a label.
						'value'   => '',
					]
				);

				// Merge section label and options into options array.
				$options = array_merge( $options, $section );
			};
		}

		return $options;
	}

	/**
	 * Get usergroups as an array formatted for a select field.
	 *
	 * @return array
	 */
	public static function get_usergroup_options() {
		$usergroup_ids = get_terms(
			[
				'fields'     => 'id=>name',
				'hide_empty' => false,
				'number'     => 0,
				'taxonomy'   => 'ef_usergroup',
			]
		);

		if ( is_wp_error( $usergroup_ids ) ) {
			return [];
		}

		return $usergroup_ids;
	}

	/**
	 * Get roles as an array formmated for a select field.
	 *
	 * @return array
	 */
	public static function get_role_options() {

		// Valide roles exist.
		$wp_roles = wp_roles();
		if ( ! $wp_roles instanceof \WP_Roles ) {
			return [];
		}

		// Build options.
		$options  = [];
		foreach ( ( $wp_roles->roles ?? [] ) as $slug => $role ) {
			$options[ $slug ] = $role['name'];
		}

		return $options;
	}
}
