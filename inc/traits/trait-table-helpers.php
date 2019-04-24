<?php
/**
 * Table helpers trait.
 *
 * @package Mercury
 */

namespace Mercury\Traits;

use function Mercury\get_mercury_post_types;

/**
 * Helper functions for the assignments table.
 */
trait Table_Helpers {

	/**
	 * Get the post title, linked to its edit screen.
	 *
	 * @param \WP_Post $post The post object.
	 * @return string
	 */
	public function get_title( \WP_Post $post ) : string {
		$link = get_edit_post_link( $post->ID );

		if ( empty( $link ) ) {
			return $post->post_title;
		}

		return sprintf(
			'<a class="row-title" href="%1$s" aria-label="%2$s">%3$s</a>',
			$link,
			/* translators: %s: post title */
			sprintf( __( '&#8220;%s&#8221; (Edit)', 'mercury' ), $post->post_title ),
			$post->post_title
		);
	}

	/**
	 * Get the publish date for this post.
	 *
	 * @param \WP_Post $post Post object.
	 * @return string
	 */
	public function get_publish_date( \WP_Post $post ) : string {
		$date = get_the_date( 'Y/m/d', $post->ID );
		return $date ?: '';
	}
	
	/**
	 * Get the task assigned to the user for a post.
	 *
	 * @param \WP_Post $post Post object.
	 * @return string
	 */
	protected function get_assigned_task( \WP_Post $post ) : string {
		
		// Get the task in progress.
		$task_slug = get_post_meta( $post->ID, 'mercury_in_progress_task_slug', true );

		// Get the task and its name.
		$task = \Mercury\GUI\Task::get_task_by_slug( $task_slug );
		return $task['name'] ?? '';
	}

	/**
	 * Get the orderby value, defaulting to ID.
	 *
	 * @return string
	 */
	protected function get_orderby() : string {
		return ( ! empty( $_GET['orderby'] ) )
			? sanitize_text_field( wp_unslash( $_GET['orderby'] ) )
			: 'ID';
	}

	/**
	 * Get the order value, defaulting to DESC.
	 *
	 * @return string
	 */
	protected function get_order() : string {
		return ( ! empty( $_GET['order'] ) )
			? sanitize_text_field( wp_unslash( $_GET['order'] ) )
			: 'DESC';
	}

	/**
	 * Get the task filter value.
	 *
	 * @return string
	 */
	protected function get_task_filter() {
		return ( ! empty( $_GET['task'] ) )
			? sanitize_text_field( wp_unslash( $_GET['task'] ) )
			: '';
	}

	/**
	 * Get the user ID.
	 *
	 * @return int
	 */
	public function get_user_id() : int {
		return ( ! empty( $_GET['user_id'] ) )
			? absint( wp_unslash( $_GET['user_id'] ) )
			: get_current_user_id();
	}

	/**
	 * Get the post type(s).
	 *
	 * @return string|array
	 */
	public function get_post_type() {
		return ( ! empty( $_GET['post_type'] ) )
			? sanitize_text_field( wp_unslash( $_GET['post_type'] ) )
			: get_mercury_post_types();
	}
}
