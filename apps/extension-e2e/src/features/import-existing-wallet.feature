Feature: Import existing wallet

#  @dev
  Scenario: As a user, I'd like to import account with existing seed phrase
    Given I am on the Welcome page
    And I press Import Existing Wallet button on the Welcome page

    Then I am on the ImportExistingWallet page
