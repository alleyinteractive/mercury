<?php

class SettingsPageCest {
	public function _before( AcceptanceTester $I ) {
		$I->amOnPage( '/wp-login.php' );
		$I->wait( 1 );
		$I->fillField( [ 'name' => 'log' ], 'alley' );
		$I->fillField( [ 'name' => 'pwd' ], 'interactive' );
		$I->click( '#wp-submit' );
    }

	public function general_settings_page( AcceptanceTester $I ) {
		$I->amOnPage('/wp-admin/admin.php?page=mercury');

		$I->see('Mercury Settings', 'h1');

		$I->see('Post types', 'a');
		$I->click(['link' => 'Post types']);

		$I->checkOption('#fm-mercury-0-post_types-0-post_types-0-post');
		$I->click('Save Changes');

		$I->seeCheckboxIsChecked('#fm-mercury-0-post_types-0-post_types-0-post');
	}
}
