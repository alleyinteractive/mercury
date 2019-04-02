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

		$user_ids = [];

		// Add users.
		if ( $data['enable_users'] ) {
			$user_ids = array_merge( $user_ids, array_filter( $data['filter_users'] ) );
		}

		// Add groups.
		if ( $data['enable_groups'] ) {
			foreach ( ( $data['filter_groups'] ?? [] ) as $group_id ) {
				$ef_user_groups = new \EF_User_Groups();
				$usergroup      = $ef_user_groups->get_usergroup_by( 'id', $group_id );
				if ( $usergroup instanceof \WP_Term ) {
					$user_ids = array_merge( $user_ids, ( $usergroup->user_ids ?? [] ) );
				}
			}
		}

		// Add roles.
		if ( $data['enable_roles'] ) {
			$user_ids = array_merge(
				$user_ids,
				get_users(
					[
						'fields'   => 'ids',
						'role__in' => array_values( $data['filter_roles'] ),
					]
				)
			);
		}

		// Clean up user ids.
		$user_ids = array_values( array_filter( array_unique( array_map( 'absint', $user_ids ) ) ) );

		$users = [];
		foreach ( $user_ids as $user_id ) {
			$userdata = get_userdata( $user_id );
			if ( $userdata instanceof \WP_User ) {
				$users[ absint( $user_id ) ] = $userdata->data->display_name ?? '';
			}
		}

		// Sort by name.
		asort( $users, SORT_STRING | SORT_FLAG_CASE | SORT_NATURAL );

		return $users;
	}

	/**
	 * Get usergroups as an array formmated for a select field.
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
