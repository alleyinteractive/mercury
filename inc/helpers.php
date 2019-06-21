<?php
/**
 * Helpers.
 *
 * @package Mercury
 */

namespace Mercury;

/**
 * Get the slugs for all registered Mercury tasks.
 *
 * @return array
 */
function get_mercury_task_slugs() : array {

	// Check for a cache hit.
	$cache_key       = 'mercury_task_slugs';
	$cached_slugs = get_transient( $cache_key );

	if ( false !== $cached_slugs ) {
		return $cached_slugs;
	}

	$tasks_query = new \WP_Query(
		[
			'fields'         => 'ids',
			'order'          => 'ASC',
			'orderby'        => 'title',
			'post_type'      => Post_Type::WORKFLOW_TASK_POST_TYPE,
			'posts_per_page' => -1,
		]
	);

	// Get the slug for each task.
	$task_slugs = [];
	foreach ( ( $tasks_query->posts ?? [] ) as $task_id ) {
		$task_slugs[ $task_id ] = (string) get_post_meta( $task_id, 'slug', true );
	}

	// Cache the slugs for 15 minutes.
	// @todo Implement something more intelligent.
	if ( ! empty( $task_slugs ) ) {
		set_transient( $cache_key, $task_slugs, 15 * MINUTE_IN_SECONDS );
	}

	return $task_slugs;
}

/**
 * Get the status keys for all registered Mercury tasks.
 *
 * @return array
 */
function get_mercury_task_status_keys() : array {
	return array_map(
		function( $task_slug ) {
			return "mercury_{$task_slug}_status";
		},
		get_mercury_task_slugs()
	);
}

/**
 * Get the task ID from a task slug.
 *
 * @param string $slug Task slug.
 * @return int|null
 */
function get_mercury_task_id( string $slug ) : ?int {
	$query = new \WP_Query(
		[
			'fields'         => 'ids',
			'post_type'      => Post_Type::WORKFLOW_TASK_POST_TYPE,
			'posts_per_page' => 1,
			'meta_query'     => [
				[
					'key'   => 'slug',
					'value' => $slug,
				],
			],
		]
	);
	return $query->posts[0] ?? null;
}

/**
 * Get the workflow ID from a task slug.
 *
 * @param string $slug Task slug.
 * @return int|null
 */
function get_mercury_workflow_id_from_task( string $slug ) : ?int {
	$task_id      = get_mercury_task_id( $slug );
	$workflow_ids = GUI\Workflow::get_workflow_ids();

	foreach ( $workflow_ids as $workflow_id ) {
		$task_ids = get_post_meta( $workflow_id, 'tasks', true );
		if ( in_array( $task_id, $task_ids['tasks'] ?? [], true ) ) {
			return $workflow_id;
		}
	}

	return null;
}

/**
 * Get the workflow slug from a task slug.
 *
 * @param string $slug Task slug.
 * @return string
 */
function get_mercury_workflow_slug_from_task( string $slug ) : string {
	$workflow_id = get_mercury_workflow_id_from_task( $slug );
	return (string) get_post_meta( $workflow_id, 'slug', true );
}

/**
 * Get the task slug from a task status.
 *
 * @param string $status Task status.
 * @return string
 */
function get_mercury_task_slug_from_task_status( string $status ) : string {
	$task = new \WP_Query(
		[
			'post_type'  => 'mercury-task',
			'meta_key'   => 'post_status',
			'meta_value' => $status,
		]
	);

	return (string) get_post_meta( $task->post->ID ?? 0, 'slug', true );
}

/**
 * Get the active workflow slug.
 *
 * @param int $post_id Post ID.
 * @return string
 */
function get_active_workflow_slug( int $post_id ) {
	return get_post_meta( $post_id, 'mercury_active_workflow_slug', true );
}

/**
 * Get the in progress task slug.
 *
 * @param int $post_id Post ID.
 * @return string
 */
function get_in_progress_task_slug( int $post_id ) {
	return get_post_meta( $post_id, 'mercury_in_progress_task_slug', true );
}

/**
 * Get the selected task slug.
 *
 * @param int $post_id Post ID.
 * @return string
 */
function get_selected_task_slug( int $post_id ) {
	return get_post_meta( $post_id, 'mercury_selected_task_slug', true );
}

/**
 * Get the assignee for a task.
 *
 * @param int    $post_id   Post ID.
 * @param string $task_slug Task slug.
 * @return int
 */
function get_task_assignee( $post_id, $task_slug ) {
	return absint( get_post_meta( $post_id, "mercury_{$task_slug}_assignee_id", true ) );
}
