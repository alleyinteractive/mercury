<?php
/**
 * Settings page.
 *
 * @package Mercury.
 */

namespace Mercury\GUI;

use Mercury\Post_Type as Post_Type;

/**
 * Settings.
 */
class Settings {

	/**
	 * Constructor.
	 */
	public function __construct() {

		add_action( 'admin_menu', [ $this, 'admin_menu' ] );
		add_action( 'fm_submenu_mercury', [ $this, 'fm_submenu' ] );

		if ( function_exists( 'fm_register_submenu_page' ) ) {
			fm_register_submenu_page(
				'mercury',
				'mercury',
				__( 'Mercury Settings', 'mercury' ),
				__( 'Settings', 'mercury' ),
				'manage_options'
			);
		}
	}

	/**
	 * Add settings page.
	 */
	public function admin_menu() {

		// Move the FM submenu page to a top-level menu page.
		remove_submenu_page( 'mercury', 'mercury' );
		add_menu_page(
			__( 'Mercury', 'mercury' ),
			__( 'Mercury', 'mercury' ),
			'manage_options',
			'mercury',
			'__return_false',
			'dashicons-yes',
			null
		);
	}

	/**
	 * Add FM fields.
	 */
	public function fm_submenu() {
		$fm = new \Fieldmanager_Group(
			[
				'name' => 'mercury',
				'tabbed' => 'vertical',
				'children' => [
					'meta_box' => new \Fieldmanager_Group(
						[
							'label' => __( 'Meta box', 'mercury' ),
							'children' => [
								'meta_box_label' => new \Fieldmanager_TextField(
									[
										'label'         => __( 'Meta box label', 'mercury' ),
										'default_value' => __( 'Mercury', 'mercury' ),
									]
								),
							],
						]
					),
					'post_types' => new \Fieldmanager_Group(
						[
							'label'    => __( 'Post types', 'mercury' ),
							'children' => [
								'post_types' => new \Fieldmanager_Checkboxes(
									[
										'label'   => __( 'Enable Mercury for the following post types:', 'mercury' ),
										'options' => self::get_post_types(),
									]
								),
								'post_types_assignments_pages' => new \Fieldmanager_Checkbox(
									[
										'label'       => __( 'Enable separate assignments pages by post type', 'mercury' ),
										'description' => __( 'Adds an assigments page to the submenu of each post type.', 'mercury' ),
									]
								),
							],
						]
					),
					'posts_table' => new \Fieldmanager_Group(
						[
							'label'    => __( 'Posts Table', 'mercury' ),
							'children' => [
								'posts_table_filters' => new \Fieldmanager_Checkbox(
									[
										'label'       => __( 'Enable filters on Posts Table', 'mercury' ),
										'description' => __( 'Adds the ability to filter posts by workflow.', 'mercury' ),
									]
								),
							],
						]
					),
					'colors' => new \Fieldmanager_Group(
						[
							'label'    => __( 'Colors', 'mercury' ),
							'children' => [
								'primary' => new \Fieldmanager_Colorpicker(
									[
										'label'         => __( 'Primary', 'mercury' ),
										'default_value' => '#fad703',
									]
								),
								'primary_dark' => new \Fieldmanager_Colorpicker(
									[
										'label'         => __( 'Primary dark', 'mercury' ),
										'default_value' => '#faaf03',
									]
								),
								'secondary' => new \Fieldmanager_Colorpicker(
									[
										'label'         => __( 'Secondary', 'mercury' ),
										'default_value' => '#e81717',
									]
								),
							],
						]
					),
				],
			]
		);
		$fm->activate_submenu_page();
	}

	/**
	 * Get post types options list.
	 *
	 * @return array Post types options.
	 */
	public static function get_post_types() {
		$post_types = get_post_types(
			[
				'public' => true,
			],
			'objects'
		);
		$options = [];
		foreach ( $post_types as $post_type ) {
			$options[ $post_type->name ] = $post_type->label;
		}
		return $options;
	}
}
