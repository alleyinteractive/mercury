<?php

class PermissionsCest {
	public function _before( AcceptanceTester $I ) {
        $I->loginAsAdmin();

        // Add our test user.
        $this->userId = $I->haveUserInDatabase(
            'test_author',
            'contributor',
            [
                'user_email' => 'test_author@example.org',
                'user_pass' => 'password'
            ]
        );
    }

	public function user_can_edit_posts_assigned_to_them( AcceptanceTester $I ) {
        $I->amGoingTo( 'Create a new post, and set the workflow.' );
        $postId = $I->havePostInDatabase(
            [
                'post_type' => 'post',
                'post_title' => 'Test Post',
                'meta_input' => [
                    'mercury_active_workflow_slug' => 'wellness',
                ],
            ]
        );
        $I->seePostInDatabase( [ 'ID' => $postId ]);

        $I->amGoingTo( 'Check that the user cannot edit the post yet.' );
        $I->loginAs( 'test_author', 'password' );
        $I->amEditingPostWithId( $postId );
        $I->seeElement( 'body', ['id' => 'error-page'] );
        $I->makeScreenshot('user_can_edit_posts_assigned_to_them__false');

        $I->amGoingTo('Assign a task to the user.');
        $I->havePostmetaInDatabase(
            $postId,
            'mercury_in_progress_task_assignee_id',
            $this->userId
        );

        $I->amGoingTo('Check that the user can edit the post.');
        $I->amEditingPostWithId( $postId );
        $I->seeElement( 'div', ['id' => 'editor'] );
        $I->makeScreenshot('user_can_edit_posts_assigned_to_them__true');

        echo $I->grabFromCurrentUrl();
	}
}
