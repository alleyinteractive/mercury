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

		// Create a test post.
		$test_post_id = wp_insert_post(
			[
				'post_status' => 'publish',
				'post_type'   => 'post',
				'post_author' => $admin_user->ID,
				'post_title'  => 'Test Post',
			]
		);

		// Check that the contributor can't edit the post.
		$this->assertEquals(
			false,
			$contributor_user->has_cap( 'edit_post', $test_post_id )
		);

		// Assign the post to the contributor.
		$result = update_post_meta(
			$test_post_id,
			'mercury_in_progress_task_assignee_id',
			$contributor_user->ID
		);

		// Check that the contributor can now edit the post.
		$this->assertEquals(
			true,
			$contributor_user->has_cap( 'edit_post', $test_post_id )
		);
	}
}
