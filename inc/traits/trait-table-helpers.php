<?php
/**
 * Table helpers trait.
 *
 * @package Mercury
 */

namespace Mercury\Traits;

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
}
