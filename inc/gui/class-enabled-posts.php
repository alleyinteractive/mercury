<?php
/**
 * Misc GUI setup for Mercury enabled post types.
 *
 * @package Mercury.
 */

namespace Mercury\GUI;

/**
 * Post types that have Mercury enabled.
 */
class Enabled_Posts {

	/**
	 * Constuctor for GUI.
	 */
	public function __construct() {

		// Allow filter vars.
		add_filter(
			'query_vars',
			function( $query_vars ) {
				$query_vars[] = 'workflow_id';
				return $query_vars;
			}
		);

		// Display filters.
		add_action( 'restrict_manage_posts', [ $this, 'add_post_filters' ] );

		// React to filters.
		add_action( 'pre_get_posts', [ $this, 'apply_post_filters' ] );
	}

	/**
	 * Insert filters.
	 */
	public function add_post_filters( $post_type ) {
		// Only `post` is supported currently.
		if ( 'post' === $post_type ) {
			$this->add_workflow_filter();
		}
	}

	/**
	 * Add filter dropdown for workflow.
	 */
	protected function add_workflow_filter() {

		// Get the workflow options.
		$workflows = array_map(
			'\Mercury\GUI\Workflow::get_workflow',
			Workflow::get_workflow_ids()
		);

		// Build the markup for the dropdown.
		?>
		<select name="workflow_id" id="workflow_id">
			<option value=""><?php esc_html_e( 'All Workflows', 'mercury' ); ?></option>
			<?php
			foreach ( $workflows as $workflow ) {
				printf(
					'<option value="%s" %s>%s</option>',
					esc_attr( $workflow['id'] ),
					selected( $workflow['id'], esc_html( get_query_var( 'workflow_id' ) ), false ),
					esc_html( $workflow['name'] )
				);
			}
			?>
		</select>
		<?php
	}

	/**
	 * Apply any filters set on the post list screen.
	 *
	 * @param \WP_Query $wp_query WP_Query object.
	 */
	public function apply_post_filters( $wp_query ) {

		// Ensure this is an admin request.
		if ( ! is_admin() || ! $wp_query->is_main_query() ) {
			return;
		}

		// Validate workflow ID.
		$workflow_id = get_query_var( 'workflow_id' );
		if ( 0 === absint( $workflow_id ) ) {
			return;
		}

		// Get the current meta_query and clean it.
		$meta_query = (array) $wp_query->get( 'meta_query' );
		$meta_query = array_filter( $meta_query );

		// Add a new query for the active workflow slug.
		$meta_query[] = [
			'key'   => 'mercury_active_workflow_slug',
			'value' => get_post_meta( $workflow_id, 'slug', true ),
		];

		$wp_query->set( 'meta_query', $meta_query );
	}
}
