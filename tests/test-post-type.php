<?php
/**
 * Class Post_Type
 *
 * @package Mercury
 */

/**
 * Tests related to editing posts.
 */
class Post_Type_Test extends WP_UnitTestCase {

	/**
	 * Contributors should be able to edit posts assigned to them,
	 * but not any others.
	 */
	public function test_contributors_editing() {

		// Create an administrator.
		$admin_user = $this->factory()->user->create_and_get(
			[
				'display_name'  => 'Some Admin',
				'user_nicename' => 'some_admin',
				'role'          => 'administrator',
			]
		);

		// Create a contributor.
		$contributor_user = $this->factory()->user->create_and_get(
			[
				'display_name'  => 'Foo',
				'user_nicename' => 'bar',
				'role'          => 'contributor',
			]
		);

		// Create a test post, and set up the $_POST global as if
		// we're saving that post.
		$test_post_id = wp_insert_post(
			[
				'post_status' => 'publish',
				'post_type'   => 'post',
				'post_author' => $admin_user->ID,
				'post_title'  => 'Test Post',
			]
		);

		global $_POST;
		$_POST['post_ID'] = $test_post_id;

		// Check that the contributor can't edit the post.
		$this->assertEquals(
			false,
			$contributor_user->has_cap( 'edit_post', $test_post_id )
		);

		$this->assertEquals(
			false,
			$contributor_user->has_cap( 'edit_others_posts' )
		);

		// Assign the post to the contributor.
		$result = update_post_meta(
			$test_post_id,
			'mercury_in_progress_task_assignee_id',
			$contributor_user->ID
		);

		// Check that the contributor can now edit the post, but not any others.
		// We need to check the edit_others_posts primitive capability because
		// of the REST API's check here:
		// https://github.com/WordPress/WordPress/blob/master/wp-includes/rest-api/endpoints/class-wp-rest-posts-controller.php#L641
		$this->assertEquals(
			true,
			$contributor_user->has_cap( 'edit_post', $test_post_id )
		);

		$this->assertEquals(
			true,
			$contributor_user->has_cap( 'edit_others_posts' )
		);

		unset( $_POST['post_ID'] );

		$this->assertEquals(
			false,
			$contributor_user->has_cap( 'edit_others_posts' )
		);
	}
}
