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

	/**
	 * Register meta.
	 */
	public function register_meta_for_workflows() {
		array_map( [ $this, 'register_meta' ], get_mercury_meta_keys() );
	}

	/**
	 * Register meta.
	 *
	 * @param string $field_slug Slug.
	 */
	public function register_meta( $field_slug ) {
		foreach ( get_mercury_post_types() as $post_type ) {
			register_post_meta(
				$post_type,
				$field_slug,
				[
					'show_in_rest' => true,
					'single'       => true,
				]
			);
		}
	}

	/**
	 * Register custom API routes.
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
	 * @param string $string Text to convert.
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
