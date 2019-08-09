<?php

class SettingsPageCest {
	public function _before( AcceptanceTester $I ) {
		$I->loginAsAdmin();
    }

	public function mercury_settings_page( AcceptanceTester $I ) {
		$I->amOnPage('/wp-admin/admin.php?page=mercury');

		$I->see('Mercury Settings', 'h1');

		$I->see('Post types', 'a');
		$I->click(['link' => 'Post types']);

		$I->checkOption('#fm-mercury-0-post_types-0-post_types-0-post');
		$I->click('Save Changes');

		$I->seeCheckboxIsChecked('#fm-mercury-0-post_types-0-post_types-0-post');

		$I->makeScreenshot('settings_page');
	}
}
