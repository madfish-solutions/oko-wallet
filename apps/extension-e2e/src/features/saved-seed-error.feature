Feature: Saved seed error displaying

  Scenario: As a user, I'd like to see an error of unactive required checkbox
    Given I am on the Welcome page
    And I press Create New Wallet button on the Welcome page

    And I am on the CreateNewWallet page
    And I press Next button on the CreateNewWallet page
    And I verify Mnemonic Saved Error
