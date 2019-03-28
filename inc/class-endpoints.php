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
			'mercury_in_progress_task_slug',
			'mercury_selected_task_slug',
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

			// Add meta fields that every task has.
			$task_slug     = (string) get_post_meta( $task_id, 'slug', true );
			$meta_fields[] = "mercury_{$task_slug}_status";
			$meta_fields[] = "mercury_{$task_slug}_assignnee_id";
			$meta_fields[] = "mercury_{$task_slug}_due_date";

			// Add each task slug so we can store it as meta.
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

		$workflows = self::camel_case_keys( $workflows );

		return new \WP_REST_Response( $workflows );
	}

	/**
	 * Convert all array keys to camel case.
	 *
	 * @param array $array        Array to convert.
	 * @param array $array_holder Parent array holder for recursive array.
	 * @return array Updated array with camel-cased keys.
	 */
	public static function camel_case_keys( $array, $array_holder = [] ) : array {

		// Setup for recursion.
		$camel_case_array = ! empty( $array_holder ) ? $array_holder : [];

		// Loop through each key.
		foreach ( $array as $key => &$value ) {

			// Recursively camel case nested arrays.
			if ( is_array( $value ) ) {
				$value = self::camel_case_keys( $value );
			}

			// Convert keys as needed.
			if ( is_string( $key ) ) {
				$camel_case_array[ self::camel_case_string( $key ) ] = $value;
			} else {
				$camel_case_array[ $key ] = $value;
			}
		}

		return $camel_case_array;
	}

	/**
	 * Camel case a string.
	 *
	 * @param strinng $string Text to convert.
	 * @return string
	 */
	public static function camel_case_string( string $string ) : string {

		// Explode each part by underscore.
		$words = explode( '_', $string );

		// Capitalize each key part.
		array_walk(
			$words,
			function( &$word ) {
				$word = ucwords( $word );
			}
		);

		// Reassemble key.
		$new_string = implode( '', $words );

		// Lowercase the first character.
		$new_string[0] = strtolower( $new_string[0] );

		return $new_string;
	}
}
