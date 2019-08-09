<?php

class SettingsPageCest {
	public function _before( AcceptanceTester $I ) {
		$I->loginAsAdmin();
    }

	public function mercury_settings_page( AcceptanceTester $I ) {
		$I->amOnPage('/wp-admin/admin.php?page=mercury');

		$I->amGoingTo('See that the settings page is correct, and has post types to check.');
		$I->see('Mercury Settings', 'h1');
		$I->see('Post types', 'a');

		$I->amGoingTo('Save the "posts" post type option.');
		$I->click(['link' => 'Post types']);
		$I->checkOption('#fm-mercury-0-post_types-0-post_types-0-post');
		$I->click('Save Changes');

		$I->amGoingTo('Take a screenshot.');
		$I->makeScreenshot('settings_page');

		$I->amGoingTo('Verify that the option was saved.');
		$I->seeCheckboxIsChecked('#fm-mercury-0-post_types-0-post_types-0-post');
	}
}
