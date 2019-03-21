<?php
/**
 * Endpoints.
 *
 * @package Mercury
 */

namespace Mercury;

/**
 * Endpoints for workflows.
 */
class Endpoints {

	/**
	 * Namespace for endpoints.
	 *
	 * @var string
	 */
	const NAMESPACE = 'mercury/v1';

	/**
	 * Initalize an instance.
	 */
	public function __construct() {
		add_action( 'rest_api_init', [ $this, 'register_routes' ] );

		$this->register_meta_for_workflows();
	}

	public function register_meta_for_workflows() {

		$meta_fields = [
			'mercury_active_workflow_slug',
			'mercury_active_task_slug',
		];

		$tasks_query = new \WP_Query(
			[
				'fields'         => 'ids',
				'order'          => 'ASC',
				'orderby'        => 'title',
				'post_type'      => Post_Type::WORKFLOW_TASK_POST_TYPE,
				'posts_per_page' => -1,
			]
		);

		foreach ( ( $tasks_query->posts ?? [] ) as $task_id ) {
			$fields = \Mercury\GUI\Task::get_fields( $task_id );
			$slugs = wp_list_pluck( $fields, 'slug' );
			if ( ! empty( $slugs ) ) {
				$meta_fields = array_merge( $meta_fields, $slugs );
			}
		}

		array_map( [ $this, 'register_meta' ], $meta_fields );
	}

	/**
	 * Register meta.
	 *
	 * @param string $field_slug Slug.
	 */
	public function register_meta( $field_slug ) {
		register_post_meta(
			'post',
			$field_slug,
			[
				'show_in_rest' => true,
				'single'       => true,
			]
		);
	}

	/**
	 * Register custom api routes.
	 */
	public function register_routes() {

		// Get all workflows.
		register_rest_route(
			self::NAMESPACE,
			'/workflows/',
			[
				'methods' => 'GET',
				'callback' => [ $this, 'get_workflows' ],
			]
		);
	}

	/**
	 * Create response mapping all workflow IDs to the get_workflow function.
	 *
	 * @return \WP_REST_Resopnse
	 */
	public function get_workflows() {
		$workflows = array_map(
			'\Mercury\GUI\Workflow::get_workflow',
			GUI\Workflow::get_workflow_ids()
		);

		return new \WP_REST_Response( $workflows );
	}
}
